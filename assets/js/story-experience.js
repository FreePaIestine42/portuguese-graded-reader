(function () {
  const STORIES = window.STORY_CONTENT?.stories || {};
  const DATA = window.SITE_DATA;
  const APP = document.getElementById('app');
  const KEY = 'portugueseStoriesProgressV1';
  if (!DATA || !APP) return;

  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
  const norm = value => String(value || '').normalize('NFD').replace(/\p{Diacritic}/gu, '').toLocaleLowerCase('pt-PT').replace(/[.,!?;:«»“”"'()]/g, '').replace(/\s+/g, ' ').trim();
  const cssEsc = value => window.CSS?.escape ? CSS.escape(value) : String(value).replace(/[^a-zA-Z0-9_-]/g, '\\$&');
  const load = () => { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch { return {}; } };
  const save = all => localStorage.setItem(KEY, JSON.stringify(all));
  const progress = id => load()[id] || {};
  function patch(id, changes) { const all = load(); all[id] = {...(all[id] || {}), ...changes, updatedAt: new Date().toISOString()}; save(all); return all[id]; }
  const status = p => p.completed ? 'Completed' : p.started ? 'Started' : 'Not started';
  const route = () => { const p = location.hash.replace(/^#\/?/, '').replace(/\/+$/, '').split('/'); return {page:p[0] || 'home', a:p[1], b:p[2]}; };

  function vocabularyLookup(story) {
    const map = new Map();
    Object.entries(story.vocabulary || {}).forEach(([key, entry]) => (entry.forms || []).forEach(form => map.set(form.normalize('NFC').toLocaleLowerCase('pt-PT'), key)));
    return map;
  }

  function paragraphHtml(text, lookup) {
    const content = String(text).split(/([\p{L}]+(?:-[\p{L}]+)*)/gu).map(part => {
      const key = lookup.get(part.normalize('NFC').toLocaleLowerCase('pt-PT'));
      return key ? `<button class="vocab-word" type="button" data-vocab="${esc(key)}">${esc(part)}</button>` : esc(part);
    }).join('');
    return `<p class="story-paragraph${String(text).trim().startsWith('—') ? ' story-dialogue' : ''}">${content}</p>`;
  }

  function radioOptions(name, options, saved) {
    return `<div class="answer-options">${options.map(option => `<label class="answer-option"><input type="radio" name="${esc(name)}" value="${esc(option.value)}" ${saved === option.value ? 'checked' : ''}><span>${esc(option.label)}</span></label>`).join('')}</div>`;
  }

  function readingCheckHtml(check, p) {
    const saved = p.readingChecks?.[check.id] || {};
    const options = check.type === 'truefalse' ? [{value:'true',label:'Verdadeiro'},{value:'false',label:'Falso'}] : check.options.map(x => ({value:x,label:x}));
    const feedback = saved.checked ? `${saved.correct ? 'Correto.' : 'Ainda não.'} ${check.explanation}` : '';
    return `<aside class="reading-check" data-reading-check="${esc(check.id)}"><span class="activity-kicker">Quick check</span><h3>${esc(check.prompt)}</h3>${radioOptions(`reading-${check.id}`, options, saved.answer)}<button class="activity-button" type="button" data-check-reading>Check answer</button><p class="activity-feedback${saved.checked ? (saved.correct ? ' is-correct' : ' is-incorrect') : ''}" aria-live="polite">${esc(feedback)}</p></aside>`;
  }

  function quizInput(q, saved) {
    if (q.type === 'choice' || q.type === 'truefalse') {
      const options = q.type === 'truefalse' ? [{value:'true',label:'Verdadeiro'},{value:'false',label:'Falso'}] : q.options.map(x => ({value:x,label:x}));
      return radioOptions(`quiz-${q.id}`, options, saved);
    }
    if (q.type === 'select') return `<label class="select-answer"><span>Escolhe uma resposta</span><select data-quiz-select><option value="">Seleciona…</option>${q.options.map(x => `<option value="${esc(x)}" ${saved === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></label>`;
    if (q.type === 'text') return `<label class="text-answer"><span>A tua resposta</span><input type="text" data-quiz-text value="${esc(saved || '')}" autocomplete="off"></label>`;
    if (q.type === 'multiselect') { const a = Array.isArray(saved) ? saved : []; return `<div class="answer-options">${q.options.map(x => `<label class="answer-option"><input type="checkbox" value="${esc(x)}" ${a.includes(x) ? 'checked' : ''}><span>${esc(x)}</span></label>`).join('')}</div>`; }
    if (q.type === 'matching') { const a = saved && typeof saved === 'object' ? saved : {}; return `<div class="matching-grid">${q.items.map(item => `<label class="matching-row"><strong>${esc(item.key)}</strong><select data-match="${esc(item.key)}"><option value="">Seleciona a ação…</option>${q.options.map(x => `<option value="${esc(x)}" ${a[item.key] === x ? 'selected' : ''}>${esc(x)}</option>`).join('')}</select></label>`).join('')}</div>`; }
    if (q.type === 'order') { const a = Array.isArray(saved) ? saved : []; const display = q.items.length === 4 ? [2,0,3,1] : q.items.map((_,i) => i); return `<div class="ordering-grid">${display.map(i => `<label class="ordering-row"><select data-order="${i}"><option value="">Posição</option>${q.items.map((_,j) => `<option value="${j+1}" ${Number(a[i]) === j+1 ? 'selected' : ''}>${j+1}</option>`).join('')}</select><span>${esc(q.items[i])}</span></label>`).join('')}</div>`; }
    return '';
  }

  function quizHtml(story, p) {
    const saved = p.quizAnswers || {};
    return `<section class="final-quiz" id="final-quiz"><div class="quiz-heading"><span class="section-kicker">After reading</span><h2>Compreensão e prática</h2><p>Completa os exercícios. Precisas de pelo menos ${story.passPercentage}% para concluir a história.</p></div><form id="story-quiz-form" novalidate><div class="quiz-question-list">${story.quiz.map((q,i) => `<article class="quiz-question" data-question="${esc(q.id)}"><div class="quiz-question-heading"><span>${i+1}</span><div><small>${esc(q.label)}</small><h3>${esc(q.prompt)}</h3></div></div>${quizInput(q,saved[q.id])}<div class="quiz-question-feedback" aria-live="polite"></div></article>`).join('')}</div><p class="quiz-validation" id="quiz-validation" aria-live="polite"></p><div class="quiz-actions"><button class="primary-action" type="submit">Check my answers</button><button class="secondary-action" type="button" data-retake>Clear quiz answers</button></div></form><div class="quiz-result" id="quiz-result" ${p.quizSubmitted ? '' : 'hidden'}></div></section>`;
  }

  function vocabPanel() {
    return `<div class="tool-card vocabulary-card" id="vocabulary-card"><span class="tool-kicker">Vocabulary support</span><h2>Click a highlighted word</h2><p class="vocabulary-empty">Its English translation, Portuguese definition, base form, word class, meaning here and an example will appear in this panel.</p></div>`;
  }

  function statusPanel(story, p) {
    return `<div class="tool-card subdued story-status-card" id="story-status-card"><span class="tool-kicker">Saved progress</span><h3>${esc(status(p))}</h3><dl><div><dt>Best score</dt><dd>${Number.isFinite(p.bestScore) ? `${p.bestScore}%` : 'Not scored yet'}</dd></div><div><dt>Completion target</dt><dd>${story.passPercentage}%</dd></div></dl><button class="text-action" type="button" data-reset-story>Reset this story</button></div>`;
  }

  function renderStory(story) {
    const current = progress(story.id);
    if (!current.started) patch(story.id, {started:true});
    const p = progress(story.id);
    const lookup = vocabularyLookup(story);
    const sections = story.sections.map(section => `<section class="story-section">${section.paragraphs.map(x => paragraphHtml(x,lookup)).join('')}${section.check ? readingCheckHtml(section.check,p) : ''}</section>`).join('');
    APP.innerHTML = `<section class="page page-story story-experience level-theme level-${story.level.toLowerCase()}"><div class="page-banner story-banner"><div><a class="story-back-link" href="#/library/${story.level}/${story.category}">← Back to ${esc(story.categoryLabel)}</a><span class="eyebrow">${esc(story.level)} · ${esc(story.categoryLabel)}</span><h1>${esc(story.title)}</h1><p>${esc(story.instructions)}</p></div><div class="story-banner-details"><div><strong>${story.wordCount}</strong><span>words</span></div><div><strong>${esc(story.totalTime)}</strong><span>time to complete</span></div><div><strong>${story.passPercentage}%</strong><span>required to complete</span></div></div></div><div class="reader-layout"><article class="reader-panel"><div class="reading-introduction"><span class="section-kicker">A2 reading</span><h2>${esc(story.title)}</h2><p>${esc(story.summary)}</p><div class="reading-help-note"><span>ABC</span><p>Highlighted words are clickable. Select one to open vocabulary help on the right.</p></div></div><div class="story-text">${sections}</div>${quizHtml(story,p)}</article><aside class="tool-panel">${vocabPanel()}${statusPanel(story,p)}</aside></div></section>`;
    bindStory(story);
    if (p.quizSubmitted) showResults(story,p.quizAnswers || {},false);
  }

  function selectedAnswer(container, selector='input:checked') { return container.querySelector(selector)?.value || ''; }
  function collect(story) {
    const out = {};
    story.quiz.forEach(q => {
      const el = document.querySelector(`[data-question="${cssEsc(q.id)}"]`);
      if (!el) return;
      if (q.type === 'choice' || q.type === 'truefalse') out[q.id] = selectedAnswer(el);
      else if (q.type === 'select') out[q.id] = el.querySelector('[data-quiz-select]')?.value || '';
      else if (q.type === 'text') out[q.id] = el.querySelector('[data-quiz-text]')?.value || '';
      else if (q.type === 'multiselect') out[q.id] = [...el.querySelectorAll('input:checked')].map(x => x.value);
      else if (q.type === 'matching') { out[q.id] = {}; el.querySelectorAll('[data-match]').forEach(x => out[q.id][x.dataset.match] = x.value); }
      else if (q.type === 'order') { out[q.id] = Array(q.items.length).fill(''); el.querySelectorAll('[data-order]').forEach(x => out[q.id][Number(x.dataset.order)] = Number(x.value) || ''); }
    });
    return out;
  }

  function answered(q,a) {
    if (q.type === 'matching') return q.items.every(x => a?.[x.key]);
    if (q.type === 'order') return Array.isArray(a) && a.length === q.items.length && a.every(Boolean) && new Set(a).size === q.items.length;
    if (q.type === 'multiselect') return Array.isArray(a) && a.length > 0;
    return String(a || '').trim() !== '';
  }

  function grade(q,a) {
    const max = Number(q.points || 1);
    if (q.type === 'matching') { const n = q.items.filter(x => a?.[x.key] === x.answer).length; return {earned:n,max:q.items.length,correct:n===q.items.length}; }
    if (q.type === 'order') { const ok = q.answer.every((x,i) => Number(a?.[i]) === Number(x)); return {earned:ok?max:0,max,correct:ok}; }
    if (q.type === 'multiselect') { const got=[...(a||[])].sort(), wanted=[...q.answer].sort(); const ok=JSON.stringify(got)===JSON.stringify(wanted); return {earned:ok?max:0,max,correct:ok}; }
    if (q.type === 'text') { const ok=(q.answers||[]).some(x => norm(x)===norm(a)); return {earned:ok?max:0,max,correct:ok}; }
    const ok = a === q.answer; return {earned:ok?max:0,max,correct:ok};
  }

  function correctText(q) {
    if (q.type === 'matching') return q.items.map(x => `${x.key}: ${x.answer}`).join(' · ');
    if (q.type === 'order') return q.items.map((x,i) => `${i+1}. ${x}`).join(' ');
    if (q.type === 'multiselect') return q.answer.join(' · ');
    if (q.type === 'text') return q.answers[0];
    if (q.type === 'truefalse') return q.answer === 'true' ? 'Verdadeiro' : 'Falso';
    return q.answer;
  }

  function showResults(story, answers, saveResult=true) {
    let earned=0,max=0;
    story.quiz.forEach(q => {
      const el=document.querySelector(`[data-question="${cssEsc(q.id)}"]`), g=grade(q,answers[q.id]); earned+=g.earned; max+=g.max;
      el?.classList.remove('is-correct','is-incorrect','is-partial','is-missing');
      el?.classList.add(g.correct?'is-correct':g.earned?'is-partial':'is-incorrect');
      const f=el?.querySelector('.quiz-question-feedback');
      if(f) f.innerHTML=`<strong>${g.correct?'Correto.':g.earned?`${g.earned} de ${g.max} partes corretas.`:'Resposta incorreta.'}</strong><p>${esc(q.explanation)}</p>${g.correct?'':`<p><b>Resposta correta:</b> ${esc(correctText(q))}</p>`}`;
    });
    const percent=max?Math.round(earned/max*100):0, passed=percent>=story.passPercentage, old=progress(story.id);
    if(saveResult) patch(story.id,{started:true,completed:Boolean(old.completed||passed),quizAnswers:answers,quizSubmitted:true,lastScore:percent,bestScore:Math.max(Number(old.bestScore)||0,percent),lastPoints:earned,totalPoints:max});
    const result=document.getElementById('quiz-result');
    if(result){result.hidden=false;result.className=`quiz-result ${passed?'is-passed':'is-not-passed'}`;result.innerHTML=`<span class="result-label">${passed?'Story completed':'Keep practising'}</span><h3>${percent}%</h3><p>${earned} out of ${max} points. ${passed?'You reached the 75% completion target.':'You need at least 75% for this story to count as completed.'}</p><button class="secondary-action" type="button" data-retake-result>Try the quiz again</button>`;result.querySelector('[data-retake-result]')?.addEventListener('click',()=>resetQuiz(story));if(saveResult)result.scrollIntoView({behavior:'smooth',block:'center'});}
    refreshStatus(story);
  }

  function resetQuiz(story) { const p=progress(story.id); patch(story.id,{quizAnswers:{},quizSubmitted:false,lastPoints:null,totalPoints:null,completed:p.completed||false,bestScore:p.bestScore}); renderStory(story); requestAnimationFrame(()=>document.getElementById('final-quiz')?.scrollIntoView({behavior:'smooth'})); }
  function refreshStatus(story) { const old=document.getElementById('story-status-card'); if(!old)return; const box=document.createElement('div'); box.innerHTML=statusPanel(story,progress(story.id)); old.replaceWith(box.firstElementChild); bindReset(story); }
  function bindReset(story) { document.querySelector('[data-reset-story]')?.addEventListener('click',()=>{if(!confirm('Reset all saved answers, scores and completion status for this story?'))return;const all=load();delete all[story.id];save(all);location.hash=`#/library/${story.level}/${story.category}`;}); }

  function displayVocab(story,key,button) {
    const v=story.vocabulary[key], card=document.getElementById('vocabulary-card'); if(!v||!card)return;
    document.querySelectorAll('.vocab-word.is-active').forEach(x=>x.classList.remove('is-active'));button.classList.add('is-active');
    card.innerHTML=`<span class="tool-kicker">Vocabulary support</span><h2>${esc(button.textContent)}</h2><p class="vocabulary-translation">${esc(v.translation)}</p><dl class="vocabulary-details"><div><dt>Portuguese definition</dt><dd>${esc(v.definition)}</dd></div><div><dt>Base form</dt><dd>${esc(v.baseForm)}</dd></div><div><dt>Word class</dt><dd>${esc(v.wordClass)}</dd></div><div><dt>Meaning here</dt><dd>${esc(v.contextualMeaning)}</dd></div></dl><div class="vocabulary-example"><span>Example sentence</span><p>${esc(v.example)}</p></div>`;
  }

  function bindStory(story) {
    document.querySelectorAll('[data-vocab]').forEach(b=>b.addEventListener('click',()=>displayVocab(story,b.dataset.vocab,b)));
    document.querySelectorAll('[data-check-reading]').forEach(b=>b.addEventListener('click',()=>{const box=b.closest('[data-reading-check]'),id=box.dataset.readingCheck,check=story.sections.map(s=>s.check).find(x=>x?.id===id),answer=selectedAnswer(box),correct=answer===check.answer,all={...(progress(story.id).readingChecks||{}),[id]:{answer,checked:true,correct}};patch(story.id,{started:true,readingChecks:all});const f=box.querySelector('.activity-feedback');f.textContent=answer?`${correct?'Correto.':'Ainda não.'} ${check.explanation}`:'Escolhe uma resposta primeiro.';f.className=`activity-feedback ${correct?'is-correct':'is-incorrect'}`;}));
    const form=document.getElementById('story-quiz-form');
    const draft=()=>{const p=progress(story.id);patch(story.id,{started:true,quizAnswers:collect(story),quizSubmitted:false,completed:p.completed||false,bestScore:p.bestScore});document.querySelectorAll('.quiz-question').forEach(x=>x.classList.remove('is-correct','is-incorrect','is-partial','is-missing'));document.querySelectorAll('.quiz-question-feedback').forEach(x=>x.innerHTML='');document.getElementById('quiz-result').hidden=true;};
    form?.addEventListener('change',draft);form?.addEventListener('input',e=>{if(e.target.matches('[data-quiz-text]'))draft();});
    form?.addEventListener('submit',e=>{e.preventDefault();const a=collect(story),missing=story.quiz.filter(q=>!answered(q,a[q.id]));document.querySelectorAll('.quiz-question').forEach(x=>x.classList.remove('is-missing'));missing.forEach(q=>document.querySelector(`[data-question="${cssEsc(q.id)}"]`)?.classList.add('is-missing'));const v=document.getElementById('quiz-validation');if(missing.length){v.textContent='Responde a todas as perguntas. Na ordem dos acontecimentos, usa cada número apenas uma vez.';document.querySelector(`[data-question="${cssEsc(missing[0].id)}"]`)?.scrollIntoView({behavior:'smooth',block:'center'});return;}v.textContent='';showResults(story,a,true);});
    document.querySelector('[data-retake]')?.addEventListener('click',()=>resetQuiz(story));bindReset(story);
  }

  function libraryProgress() {
    const all=load();Object.keys(STORIES).forEach(id=>{const link=document.querySelector(`a[href="#/story/${cssEsc(id)}"]`),card=link?.closest('.story-card');if(!card)return;const p=all[id]||{},s=status(p),badge=card.querySelector('.story-status');if(badge){badge.textContent=s;badge.className=`story-status ${s.toLowerCase().replace(/\s+/g,'-')}`;}card.querySelector('.story-card-score')?.remove();if(Number.isFinite(p.bestScore)){const score=document.createElement('p');score.className='story-card-score';score.textContent=`Best score: ${p.bestScore}%`;card.querySelector('.story-card-body')?.append(score);}});
  }

  function renderProgress() {
    const all=load(),stories=Object.values(STORIES),done=stories.filter(s=>all[s.id]?.completed),started=stories.filter(s=>all[s.id]?.started&&!all[s.id]?.completed),words=done.reduce((n,s)=>n+Number(s.wordCount||0),0);
    APP.innerHTML=`<section class="page page-progress"><a class="progress-home-header" href="#/"><span class="progress-brand-copy"><strong>${esc(DATA.siteName)}</strong><small>Return to the homepage</small></span><span class="progress-home-arrow">← Home</span></a><div class="page-banner progress-banner"><div><span class="eyebrow">Your reading activity</span><h1>My Progress</h1><p>Your story status, answers and scores are saved locally in this browser.</p></div></div><div class="progress-grid"><article class="stat-card"><strong>${done.length}</strong><span>Stories completed</span></article><article class="stat-card"><strong>${started.length}</strong><span>Stories started</span></article><article class="stat-card"><strong>${words}</strong><span>Total words read</span></article></div><section class="section-block progress-story-section"><div class="section-heading"><span class="section-kicker">Story results</span><h2>Your stories</h2></div><div class="progress-story-list">${stories.map(s=>{const p=all[s.id]||{};return `<article class="progress-story-card"><div><span class="level-badge">${esc(s.level)}</span><h3>${esc(s.title)}</h3><p>${esc(status(p))} · ${Number.isFinite(p.bestScore)?`${p.bestScore}%`:'No score yet'}</p></div><a class="card-link-button" href="#/story/${esc(s.id)}">${p.started?'Continue':'Start story'}</a></article>`;}).join('')}</div></section></section>`;
  }

  function run() { const r=route(); if(r.page==='story'&&STORIES[r.a]) renderStory(STORIES[r.a]); else if(r.page==='library') libraryProgress(); else if(r.page==='progress') renderProgress(); }
  addEventListener('hashchange',()=>requestAnimationFrame(run));requestAnimationFrame(run);
})();
