var app = (function () {
    'use strict';
    function t() {}
    const n = (t) => t;
    function e(t) {
        return t();
    }
    function o() {
        return Object.create(null);
    }
    function r(t) {
        t.forEach(e);
    }
    function s(t) {
        return 'function' == typeof t;
    }
    function u(t, n) {
        return t != t
            ? n == n
            : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
    }
    const c = 'undefined' != typeof window;
    let i = c ? () => window.performance.now() : () => Date.now(),
        l = c ? (t) => requestAnimationFrame(t) : t;
    const a = new Set();
    function f(t) {
        a.forEach((n) => {
            n.c(t) || (a.delete(n), n.f());
        }),
            0 !== a.size && l(f);
    }
    function d(t, n) {
        t.appendChild(n);
    }
    function h(t) {
        if (!t) return document;
        const n = t.getRootNode ? t.getRootNode() : t.ownerDocument;
        return n && n.host ? n : t.ownerDocument;
    }
    function p(t) {
        const n = $('style');
        return (
            (function (t, n) {
                d(t.head || t, n);
            })(h(t), n),
            n.sheet
        );
    }
    function g(t, n, e) {
        t.insertBefore(n, e || null);
    }
    function m(t) {
        t.parentNode.removeChild(t);
    }
    function $(t) {
        return document.createElement(t);
    }
    function y(t) {
        return document.createTextNode(t);
    }
    function b() {
        return y(' ');
    }
    function v() {
        return y('');
    }
    function w(t, n, e) {
        null == e
            ? t.removeAttribute(n)
            : t.getAttribute(n) !== e && t.setAttribute(n, e);
    }
    function _(t, n) {
        (n = '' + n), t.wholeText !== n && (t.data = n);
    }
    const x = new Map();
    let j,
        k = 0;
    function E(t, n, e, o, r, s, u, c = 0) {
        const i = 16.666 / o;
        let l = '{\n';
        for (let t = 0; t <= 1; t += i) {
            const o = n + (e - n) * s(t);
            l += 100 * t + `%{${u(o, 1 - o)}}\n`;
        }
        const a = l + `100% {${u(e, 1 - e)}}\n}`,
            f = `__svelte_${(function (t) {
                let n = 5381,
                    e = t.length;
                for (; e--; ) n = ((n << 5) - n) ^ t.charCodeAt(e);
                return n >>> 0;
            })(a)}_${c}`,
            d = h(t),
            { stylesheet: g, rules: m } =
                x.get(d) ||
                (function (t, n) {
                    const e = { stylesheet: p(n), rules: {} };
                    return x.set(t, e), e;
                })(d, t);
        m[f] ||
            ((m[f] = !0),
            g.insertRule(`@keyframes ${f} ${a}`, g.cssRules.length));
        const $ = t.style.animation || '';
        return (
            (t.style.animation = `${
                $ ? `${$}, ` : ''
            }${f} ${o}ms linear ${r}ms 1 both`),
            (k += 1),
            f
        );
    }
    function S(t, n) {
        const e = (t.style.animation || '').split(', '),
            o = e.filter(
                n
                    ? (t) => t.indexOf(n) < 0
                    : (t) => -1 === t.indexOf('__svelte')
            ),
            r = e.length - o.length;
        r &&
            ((t.style.animation = o.join(', ')),
            (k -= r),
            k ||
                l(() => {
                    k ||
                        (x.forEach((t) => {
                            const { stylesheet: n } = t;
                            let e = n.cssRules.length;
                            for (; e--; ) n.deleteRule(e);
                            t.rules = {};
                        }),
                        x.clear());
                }));
    }
    function C(t) {
        j = t;
    }
    function N(t) {
        (function () {
            if (!j)
                throw new Error(
                    'Function called outside component initialization'
                );
            return j;
        })().$$.on_mount.push(t);
    }
    const R = [],
        A = [],
        O = [],
        M = [],
        z = Promise.resolve();
    let D = !1;
    function P(t) {
        O.push(t);
    }
    const T = new Set();
    let q,
        F = 0;
    function B() {
        const t = j;
        do {
            for (; F < R.length; ) {
                const t = R[F];
                F++, C(t), H(t.$$);
            }
            for (C(null), R.length = 0, F = 0; A.length; ) A.pop()();
            for (let t = 0; t < O.length; t += 1) {
                const n = O[t];
                T.has(n) || (T.add(n), n());
            }
            O.length = 0;
        } while (R.length);
        for (; M.length; ) M.pop()();
        (D = !1), T.clear(), C(t);
    }
    function H(t) {
        if (null !== t.fragment) {
            t.update(), r(t.before_update);
            const n = t.dirty;
            (t.dirty = [-1]),
                t.fragment && t.fragment.p(t.ctx, n),
                t.after_update.forEach(P);
        }
    }
    function L(t, n, e) {
        t.dispatchEvent(
            (function (t, n, e = !1) {
                const o = document.createEvent('CustomEvent');
                return o.initCustomEvent(t, e, !1, n), o;
            })(`${n ? 'intro' : 'outro'}${e}`)
        );
    }
    const G = new Set();
    let I;
    function J(t, n) {
        t && t.i && (G.delete(t), t.i(n));
    }
    function K(t, n, e, o) {
        if (t && t.o) {
            if (G.has(t)) return;
            G.add(t),
                I.c.push(() => {
                    G.delete(t), o && (e && t.d(1), o());
                }),
                t.o(n);
        }
    }
    const Q = { duration: 0 };
    function U(e, o, u, c) {
        let d = o(e, u),
            h = c ? 0 : 1,
            p = null,
            g = null,
            m = null;
        function $() {
            m && S(e, m);
        }
        function y(t, n) {
            const e = t.b - h;
            return (
                (n *= Math.abs(e)),
                {
                    a: h,
                    b: t.b,
                    d: e,
                    duration: n,
                    start: t.start,
                    end: t.start + n,
                    group: t.group,
                }
            );
        }
        function b(o) {
            const {
                    delay: s = 0,
                    duration: u = 300,
                    easing: c = n,
                    tick: b = t,
                    css: v,
                } = d || Q,
                w = { start: i() + s, b: o };
            o || ((w.group = I), (I.r += 1)),
                p || g
                    ? (g = w)
                    : (v && ($(), (m = E(e, h, o, u, s, c, v))),
                      o && b(0, 1),
                      (p = y(w, u)),
                      P(() => L(e, o, 'start')),
                      (function (t) {
                          let n;
                          0 === a.size && l(f),
                              new Promise((e) => {
                                  a.add((n = { c: t, f: e }));
                              });
                      })((t) => {
                          if (
                              (g &&
                                  t > g.start &&
                                  ((p = y(g, u)),
                                  (g = null),
                                  L(e, p.b, 'start'),
                                  v &&
                                      ($(),
                                      (m = E(
                                          e,
                                          h,
                                          p.b,
                                          p.duration,
                                          0,
                                          c,
                                          d.css
                                      )))),
                              p)
                          )
                              if (t >= p.end)
                                  b((h = p.b), 1 - h),
                                      L(e, p.b, 'end'),
                                      g ||
                                          (p.b
                                              ? $()
                                              : --p.group.r || r(p.group.c)),
                                      (p = null);
                              else if (t >= p.start) {
                                  const n = t - p.start;
                                  (h = p.a + p.d * c(n / p.duration)),
                                      b(h, 1 - h);
                              }
                          return !(!p && !g);
                      }));
        }
        return {
            run(t) {
                s(d)
                    ? (q ||
                          ((q = Promise.resolve()),
                          q.then(() => {
                              q = null;
                          })),
                      q).then(() => {
                          (d = d()), b(t);
                      })
                    : b(t);
            },
            end() {
                $(), (p = g = null);
            },
        };
    }
    function V(t, n) {
        -1 === t.$$.dirty[0] &&
            (R.push(t), D || ((D = !0), z.then(B)), t.$$.dirty.fill(0)),
            (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
    }
    function W(n, u, c, i, l, a, f, d = [-1]) {
        const h = j;
        C(n);
        const p = (n.$$ = {
            fragment: null,
            ctx: null,
            props: a,
            update: t,
            not_equal: l,
            bound: o(),
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(u.context || (h ? h.$$.context : [])),
            callbacks: o(),
            dirty: d,
            skip_bound: !1,
            root: u.target || h.$$.root,
        });
        f && f(p.root);
        let g = !1;
        if (
            ((p.ctx = c
                ? c(n, u.props || {}, (t, e, ...o) => {
                      const r = o.length ? o[0] : e;
                      return (
                          p.ctx &&
                              l(p.ctx[t], (p.ctx[t] = r)) &&
                              (!p.skip_bound && p.bound[t] && p.bound[t](r),
                              g && V(n, t)),
                          e
                      );
                  })
                : []),
            p.update(),
            (g = !0),
            r(p.before_update),
            (p.fragment = !!i && i(p.ctx)),
            u.target)
        ) {
            if (u.hydrate) {
                const t = (function (t) {
                    return Array.from(t.childNodes);
                })(u.target);
                p.fragment && p.fragment.l(t), t.forEach(m);
            } else p.fragment && p.fragment.c();
            u.intro && J(n.$$.fragment),
                (function (t, n, o, u) {
                    const {
                        fragment: c,
                        on_mount: i,
                        on_destroy: l,
                        after_update: a,
                    } = t.$$;
                    c && c.m(n, o),
                        u ||
                            P(() => {
                                const n = i.map(e).filter(s);
                                l ? l.push(...n) : r(n), (t.$$.on_mount = []);
                            }),
                        a.forEach(P);
                })(n, u.target, u.anchor, u.customElement),
                B();
        }
        C(h);
    }
    let X = '08adf3db-7e0a-448b-aad3-321390a3b09b';
    async function Y(t, n) {
        return fetch(`https://api.hypixel.net/player?key=${t}&uuid=${n}`)
            .then((t) => t.json())
            .then((t) => t.player.displayname);
    }
    async function Z(t, n) {
        return fetch(`https://api.hypixel.net/status?key=${t}&uuid=${n}`)
            .then((t) => t.json())
            .then((t) => t.session.online);
    }
    async function tt(t, n) {
        let e = await (async function (t, n) {
                let e = await fetch(
                    `https://api.hypixel.net/friends?key=${t}&uuid=${n}`
                )
                    .then((t) => t.json())
                    .then((t) => t.records);
                n = n.replace(/[- ]/g, '');
                let o = [];
                for (let t = 0; t < e.length; t++)
                    e[t].uuidSender === n
                        ? o.push(e[t].uuidReceiver)
                        : o.push(e[t].uuidSender);
                return o;
            })(t, X),
            o = await (async function (t, n, e) {
                e = e.replace(/[- ]/g, '');
                let o = [];
                for (let e = 0; e < n.length; e++) {
                    let r = await Y(t, n[e]);
                    o.push(r);
                }
                return o;
            })(t, e, X),
            r = [];
        for (let s = 0; s < e.length; s++) {
            let u = await Z(t, e[s]);
            r.push({ name: o[s], onlineStatus: u }), await n(s, e.length);
        }
        await n(e.length, e.length);
        let s = await (async function (t) {
            let n = [];
            for (let e = 0; e < t.length; e++)
                !0 === t[e].onlineStatus && n.push(t[e]);
            for (let e = 0; e < t.length; e++)
                !1 === t[e].onlineStatus && n.push(t[e]);
            return n;
        })(r);
        return s;
    }
    function nt(t, { delay: e = 0, duration: o = 400, easing: r = n } = {}) {
        const s = +getComputedStyle(t).opacity;
        return {
            delay: e,
            duration: o,
            easing: r,
            css: (t) => 'opacity: ' + t * s,
        };
    }
    function et(t, n, e) {
        const o = t.slice();
        return (o[5] = n[e]), o;
    }
    function ot(t) {
        let n, e, o, r, s, u, c, i;
        return {
            c() {
                (n = $('div')),
                    (e = $('div')),
                    (o = $('div')),
                    (o.innerHTML =
                        '<div class="rhombus svelte-9g9jr2"></div> \n                    <div class="rhombus svelte-9g9jr2"></div> \n                    <div class="rhombus svelte-9g9jr2"></div>'),
                    (r = b()),
                    (s = $('p')),
                    (u = y(t[1])),
                    w(o, 'class', 'looping-rhombuses-spinner svelte-9g9jr2'),
                    w(s, 'class', 'progress-text svelte-9g9jr2'),
                    w(e, 'class', 'spinner svelte-9g9jr2'),
                    w(n, 'class', 'cont svelte-9g9jr2');
            },
            m(t, c) {
                g(t, n, c),
                    d(n, e),
                    d(e, o),
                    d(e, r),
                    d(e, s),
                    d(s, u),
                    (i = !0);
            },
            p(t, n) {
                (!i || 2 & n) && _(u, t[1]);
            },
            i(t) {
                i ||
                    (P(() => {
                        c || (c = U(n, nt, {}, !0)), c.run(1);
                    }),
                    (i = !0));
            },
            o(t) {
                c || (c = U(n, nt, {}, !1)), c.run(0), (i = !1);
            },
            d(t) {
                t && m(n), t && c && c.end();
            },
        };
    }
    function rt(t) {
        let n,
            e = t[2],
            o = [];
        for (let n = 0; n < e.length; n += 1) o[n] = ct(et(t, e, n));
        return {
            c() {
                for (let t = 0; t < o.length; t += 1) o[t].c();
                n = v();
            },
            m(t, e) {
                for (let n = 0; n < o.length; n += 1) o[n].m(t, e);
                g(t, n, e);
            },
            p(t, r) {
                if (4 & r) {
                    let s;
                    for (e = t[2], s = 0; s < e.length; s += 1) {
                        const u = et(t, e, s);
                        o[s]
                            ? o[s].p(u, r)
                            : ((o[s] = ct(u)),
                              o[s].c(),
                              o[s].m(n.parentNode, n));
                    }
                    for (; s < o.length; s += 1) o[s].d(1);
                    o.length = e.length;
                }
            },
            d(t) {
                !(function (t, n) {
                    for (let e = 0; e < t.length; e += 1) t[e] && t[e].d(n);
                })(o, t),
                    t && m(n);
            },
        };
    }
    function st(t) {
        let n,
            e,
            o,
            r,
            s,
            u,
            c = t[5].name + '';
        return {
            c() {
                (n = $('div')),
                    (e = $('span')),
                    (o = y(c)),
                    (r = b()),
                    (s = $('span')),
                    (s.textContent = 'offline'),
                    (u = b()),
                    w(e, 'class', 'name'),
                    w(s, 'class', 'status svelte-9g9jr2'),
                    w(n, 'class', 'friend-container offline svelte-9g9jr2');
            },
            m(t, c) {
                g(t, n, c), d(n, e), d(e, o), d(n, r), d(n, s), d(n, u);
            },
            p(t, n) {
                4 & n && c !== (c = t[5].name + '') && _(o, c);
            },
            d(t) {
                t && m(n);
            },
        };
    }
    function ut(t) {
        let n,
            e,
            o,
            r,
            s,
            u,
            c = t[5].name + '';
        return {
            c() {
                (n = $('div')),
                    (e = $('span')),
                    (o = y(c)),
                    (r = b()),
                    (s = $('span')),
                    (s.textContent = 'online'),
                    (u = b()),
                    w(e, 'class', 'name'),
                    w(s, 'class', 'status svelte-9g9jr2'),
                    w(n, 'class', 'friend-container online svelte-9g9jr2');
            },
            m(t, c) {
                g(t, n, c), d(n, e), d(e, o), d(n, r), d(n, s), d(n, u);
            },
            p(t, n) {
                4 & n && c !== (c = t[5].name + '') && _(o, c);
            },
            d(t) {
                t && m(n);
            },
        };
    }
    function ct(t) {
        let n;
        function e(t, n) {
            return t[5].onlineStatus ? ut : t[5].onlineStatus ? void 0 : st;
        }
        let o = e(t),
            r = o && o(t);
        return {
            c() {
                r && r.c(), (n = v());
            },
            m(t, e) {
                r && r.m(t, e), g(t, n, e);
            },
            p(t, s) {
                o === (o = e(t)) && r
                    ? r.p(t, s)
                    : (r && r.d(1),
                      (r = o && o(t)),
                      r && (r.c(), r.m(n.parentNode, n)));
            },
            d(t) {
                r && r.d(t), t && m(n);
            },
        };
    }
    function it(t) {
        let n,
            e,
            o,
            s = t[0] && ot(t),
            u = !t[0] && rt(t);
        return {
            c() {
                (n = $('main')),
                    s && s.c(),
                    (e = b()),
                    u && u.c(),
                    w(n, 'class', 'svelte-9g9jr2');
            },
            m(t, r) {
                g(t, n, r),
                    s && s.m(n, null),
                    d(n, e),
                    u && u.m(n, null),
                    (o = !0);
            },
            p(t, [o]) {
                t[0]
                    ? s
                        ? (s.p(t, o), 1 & o && J(s, 1))
                        : ((s = ot(t)), s.c(), J(s, 1), s.m(n, e))
                    : s &&
                      ((I = { r: 0, c: [], p: I }),
                      K(s, 1, 1, () => {
                          s = null;
                      }),
                      I.r || r(I.c),
                      (I = I.p)),
                    t[0]
                        ? u && (u.d(1), (u = null))
                        : u
                        ? u.p(t, o)
                        : ((u = rt(t)), u.c(), u.m(n, null));
            },
            i(t) {
                o || (J(s), (o = !0));
            },
            o(t) {
                K(s), (o = !1);
            },
            d(t) {
                t && m(n), s && s.d(), u && u.d();
            },
        };
    }
    function lt(t, n, e) {
        let o = !0,
            r = '',
            s = [];
        function u(t, n) {
            e(1, (r = `${t} / ${n}`));
        }
        return (
            N(() => {
                !(async function () {
                    e(
                        2,
                        (s = await tt(
                            'c980cce5-9f42-42b9-950b-a0d2750a828f',
                            u
                        ))
                    ),
                        console.log(s),
                        e(0, (o = !1));
                })();
            }),
            [o, r, s]
        );
    }
    return new (class extends class {
        $destroy() {
            !(function (t, n) {
                const e = t.$$;
                null !== e.fragment &&
                    (r(e.on_destroy),
                    e.fragment && e.fragment.d(n),
                    (e.on_destroy = e.fragment = null),
                    (e.ctx = []));
            })(this, 1),
                (this.$destroy = t);
        }
        $on(t, n) {
            const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
            return (
                e.push(n),
                () => {
                    const t = e.indexOf(n);
                    -1 !== t && e.splice(t, 1);
                }
            );
        }
        $set(t) {
            var n;
            this.$$set &&
                ((n = t), 0 !== Object.keys(n).length) &&
                ((this.$$.skip_bound = !0),
                this.$$set(t),
                (this.$$.skip_bound = !1));
        }
    } {
        constructor(t) {
            super(), W(this, t, lt, it, u, {});
        }
    })({ target: document.body, props: {} });
})();
//# sourceMappingURL=bundle.js.map
