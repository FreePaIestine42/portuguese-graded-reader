const HOME_FLAG_IMAGE = 'data:image/webp;base64,UklGRhYEAABXRUJQVlA4IAoEAABQJwCdASrwAGgBPxmKvFosqKakIZEI2ZAjCWdu4SvejDAm6hxWe852R9UAfp+GMSsJBqCAkBSvGTx+bV5ub5/78ZHNvSm1AUtDyBrgYulf+0Yq3Jj6RZO8Tq3NXNHFJfreOHttz+IRxkbjqUpFOz4CBTQCkioz4An7td1NrxBClg5+okcEoAtbbn9VhYOAKbS8EMJhxMVaIjmOCeWJBje6QNu7nZR2axzbtoGRU0HPG94KGOXH50gHLTILfZtd3NpgwXolXus21rbuagMlEyGm96b/FXg6WlP3syNL/ItRWCucBHN3pPeWcto2//Wz7NjOpomC6YbvCLZvo2j0/Tjcmss4x108dQ5XYYKlRyadAxSL2AzII/aseQROwNQ0GlD8ShuKrfrsWVJzH/vw0zxLu1qFz3bZ4pO6cEyt+JP43zxZAAD9384NJrcGeJKr0Eq3COtELIQH2AX9O3KIAnthaFzDEB4DmJLeA0ekSACXdWTIozfY70dQZDI6hzILqAu4T9x4pTkduGwcN/pNTD5ydoAjuDgKObWoqBkXMPzztGSVbA/IPnqAzyL6S+1YLvHWZFJtzmH2D9676SdfgSf+OLmAoKo1zfhmyNfcT91/srufvuY3itJQj6C4d1VNW1YF9bXuUFg84a4Bl/fLdkLPM1wfM4dL9z9i+GJI7f2GD1uqq2Bvj91GbP0ICEOf2IvJGqrEEqryRoxG7EbE5B8JHK8exQp4uHyh1LtEZ/0UBboobXeTfquykc1maHEec4iLIqLSkCBUVwUtuhE0KkR4oRgtxvKQtP40J9k0kTR/B3bQoB72B1Sr9/6id2m0m8aLsmTZt7obbX4dW2LZdbmXkB0UU8uBjU4iVvkCmlFdX9RJI6K17hmJq/RyhY/bewlmmHzupRQNRVd6rvGienwPj65r1bpMwGLN7jcDchcyeY7dogKVwpr6G/nebaomyzscVKp9Pqt/95ErT/hFtxCyiARHVQe/AHuL5mgoE2vOJx3pL7hT9a4SgJabb9bxrzxwvJS8VfaXbNM4snBr3uijx+uX8OQcGtvlrePvVbCAEpTlTTyoYoNPFk15c8BWI/DP3cv5mI3W3FdBT/bjyyUHB5+u3BIQhTcwbzvAJUeWHP1QTMO7W4oBNRoj40+GVKl9ogsanbynlHpt8KF+gjC1YhQgvkzTzXBlkbQbS/48WdWXagXkO1jKUmzUtZsHygpwiDDZ6zaO/qtKRf+hmLEQK3QlsJdigZLrpHfCzOQFmVnF18VitYDTPhs3gSOquNYCZz3mE7bnEDcDwLbWAwwgoIxsgZjVJMEL3W81TgtPH6EJsebiW9O8rZQuV3n+DHOQS3jOP7i1uUcSr/5zF4wlPoscP5Jo7aYAAA==';
const MARKET_STORY_IMAGE = 'data:image/webp;base64,UklGRuQcAABXRUJQVlA4INgcAACQzACdASosASwBPxl8tFGsqCUnrDKd0ZAjCWQAxuzC1T+VcenkX4/4N/T7uO+dhvFqsBzc+Qm6HFxK9eJrh66dtXwx8V8Dtdku3IyNxIQvv4w2xj4LFbYAvOvB/l3uwUUEFJ4m0QfeJ0VBrOF56s3FWBTwYM5sefD5eYAJ5E5rDhb8DXa+/I3+/48pUjNr5xSuI7ZH8lMBf5b/HIziZTk5mrmNTIs16rXdNbfygGnsvPsKPrThGqFzo0Pa2VFkcjDFpwCPLWxdg2l0/2kpnzqNEj9LyloKxpO4kOgI8tech/4ACT5gO3TKVrQ/EFMNdB+y5piah9XWwkkPzHkS/IrXCNJCdQIXnAQPWo28jwMekRuShtCRzm17t5F0oXRoJ2qFYWiovCQwPApyS4RVH97djdLaM7zHWfGm6B7G/2qjuDMFr+PaPbBjdwhTaog8sazJhEWZJ4p/AuiTj5YydoNBSlfVM3gQGvuZP+5/7taiTVgJj3d532TXlCdCrExnF4Ok4vIV+Kquj4Pgv722hUb+sTpnEbnT5h9Xbovho7foKlRjyZjo/Wb7+CTA8U+lyl/KxeVYS8l0AFf5MCQgcO4tpbBL82ei9ROL9wvC2Qjuh2/rTqYWToccebqainY4WWOcnng/M343Tcockx1RmlYAv/Hf6u6y2AxLD2n699Hpb7z5kpJvpSo6Lgncy11SvDOVB4obMKgWC3uoXJCE4po+Xvy24LWJzCBCBKzP9NSFYD6WTH9X0kPOMEKvXhqpCnbouX0y96CzXpBUiaqlQAdlJrGspZAMAGzcZ3FYkSC3EM7a18b8Q5gsva0K2fGzo6Ymq7efYMoMB/fs+0+OSYrBAvJvVHVWLP4qMbdq7Wbd8tjxFOsat0Efzjl/Qa8qpiZf0I1LDGvYO8ujVZ8YP06pTe6Y8pItoCfgU++bBzJCoSUcoXgevqQMLN3Jl+hMTmO5inj2xY6kYlIGO1UZsr5Itm1IFIJedXr1eaPTmQMQe1TjOU5OqFgw/ffFwX9NmZF7Q9Mzjg8WSXxmDD2RNlvSP0WrtTKPbg87Wcr+6LfS8sEFmZVSRnRH3QP9O1VG9rVrPZfBnVdLqh+/e7mUshTPQIl/ttfSdgoK6e9+2BWXIW2ncAYRrfazIWwUaSzzAuYH7szxZBMM0zZgINkDhlXtAnJIacUKiRRdJY+5ETiURI1uTNLSDgVH3ish7a35hfQkampB8IVf1JJJjau/UX7C+wIxhJT+xr1jlJ6LYtQMxf2Gik4n+eZmgzY9T2aFh5GPaxchyaeOhbYeBvT0O9fgXjfxhRnAImAV6sT1bdNulzK/sB8Xgef9/TCmi1QbL4KHQSrueJU90ePhXMdzhZcIFR6ZD/5SLTMJwc5RPLKfmrwLcSpo3F9bVIOUZgj01Cc5Z9V9LdfKJFjnM82qQiWdG2BFJer3jvROaMV5WGEKDaWZAKLySiFwz9UvehNSwCysoYOCoFGhW9vWuxwivCCVSW4qQQfVlyHL4JtSLD16XkQA+jNz/CIPJEFMtfrGTyQfYW8njUw4fX+Kb3KZf6Yj6bEa3aIjeNqFczHM7rgdvEFAgIwnvg79a2JkDanFi0/Chb0wrdWiA3p9MQy7vF3uELt4Ol13pdWxvImURxi9eQzMSkbMc/PpXqO6ro7cP5g8zhNBnMNp7yQCQS8pkrsCn9Mbsi9PTx1tP4O7a8YQbUAkYWIYhiik8Sdo6x20BdjkT4Cuz2DVSXdjpADL2Rpz1w3fMfWTo0DjzINngZiFA1zCv1JgYopK41W06q6p5Ij27PNI1NdgWfg1Mlw5VSr1SS8SMysazauqMUcJhgfTXaRQnsaVRJ48JpZ3qv1EKJun6sMJOjDVswe9+yVvWQHSpHRL0WBAVDNIK7w8HLNB1xf0Rty+BWYevhRsGwstyvdZbcm7VBLXzrlRh9HL2jdPeYzbiainMHOxqd94GXLpOvZJEclNCQ7lf2X6HsSJWsswGFM6qrrmPUzhuennw67WkkQs9Pu/aIaKqzVkgPFZLVQru208RHHbp29b/rs14JciCZbcMyYqU91+Nor8iVnNCAlwwNB3dzz7VGNkiQUpZHbjXvnr8yzxQuG/+jZfK2uGa/560s5auS8JXGHAwSK8mIk/Ci1/MN4acHC8aEp2uNwragPtg7dFxdpjA+LCNIedYs01sWseP5kprwWAAP74AGCNhRyPk3F7bD4uI/mKibOyMpN4RbzKeGclj/K2IU3Q+vAHoPLYzWBUFlxZE2/WdRStmhzVSNBdmxujsgM0QHDWVmV2d0Mu5E4Xndt2cZFLRihvx1QG2MJY3c3AicxGzJ0mMoIYxE5cc3tgmJntICskSMMu8YLmDEMs0o95Q9cNfIOIx4iTBUtCmFWqMXL09Yvtsim2Nh9YFDEqC6A1Osxd9fGrqymhZSvrCXeRVGXWgCBe7cEP0kxGgeOLFJL7mVHqTpreL+mppSwqqwpce1bOXLyoocdZ9XXOagcXWIN8wlIf9OM/6BZ6xPHoew1iKx0r38V9+eQpNE/KyK2HjnHFlSUL9CG/9d/tcjEqoHJXE76rLHaThokwOf/CCvdUClDlSOFTawRtvzejI9cv2quwxItLV5OBT9o/bn63wNW3Y+EtmgkiRlUvZqj8raLcml6ngHQJ0ejkRwdE6i+1k6130IEOySzqHqg3ItCXxniqcek8ylfyhefF40kDWbkD1/8FLhANDZmXOCI+5LSFdOk0ce+8YwT12UymsXLWsZzmVm2fw9qLiSlyKMIDI8UU3GZ+LZQi8lh9+sFSerkJ3FFt5+kY2CRJp+npv9WbDBoAAd2ws6YwrlTLd4dcuT7hNd/z6NtBxc+a0jCktKNTKcQ3bcegXflIM7sd+DL9TmptelFtwsGXx3yVwQpvxgFxwy7+bJZ14zGqiDNVib4tuXqh1ljyOLDVTTxiEeXanhWqL1tK/7sEsdRcDrW0c3ulQQyd527VjwqqEe68fmpoBMDM3hQxv5DwTTgRgOFfElALztzYMRNkWdtcmStpNVwqdONaHLADZiAcS7F0f+fO8s0GoeDeWAAWqWtmjZL4VNSbVEoJB9IZUj9XKy2zBmTZtDyNFw4pBl3r5GwrFqIqgKt729NEi4VRpQvbprdn6gEL7+8BnDdD6zeajxtwnbousjtW9kAh+S7nQowWcWvgkZbKMvo0AeN8oJSReBxm2S4zDX+OmXWAwH0wHsaL0In3T345fy6N/MzOjG+JL9adTn0OUJerY0ZWkByi/eLBkHFW50q/RwhaUtqFywOLCvYCYDyk4fnpBY5yCW41r78ht2cK8IGlMgDXCoXVsIv+TExxmXcfcCkhNoCGgYy9Tg9RLbRUt/pPsTidk6XCfmWKg7C5ilil7ndJzebBcF1L9WxLN3WuOX5A8XrwG7rc1ciltM5lxleHw68Pplnxv1PmqGYy26T69nQ9l1mNMKWuUbPq8ybLbFG815ezF7ykay6+wxUlibssm+pdoQVbyTYlJ3xsGwv96oc9TID5119rAdbDTYkyCZa/qZjyDiBHmjAZ+drfDTxCddFr2b9DWCIvjaZJCC7Rgu60ZaXEYAIy0IwUcKMq8uQdvzfWQfWoHxnNy8HM71QXXRaS63gCzYZ6zEJR0BJw4DM20MJGOxlAnoFD5h8Fo8LcxrkusOysRotSB+J7fYt7LyAwLC/T/Cy3aYzw7hhEeKIzXANaP+ce670yLcjjesZaVH3TOia7i2t/2B74o1TZPBdXH45V42J/M8hmYtZXCEz7CxhZcxk8q8g+GaAJmE/zaI3nKyeb0pHuMvqYVyo0Y90LPinFcCfMcCYKJ9y9M6CBOjVvJcxJY3Z3JvKWvm3cdB6oCE0ZC50AZlUmrQUwqRmlKkJMI1+0xl81v6pphgOqJ+i5tvyUXLjAWjqr/hmpAVEHvNJ+V/S75L7aqGmkmZ/7Pz0louNf/dAhcEEbOIaIsV+H763/rrhNThj9ol1ViLs/wux8PnveM0f6DkUVLEiAquQiED/EXNuyz+lSSTmWhDMQiy5oT6zYOLzWY/IzlI7qfXXApsELyTZsSFVVVlhAkv8F8F9PIa+Q5YnF4XlZzoiWi3M+emrjCl5HTQpbPtl4gGn7H9ZK5EyXC8dZy/tdQdc1fQ6U1lvb+PqXY7pltCuP4rTlr9Zv3c9SqZQzOzviANbi2MOeT3d6N2AWpDVZx1daLxrbbaThl8n1quOiNbG3w0cx4ShHZKAoUqPa18ntpns5fyxX28ZGs5h6AZMOnw2Mxnlau9Drqx05MxU9sBS3zRB6FGHuPVS0zDSOcHXsZ1BpyYSC3RAC0fRbNMKlT0ZbBP3WVp9Sb5LAQ4l7udgafdy2eOrJuFz6Ix9/zzSgIkKtzLD16vKMCxzRqJOW9hpU054N+zBMDOXxoYQ12SJxccxKTatMYTjllBtqg6InJ5iNV9+CwkyWGJGu4l2PrnWcUBW438IqttKYNDn7Fi/gY9Xo07ULDA7osBYWrp8Di8DOrM0iOeI1ZNGbNpD8T1K2kCE5O36lDmHmG93LlLRjBMTlOF8NdHz5rolHQlyMJ/mjaRaVnoeazw5LAz0XgFEsaNnbiLDcptQJmGBFhs/gU19Rm/QthRh3pQN7UHWs+R+4xbQAzxZsIi5iy3GFFd3eJEkPUL+3gkwbqyGOnYzyhDMSU63r+T3veoc3hyPloCj/MsB2KFqmsWimhtpsIoFyneJEsWzL+DOy06ejHcm8qAXIcdgedOTDnQxJCi+9VRSqGG4zv85c8c/pXSgnBFIsOyVNBF+YQV1Z80A68hdL4iQuSjvSF0ju4y+CU5tbL3hlo8jGaMgmEVgQGqc5/uwkZRK5eO9dKBCeMCn9DpnOuPqbl0ICxX4usyT5gySmLfWYN2fs75fvI5G2dt6fHz50zD7KB+K7BYvOO/b1T+yGwZqlYDhxqckqK4X7Ts4hGFjB1h2ErbtH2OQmBORHkHi67PaP8plr+97QYd9vcl9eoGH770JzOrp7tJz1bV6+z8rC7+CXuwhGaLL8etYx/zcvfY3Qs+MYU+IQF4YNzTWQ9bBxCOsHHLSzMPpSHY929uJLZFWqAtQa+RzFMDysVgK02/RmayDJWoa91oa9VFFibBYF1jecFATyXHdZ7P6ihYzkK3uIkPVA4QFUN97kDkVbqfcU57Q/o+oTf0GDl+KmCwrrbOmKvfFeHvuim0mcs7HXXHul+YL4t81YEknWEUIDJKVPnVsrnTWaAOWvjuZ1e7H8/p/5SqNkPutcN6c9yDJunHIKNyL+hhORRTzX6yXmfEl9szwT6eTlV+9vvOnSo7RW825ogRFfDL9yHkemo4G0FFMQFr2CdMk5OomAJ9mUXtQFKx1eP8/ErhznITwxdV80C2IajWFKke1hdTetDDxvNLFXhYz6zd4GA7oX/SH0EAGHEmOOxAMV30WGf4ic8SIcUDofY+ZJARkOq7BfmdYPlj5ObNwZl7EQeIMFZ/aJxUdlw2o20Cee3A1b4REqkjrHUFvwrbyySbto95LVvhVuNJpA3Va6jsT+lb+CpNtypRtjGHJmz+iEc8+azUmBSP14gQP7w/82sJbm2gQF7pq1I4dUeRkawANvIk8ijHua6323XB4gTlMVPl0VStSCPxT6fbeoRIGVCtwhyRSARmlEZJbOntBW5EsxmId5U1bBFb7zNzN1o7m5Q5KAmrGK4bLYPwArkutyLjybB+Jzfu48zMGpDDhWp3lniGZdgC5cHLtoyKRQGnG9s4OsWrkcQ4vM7LcAwmIl8tsLJmE2Wuh30zfVgTcDDRtpBag6Sg5HfBtiGgfRqiWlcqM0GicbnKHi0q2DSaAldbqoTXZQfw4odw3VRNsID+IK/0bkdqmPSCWa7K/zlRFA54eymucCQTaa8a0EYN/iR+ZhqN1rS2YIpbcUvO5ZngfaZZdlOMT9YFB27AIcIBVkTiyTgGLJQHA/EWcEA0K51dykoCm45d7IWJU1oZNrmn4tPcGIC+4axNeQH8o9fewB1Htqs9koEiA7oJEelhy5peaakVQBMeS7/dQfcIrQygp7tBY8fsOLM4viKjEvgMln5rQr5u9aBUQIj8Xm1cf7XK1x7204HwG0xBCe16e1R9yXHdlGNXJPl7eGWTqVx3zMkCJtV3SZAYTLpTTHlTe3tukdjs6+pyRCkuigbWCyh0AJ6w6IgBTQeMqI4lQra017PPbGqYuTlbxK1qiLKfWH2dSZdX3UMmMwmyDSAYcZU6/uOjb2WBwxBVj0d4AY/Yi3l7Oyzq57WZnOtB13M9TdEPckIaECljOHS4j3froeszEDzdOA7fuz+gK4eHCN4Pd7/G32TJ5sq+pY3voeCQ0cpHBnaWaz24CbhbVxkA17uzVSWy/fbHr55Rkw1U1YM6cq7wc5cQN6fGdrBk4mieJ3hkzlWvzrBUkufBEDJrUZZJfK0WHHil6xyOz8ZuxNRoi8G6AYzweYklujOEHqWllFMXnpXJgZH6cHkgzB8HtkzzTj1xiFOr5XUOex+gFR+ItdJoDyKFitISxZb05j2UDPnQZW9bVzeKglx0OUvPAdHg30W+8HKB/igOaI+eiFLRpRhmVMs1zNwIUsRZLQQFvyjgejF5E7HTvVtmZw0woyRBtOlsDM9zbMykzHH4u3LbrOr+1v8EzmWSgFdi1hwZm4dWOFbJMUm25UhorublxnuUDZ6skniuA3zUSHsR1ETuXi2HhKLD+HQ+qKuCrjX/icEjMzFM7DZuLqm7JemnQMKwrf004yN3a/pfDRstysYGQn0RRIlsUi42/pzWl3izUZupoEzKag3uJLbubBudyDd5ZriB3yTo+J6eu1SRM5SolooLNoGHp1tVwFu+kuTTDEUwlDoir6jGd53CROYSRRbHymuu3hfnBjIsLHjcPkbDWF7jwKYWL9Cb5OIoASwthFeErg2oqy5RL/h0J+qM88oU1t0WeOrGl0YpmIffFjnVzIP3nc66b7QFiUPax2UW8hu2GWXnXsfLrgcSp41Zmw35McVwXUrCCD9fNge4qR7J5DDQ0FJyXEul+2lwpfjc6ven0nJbQ7Ffc2APnVeTnAYUnV1rGO7Yv+XPvI1KQzu8EzH7S1weU753TqZ0+uRm+l9u9glTgx4eJEL1E0xY5wKRQjleeGkNBMdtGS6hWOJU3oX1JoC0VKY32e9FM5xQEZaLziJB5UfSPD7fszxlRrVfADreEubrNzwA5bSHjFdd24cUxq14yzm30b1ry4aq7fTeU/XFx3MyI4ZSWXTjdnt5oJ19fLbgFC4oVuhHBPy68ZfL77O4UQaKNauiC4tf01uB/AbBJ5ORxZIPeT9mvZvLXO4X/hHYrdymL0ye7T5FY810QMhRhk0IlR7krIHFGWGWfgzvExObAuaYDG6jg6dUyaaFkiHilN4kU7SA7hy1NwS4QVN3kTDSNfx/GEE5+ehhiN1yPaxrazWIsubLti1poR/oyfYN1irHX+V8XkUZo4nXg97xKP45bWC/Kp6mr0HOrebvvcI9ZwY0EIihhZl210uTX73fNS9kkCHQj4iuUJMtqq6vAMsGp3in/czYLHnyuweIVOfbluIpO/+EDBa3cRylL7P11y1S2p7Zs9BZV4fXOKrlAW9YFdy7HKMMGay6HJ5Uh128b17LqRFZWlxmf9vWrKVzUP+0ATOdcpZ4hW70i+EBIY+J5IJyUyu5GWgsbIJ1VMC8X5+5OSuZ+IzeF36UCSYK7KC5wyOiAUXmEr4wxqdot9wUsNG+hc5B6A96VFep1YTajf5sBjSAbbSkLoXTILoMT+Of/pDaMGoeqgkIdLWqbQjodq/1/tD7tyGacwE4SqW61vr59BedyHzDArvQ+IXqBmg77O9q0ldrJtC9CxnJoVNwX4GpCwZugw5cXFr08SDmHVGjGq9U6l2ZDQTJDoua/BXqJ3IVh3IgDk3v7UIkXDp4bV9oKFTmWxgmlCSIMY6XIq7ch2qwpFcid0khsQIBNgPcMD9ILlRZhpMeCUIs8x2LJdrtNyUQg+gIxsWiVQq9525RN8fsYiGTD8pJWJBfAP+qDFq/Cu3wZq7+1LFR7pBzAxQIEsShjpJ3Nv3widYUVkC6l7WZGmSyv3LlpNIgJ71Uyjp1/N7essO2kA6afwLiy85OuZhsjMCR/QVpVVRdWCS6NVvBwwMTU+YRQDWSWMoKgJQZ4u9S9CjYFX8Py0MwcnseELg62zEiOqs8Oi4rf17tIHnKw9mR6uPY7oyiWIJkD1mJr7diTFv0HIDThPH/sf2zrh4f6nlX9ul6BvL87kIo3v3HidpW+YxT/MkOh/e2108qDspfhJUhPHPBlsDp2eRGK/BRgDKzuuTxzCWwrCYYxUiogjQVYOfEeITf7LPTbpDVG2bFHAOgtB1R27osUa+5QBYx210b0MyF7jn10ZwlseBTK8iVxKjQPcykoWYSSKlb/zl1OE/eMl9ivaoou1yemNs16FEvii/fFyHJWEO2P7vw/zn/4+ZOyndf3FamLv3NFfbg9U41vFhn1jThPFm5S0H/zg6D4QQeK/mQjaUlS0LO4wf43uFx5N7mMQ2i8C3TZt0WPxkDy358zbBU5WVbw5E8MbojF76Zgfnu8+NPgcaWQiA6xldrh9O7O3k4lykRZXtox+wIgzXveukDJNTlOQND0YVrlVxInb7juQBCHIObCxWF6QL/d00kmT31qEU6NeaonQj+I8jSUaulQOHOaVWOH23dGgSyEDcoV1Im3I4d4jDr43WYrHqikOsyCTaUt+OTF2nz5nHUVS906uws//fI/QptCRa7D+nSD9dWUndDtxAs1MCCl6pHBkuyE03nvv96Y2E/he8P2jEfNqDBVcYK+DuVaBtlipcWv6Z8T6JmESQINfI69KVPElgoJoxT5yIDmcO+hKLk7TJmx4X/41aB6hvPRrn5jxrVyE0vQHdVZodV09ZQG/PvvWHLYVqZtH9LEwsPPSZ29gbqNoFdpB9wyV9Y01nOMYzJh8y23Bzg3u7ohvhtRCYJ4vqlQxplhsxkuXgIXV7SVqGj1+FsJTINYfWMvRgq1oausEOMwPi3wgF3zBgBCmETqzQo1LJwgJZGWAlDDzdySRtL81yl6GS6v8IIw+Epll4/og5TqAjFTcMMvqJw2wFv5Djf5QBSh09cdq6RgVzyNkKjabPJNeQSKU62JDTsa598s8LvTqXKvOZMIKzFPWKc3o0qhLQEcGtryJU43Iqka/HNAlmk8hZcC4yyMwctnNNqXc+uUyqg461WDaf03gepAwIgj8ZxxPM8kpHDubcyiguyh4FadmH9LJuUyCZFuG0EbjfElhE3gJ9wYnnGtpdwlVZ6gKFgHH4W/FYQQUqRHVpTFvI4AjdHIYq1LE5ou3j78z/Md6iYgUm6eWY1zZQNx0o76101I/rD3NfXOfhpBA6v6TD8YjFBpcGmdLEtKW0dcFgzHbodQZsgNX4V4/I79vhkkcnNeMlw09UnzTvpMBYz8XCa1wcxtq9U00DxaRl3lK7uzCm9B+gkW1ESqfGQogrh2O6QGm4087BITW3UbU27KEz9IFx/UFVmeUqUmDH6WN8eQwLR8xLVey9pqkf3+St+EjJc8UC9xxUVYoT04CZd2EgtHSlRVzaWH1R+abTF4caTA0L1eVWqmla5DqUGScgECjzNwcdzyPN6Uco+xT8uL5J8J/qTU2yc8ZmuqHodtsqBue6pLrV8t1Txn2f6v5p4wnBYKQ/knA3xJ4D1WrY850Uwt3b3CYmXfZMeCEaQHqWiT7QytxtZoBXang5Nm9D/Vu5mIR1fdaA6e0E9NqGn8VYpvDBdNvbz4ncnuGO/8n0qOLPbcuJ77vEwzhyntYHvizmNOkEtpvUAAA';

window.SITE_DATA = {
  siteName: 'Portuguese Stories',
  tagline: 'Read. Understand. Practice natural European Portuguese.',
  homeHeroImage: HOME_FLAG_IMAGE,
  levelBlurbs: {
    A2: 'You can understand straightforward texts about daily life, familiar routines, and practical situations.',
    B1: 'You can read connected texts about everyday situations, opinions, and experiences with growing independence.',
    B2: 'You can read more detailed and nuanced texts, including news and more abstract ideas, with solid comprehension.'
  },
  categories: [
    { id: 'everyday', name: 'Everyday Portuguese', icon: '☕' },
    { id: 'formal', name: 'Formal & Professional', icon: '✉️' },
    { id: 'news', name: 'News', icon: '📰' }
  ],
  levels: [
    { id: 'A2', name: 'A2', label: 'Elementary', color: '#7a2e32', softColor: '#f4d6d8' },
    { id: 'B1', name: 'B1', label: 'Intermediate', color: '#0d5e56', softColor: '#d9efec' },
    { id: 'B2', name: 'B2', label: 'Upper Intermediate', color: '#c07b2d', softColor: '#f8ead6' }
  ],
  storyLengthFilters: [
    { id: 'all', label: 'All lengths' },
    { id: 'short', label: 'Short (0–700 words)' },
    { id: 'medium', label: 'Medium (701–1200 words)' },
    { id: 'long', label: 'Long (1201+ words)' }
  ],
  stories: [
    {
      id: 'a2-mercado-bairro',
      title: 'No Mercado do Bairro',
      level: 'A2',
      category: 'everyday',
      wordCount: 620,
      totalTime: '18 min',
      status: 'Not started',
      image: MARKET_STORY_IMAGE,
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'A simple everyday story about shopping for fruit at a local market.',
      instructions: 'First read the story, then complete the exercises.',
      paragraphs: [
        'Example placeholder text. This page is still part of the structural foundation only.',
        'The real story, clickable vocabulary, and interactive questions will be added in the next stage.'
      ]
    },
    {
      id: 'a2-rotina-manha',
      title: 'Uma Manhã Normal',
      level: 'A2',
      category: 'everyday',
      wordCount: 540,
      totalTime: '16 min',
      status: 'Not started',
      image: MARKET_STORY_IMAGE,
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Placeholder story card used to test the grid layout.',
      instructions: 'First read the story, then complete the exercises.',
      paragraphs: ['Placeholder content.']
    },
    {
      id: 'b1-email-trabalho',
      title: 'Um Email Importante',
      level: 'B1',
      category: 'formal',
      wordCount: 920,
      totalTime: '24 min',
      status: 'Started',
      image: MARKET_STORY_IMAGE,
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Placeholder formal-reading card.',
      instructions: 'Leia primeiro o texto e depois faça os exercícios.',
      paragraphs: ['Placeholder content.']
    },
    {
      id: 'b2-noticia-cidade',
      title: 'Mudanças na Cidade',
      level: 'B2',
      category: 'news',
      wordCount: 1340,
      totalTime: '31 min',
      status: 'Completed',
      image: MARKET_STORY_IMAGE,
      imageAlt: 'Fruit displayed in baskets at a market.',
      summary: 'Placeholder news card.',
      instructions: 'Leia primeiro o texto e depois faça os exercícios.',
      paragraphs: ['Placeholder content.']
    }
  ]
};
