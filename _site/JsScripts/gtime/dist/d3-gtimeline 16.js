import * as d from "d3";
export * from "d3";
import et from "dayjs";
const Tt = "div.tooltip {        position: absolute;        text-align: center;        padding: 10px 20px 10px 10px; /* Extra padding on the right for the X button */        background: white;        border: 1px solid #AAA;        border-radius: 2px;        pointer-events: auto;        min-width: 150px; /* Minimum width to accommodate shorter text */        white-space: nowrap; /* Prevent text wrapping */      }      div.tooltip .close-btn {        position: absolute;        top: 5px;        right: 5px;        padding: 2px 5px;        cursor: pointer;        font-weight: bold;        color: #333;        font-size: 14px;      }      div.tooltip .close-btn:hover {        color: red;      }";
function ut(t) {
  d.select("head").selectAll("#tooltip").data([1]).enter().append("style").attr("id", "tooltip").text(Tt);
  let e;
  function n(i) {
    e && e.remove(), e = d.select("body").append("div").attr("class", "tooltip"), e.html(`<span class="close-btn">×</span>${t.apply(null, arguments)}`).style("opacity", 0.85).style("top", i.pageY - 60 + "px");
    const o = e.node().getBoundingClientRect().width;
    e.style("left", i.pageX - o / 2 + "px"), e.select(".close-btn").on("click", r), document.addEventListener("click", s);
  }
  function r() {
    e && (e.transition().duration(100).style("opacity", 0).remove(), e = null, document.removeEventListener("click", s));
  }
  function s(i) {
    const o = e && e.node().contains(i.target), a = i.target.tagName === "rect" && i.target.parentNode.classList.contains("task");
    !o && !a && r();
  }
  return { show: n, hide: r };
}
function Dt(t) {
  return d.max(t.nodes().map((e) => e.getComputedTextLength()));
}
function Bt(t) {
  return function(e) {
    return e.length > t ? e.slice(0, t - 1) + "…" : e;
  };
}
const I = 1, Yt = 2;
function ht(t, e) {
  let n = ["#FFF", "#FFF"], r = d.scaleOrdinal(n), s = 5, i, o = "#AAA", a = 40, u = 3e3, l;
  function h(p) {
    let v = e.domain(), $ = ut((A) => A), S = d.scaleOrdinal(n), N = d.scaleOrdinal(n.reverse()), b = Bt(a), C = p.selectAll(".row").data(v, e).order(), g = C.enter().append("g").attr("class", "row"), y = C.exit(), w = C.select("text");
    C = C.merge(g).attr("transform", (A) => "translate(0," + e(A) + ")"), y.remove(), g.append("rect").attr("y", 0.5).attr("width", u).attr("height", e.bandwidth()).attr("stroke", o).attr("stroke-width", 0.75).attr("fill", S), g.append("path").attr("stroke", N), w = w.merge(
      g.append("text").attr("y", e.bandwidth() / 2).attr("dy", "0.32em").on("mouseover", function(A, m) {
        d.select(this).text() != m && $.show(m);
      }).on("mouseout", $.hide)
    ).text(b), l === void 0 && (l = Dt(w) + 2 * s, l = t === I ? u - l : l), i = t === I ? [0, l] : [l, u], w.attr("text-anchor", t === I ? "start" : "end").attr("dx", t === I ? s : -s).attr("x", l), p.selectAll("g.y.axis > path").data([1]).join("path").attr("stroke", o).attr("stroke-width", 1.75).attr("d", "M" + (l + 0.5) + ",0.5V" + e.range()[1]);
  }
  return h.draw_ticks = function(p, v) {
    p.selectAll(".row").select("path").attr("d", v.map(($) => "M" + $ + ",1v" + (e.bandwidth() - 1)).join(""));
  }, h.scale = function(p) {
    return arguments.length ? (e = p, h) : e;
  }, h.width = function(p) {
    return arguments.length ? (u = p, h) : u;
  }, h.colors = function(p) {
    return arguments.length ? (n = p, h) : n;
  }, h.padding = function(p) {
    return arguments.length ? (s = p, h) : s;
  }, h.range = function(p) {
    return arguments.length ? (i = p, h) : i;
  }, h.trim = function(p) {
    return arguments.length ? (a = p, h) : a;
  }, h.offset = function(p) {
    return arguments.length ? (l = p, h) : l;
  }, h.colorscale = function(p) {
    return arguments.length ? (r = p, h) : r;
  }, h;
}
function Pt(t) {
  return ht(Yt, t);
}
function Rt(t) {
  return ht(I, t);
}
var ft = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function dt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var pt = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    var n, r, s = 1e3, i = 6e4, o = 36e5, a = 864e5, u = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, l = 31536e6, h = 2628e6, p = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, v = { years: l, months: h, days: a, hours: o, minutes: i, seconds: s, milliseconds: 1, weeks: 6048e5 }, $ = function(m) {
      return m instanceof w;
    }, S = function(m, f, c) {
      return new w(m, c, f.$l);
    }, N = function(m) {
      return r.p(m) + "s";
    }, b = function(m) {
      return m < 0;
    }, C = function(m) {
      return b(m) ? Math.ceil(m) : Math.floor(m);
    }, g = function(m) {
      return Math.abs(m);
    }, y = function(m, f) {
      return m ? b(m) ? { negative: !0, format: "" + g(m) + f } : { negative: !1, format: "" + m + f } : { negative: !1, format: "" };
    }, w = function() {
      function m(c, x, k) {
        var _ = this;
        if (this.$d = {}, this.$l = k, c === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), x) return S(c * v[N(x)], this);
        if (typeof c == "number") return this.$ms = c, this.parseFromMilliseconds(), this;
        if (typeof c == "object") return Object.keys(c).forEach(function(T) {
          _.$d[N(T)] = c[T];
        }), this.calMilliseconds(), this;
        if (typeof c == "string") {
          var E = c.match(p);
          if (E) {
            var F = E.slice(2).map(function(T) {
              return T != null ? Number(T) : 0;
            });
            return this.$d.years = F[0], this.$d.months = F[1], this.$d.weeks = F[2], this.$d.days = F[3], this.$d.hours = F[4], this.$d.minutes = F[5], this.$d.seconds = F[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var f = m.prototype;
      return f.calMilliseconds = function() {
        var c = this;
        this.$ms = Object.keys(this.$d).reduce(function(x, k) {
          return x + (c.$d[k] || 0) * v[k];
        }, 0);
      }, f.parseFromMilliseconds = function() {
        var c = this.$ms;
        this.$d.years = C(c / l), c %= l, this.$d.months = C(c / h), c %= h, this.$d.days = C(c / a), c %= a, this.$d.hours = C(c / o), c %= o, this.$d.minutes = C(c / i), c %= i, this.$d.seconds = C(c / s), c %= s, this.$d.milliseconds = c;
      }, f.toISOString = function() {
        var c = y(this.$d.years, "Y"), x = y(this.$d.months, "M"), k = +this.$d.days || 0;
        this.$d.weeks && (k += 7 * this.$d.weeks);
        var _ = y(k, "D"), E = y(this.$d.hours, "H"), F = y(this.$d.minutes, "M"), T = this.$d.seconds || 0;
        this.$d.milliseconds && (T += this.$d.milliseconds / 1e3, T = Math.round(1e3 * T) / 1e3);
        var D = y(T, "S"), rt = c.negative || x.negative || _.negative || E.negative || F.negative || D.negative, st = E.format || F.format || D.format ? "T" : "", H = (rt ? "-" : "") + "P" + c.format + x.format + _.format + st + E.format + F.format + D.format;
        return H === "P" || H === "-P" ? "P0D" : H;
      }, f.toJSON = function() {
        return this.toISOString();
      }, f.format = function(c) {
        var x = c || "YYYY-MM-DDTHH:mm:ss", k = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
        return x.replace(u, function(_, E) {
          return E || String(k[_]);
        });
      }, f.as = function(c) {
        return this.$ms / v[N(c)];
      }, f.get = function(c) {
        var x = this.$ms, k = N(c);
        return k === "milliseconds" ? x %= 1e3 : x = k === "weeks" ? C(x / v[k]) : this.$d[k], x || 0;
      }, f.add = function(c, x, k) {
        var _;
        return _ = x ? c * v[N(x)] : $(c) ? c.$ms : S(c, this).$ms, S(this.$ms + _ * (k ? -1 : 1), this);
      }, f.subtract = function(c, x) {
        return this.add(c, x, !0);
      }, f.locale = function(c) {
        var x = this.clone();
        return x.$l = c, x;
      }, f.clone = function() {
        return S(this.$ms, this);
      }, f.humanize = function(c) {
        return n().add(this.$ms, "ms").locale(this.$l).fromNow(!c);
      }, f.valueOf = function() {
        return this.asMilliseconds();
      }, f.milliseconds = function() {
        return this.get("milliseconds");
      }, f.asMilliseconds = function() {
        return this.as("milliseconds");
      }, f.seconds = function() {
        return this.get("seconds");
      }, f.asSeconds = function() {
        return this.as("seconds");
      }, f.minutes = function() {
        return this.get("minutes");
      }, f.asMinutes = function() {
        return this.as("minutes");
      }, f.hours = function() {
        return this.get("hours");
      }, f.asHours = function() {
        return this.as("hours");
      }, f.days = function() {
        return this.get("days");
      }, f.asDays = function() {
        return this.as("days");
      }, f.weeks = function() {
        return this.get("weeks");
      }, f.asWeeks = function() {
        return this.as("weeks");
      }, f.months = function() {
        return this.get("months");
      }, f.asMonths = function() {
        return this.as("months");
      }, f.years = function() {
        return this.get("years");
      }, f.asYears = function() {
        return this.as("years");
      }, m;
    }(), A = function(m, f, c) {
      return m.add(f.years() * c, "y").add(f.months() * c, "M").add(f.days() * c, "d").add(f.hours() * c, "h").add(f.minutes() * c, "m").add(f.seconds() * c, "s").add(f.milliseconds() * c, "ms");
    };
    return function(m, f, c) {
      n = c, r = c().$utils(), c.duration = function(_, E) {
        var F = c.locale();
        return S(_, { $l: F }, E);
      }, c.isDuration = $;
      var x = f.prototype.add, k = f.prototype.subtract;
      f.prototype.add = function(_, E) {
        return $(_) ? A(this, _, 1) : x.bind(this)(_, E);
      }, f.prototype.subtract = function(_, E) {
        return $(_) ? A(this, _, -1) : k.bind(this)(_, E);
      };
    };
  });
})(pt);
var Ot = pt.exports;
const Lt = /* @__PURE__ */ dt(Ot);
var mt = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(ft, function() {
    return function(n, r, s) {
      n = n || {};
      var i = r.prototype, o = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function a(l, h, p, v) {
        return i.fromToBase(l, h, p, v);
      }
      s.en.relativeTime = o, i.fromToBase = function(l, h, p, v, $) {
        for (var S, N, b, C = p.$locale().relativeTime || o, g = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], y = g.length, w = 0; w < y; w += 1) {
          var A = g[w];
          A.d && (S = v ? s(l).diff(p, A.d, !0) : p.diff(l, A.d, !0));
          var m = (n.rounding || Math.round)(Math.abs(S));
          if (b = S > 0, m <= A.r || !A.r) {
            m <= 1 && w > 0 && (A = g[w - 1]);
            var f = C[A.l];
            $ && (m = $("" + m)), N = typeof f == "string" ? f.replace("%d", m) : f(m, h, A.l, b);
            break;
          }
        }
        if (h) return N;
        var c = b ? C.future : C.past;
        return typeof c == "function" ? c(N) : c.replace("%s", N);
      }, i.to = function(l, h) {
        return a(l, h, this, !0);
      }, i.from = function(l, h) {
        return a(l, h, this);
      };
      var u = function(l) {
        return l.$u ? s.utc() : s();
      };
      i.toNow = function(l) {
        return this.to(u(this), l);
      }, i.fromNow = function(l) {
        return this.from(u(this), l);
      };
    };
  });
})(mt);
var Ht = mt.exports;
const zt = /* @__PURE__ */ dt(Ht);
et.extend(Lt);
et.extend(zt);
function Vt(t, e) {
  return et.duration(e - t).humanize();
}
function ot() {
  const t = Array.prototype.slice.call(arguments, 0);
  return function(e) {
    return t.reduce((n, r) => r(n), e);
  };
}
function W(t) {
  return function(e) {
    return t === void 0 ? e : e[t];
  };
}
var tt = "http://www.w3.org/1999/xhtml";
const lt = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: tt,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function gt(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), lt.hasOwnProperty(e) ? { space: lt[e], local: t } : t;
}
function qt(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === tt && e.documentElement.namespaceURI === tt ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function It(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function yt(t) {
  var e = gt(t);
  return (e.local ? It : qt)(e);
}
function Wt() {
}
function _t(t) {
  return t == null ? Wt : function() {
    return this.querySelector(t);
  };
}
function Xt(t) {
  typeof t != "function" && (t = _t(t));
  for (var e = this._groups, n = e.length, r = new Array(n), s = 0; s < n; ++s)
    for (var i = e[s], o = i.length, a = r[s] = new Array(o), u, l, h = 0; h < o; ++h)
      (u = i[h]) && (l = t.call(u, u.__data__, h, i)) && ("__data__" in u && (l.__data__ = u.__data__), a[h] = l);
  return new B(r, this._parents);
}
function wt(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function Ut() {
  return [];
}
function Zt(t) {
  return t == null ? Ut : function() {
    return this.querySelectorAll(t);
  };
}
function Gt(t) {
  return function() {
    return wt(t.apply(this, arguments));
  };
}
function Kt(t) {
  typeof t == "function" ? t = Gt(t) : t = Zt(t);
  for (var e = this._groups, n = e.length, r = [], s = [], i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u, l = 0; l < a; ++l)
      (u = o[l]) && (r.push(t.call(u, u.__data__, l, o)), s.push(u));
  return new B(r, s);
}
function Jt(t) {
  return function() {
    return this.matches(t);
  };
}
function xt(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Qt = Array.prototype.find;
function jt(t) {
  return function() {
    return Qt.call(this.children, t);
  };
}
function te() {
  return this.firstElementChild;
}
function ee(t) {
  return this.select(t == null ? te : jt(typeof t == "function" ? t : xt(t)));
}
var ne = Array.prototype.filter;
function re() {
  return Array.from(this.children);
}
function se(t) {
  return function() {
    return ne.call(this.children, t);
  };
}
function ie(t) {
  return this.selectAll(t == null ? re : se(typeof t == "function" ? t : xt(t)));
}
function oe(t) {
  typeof t != "function" && (t = Jt(t));
  for (var e = this._groups, n = e.length, r = new Array(n), s = 0; s < n; ++s)
    for (var i = e[s], o = i.length, a = r[s] = [], u, l = 0; l < o; ++l)
      (u = i[l]) && t.call(u, u.__data__, l, i) && a.push(u);
  return new B(r, this._parents);
}
function vt(t) {
  return new Array(t.length);
}
function le() {
  return new B(this._enter || this._groups.map(vt), this._parents);
}
function U(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
U.prototype = {
  constructor: U,
  appendChild: function(t) {
    return this._parent.insertBefore(t, this._next);
  },
  insertBefore: function(t, e) {
    return this._parent.insertBefore(t, e);
  },
  querySelector: function(t) {
    return this._parent.querySelector(t);
  },
  querySelectorAll: function(t) {
    return this._parent.querySelectorAll(t);
  }
};
function ae(t) {
  return function() {
    return t;
  };
}
function ce(t, e, n, r, s, i) {
  for (var o = 0, a, u = e.length, l = i.length; o < l; ++o)
    (a = e[o]) ? (a.__data__ = i[o], r[o] = a) : n[o] = new U(t, i[o]);
  for (; o < u; ++o)
    (a = e[o]) && (s[o] = a);
}
function ue(t, e, n, r, s, i, o) {
  var a, u, l = /* @__PURE__ */ new Map(), h = e.length, p = i.length, v = new Array(h), $;
  for (a = 0; a < h; ++a)
    (u = e[a]) && (v[a] = $ = o.call(u, u.__data__, a, e) + "", l.has($) ? s[a] = u : l.set($, u));
  for (a = 0; a < p; ++a)
    $ = o.call(t, i[a], a, i) + "", (u = l.get($)) ? (r[a] = u, u.__data__ = i[a], l.delete($)) : n[a] = new U(t, i[a]);
  for (a = 0; a < h; ++a)
    (u = e[a]) && l.get(v[a]) === u && (s[a] = u);
}
function he(t) {
  return t.__data__;
}
function fe(t, e) {
  if (!arguments.length) return Array.from(this, he);
  var n = e ? ue : ce, r = this._parents, s = this._groups;
  typeof t != "function" && (t = ae(t));
  for (var i = s.length, o = new Array(i), a = new Array(i), u = new Array(i), l = 0; l < i; ++l) {
    var h = r[l], p = s[l], v = p.length, $ = de(t.call(h, h && h.__data__, l, r)), S = $.length, N = a[l] = new Array(S), b = o[l] = new Array(S), C = u[l] = new Array(v);
    n(h, p, N, b, C, $, e);
    for (var g = 0, y = 0, w, A; g < S; ++g)
      if (w = N[g]) {
        for (g >= y && (y = g + 1); !(A = b[y]) && ++y < S; ) ;
        w._next = A || null;
      }
  }
  return o = new B(o, r), o._enter = a, o._exit = u, o;
}
function de(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function pe() {
  return new B(this._exit || this._groups.map(vt), this._parents);
}
function me(t, e, n) {
  var r = this.enter(), s = this, i = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (s = e(s), s && (s = s.selection())), n == null ? i.remove() : n(i), r && s ? r.merge(s).order() : s;
}
function ge(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, s = n.length, i = r.length, o = Math.min(s, i), a = new Array(s), u = 0; u < o; ++u)
    for (var l = n[u], h = r[u], p = l.length, v = a[u] = new Array(p), $, S = 0; S < p; ++S)
      ($ = l[S] || h[S]) && (v[S] = $);
  for (; u < s; ++u)
    a[u] = n[u];
  return new B(a, this._parents);
}
function ye() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], s = r.length - 1, i = r[s], o; --s >= 0; )
      (o = r[s]) && (i && o.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(o, i), i = o);
  return this;
}
function _e(t) {
  t || (t = we);
  function e(p, v) {
    return p && v ? t(p.__data__, v.__data__) : !p - !v;
  }
  for (var n = this._groups, r = n.length, s = new Array(r), i = 0; i < r; ++i) {
    for (var o = n[i], a = o.length, u = s[i] = new Array(a), l, h = 0; h < a; ++h)
      (l = o[h]) && (u[h] = l);
    u.sort(e);
  }
  return new B(s, this._parents).order();
}
function we(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function xe() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function ve() {
  return Array.from(this);
}
function Ae() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], s = 0, i = r.length; s < i; ++s) {
      var o = r[s];
      if (o) return o;
    }
  return null;
}
function $e() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function be() {
  return !this.node();
}
function ke(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var s = e[n], i = 0, o = s.length, a; i < o; ++i)
      (a = s[i]) && t.call(a, a.__data__, i, s);
  return this;
}
function Se(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function Me(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function Ce(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function Ee(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function Ne(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function Fe(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Te(t, e) {
  var n = gt(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? Me : Se : typeof e == "function" ? n.local ? Fe : Ne : n.local ? Ee : Ce)(n, e));
}
function At(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function De(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Be(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function Ye(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Pe(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? De : typeof e == "function" ? Ye : Be)(t, e, n ?? "")) : Re(this.node(), t);
}
function Re(t, e) {
  return t.style.getPropertyValue(e) || At(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Oe(t) {
  return function() {
    delete this[t];
  };
}
function Le(t, e) {
  return function() {
    this[t] = e;
  };
}
function He(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function ze(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Oe : typeof e == "function" ? He : Le)(t, e)) : this.node()[t];
}
function $t(t) {
  return t.trim().split(/^|\s+/);
}
function nt(t) {
  return t.classList || new bt(t);
}
function bt(t) {
  this._node = t, this._names = $t(t.getAttribute("class") || "");
}
bt.prototype = {
  add: function(t) {
    var e = this._names.indexOf(t);
    e < 0 && (this._names.push(t), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(t) {
    var e = this._names.indexOf(t);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(t) {
    return this._names.indexOf(t) >= 0;
  }
};
function kt(t, e) {
  for (var n = nt(t), r = -1, s = e.length; ++r < s; ) n.add(e[r]);
}
function St(t, e) {
  for (var n = nt(t), r = -1, s = e.length; ++r < s; ) n.remove(e[r]);
}
function Ve(t) {
  return function() {
    kt(this, t);
  };
}
function qe(t) {
  return function() {
    St(this, t);
  };
}
function Ie(t, e) {
  return function() {
    (e.apply(this, arguments) ? kt : St)(this, t);
  };
}
function We(t, e) {
  var n = $t(t + "");
  if (arguments.length < 2) {
    for (var r = nt(this.node()), s = -1, i = n.length; ++s < i; ) if (!r.contains(n[s])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ie : e ? Ve : qe)(n, e));
}
function Xe() {
  this.textContent = "";
}
function Ue(t) {
  return function() {
    this.textContent = t;
  };
}
function Ze(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function Ge(t) {
  return arguments.length ? this.each(t == null ? Xe : (typeof t == "function" ? Ze : Ue)(t)) : this.node().textContent;
}
function Ke() {
  this.innerHTML = "";
}
function Je(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Qe(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function je(t) {
  return arguments.length ? this.each(t == null ? Ke : (typeof t == "function" ? Qe : Je)(t)) : this.node().innerHTML;
}
function tn() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function en() {
  return this.each(tn);
}
function nn() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function rn() {
  return this.each(nn);
}
function sn(t) {
  var e = typeof t == "function" ? t : yt(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function on() {
  return null;
}
function ln(t, e) {
  var n = typeof t == "function" ? t : yt(t), r = e == null ? on : typeof e == "function" ? e : _t(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function an() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function cn() {
  return this.each(an);
}
function un() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function hn() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function fn(t) {
  return this.select(t ? hn : un);
}
function dn(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function pn(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function mn(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function gn(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, s = e.length, i; n < s; ++n)
        i = e[n], (!t.type || i.type === t.type) && i.name === t.name ? this.removeEventListener(i.type, i.listener, i.options) : e[++r] = i;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function yn(t, e, n) {
  return function() {
    var r = this.__on, s, i = pn(e);
    if (r) {
      for (var o = 0, a = r.length; o < a; ++o)
        if ((s = r[o]).type === t.type && s.name === t.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = i, s.options = n), s.value = e;
          return;
        }
    }
    this.addEventListener(t.type, i, n), s = { type: t.type, name: t.name, value: e, listener: i, options: n }, r ? r.push(s) : this.__on = [s];
  };
}
function _n(t, e, n) {
  var r = mn(t + ""), s, i = r.length, o;
  if (arguments.length < 2) {
    var a = this.node().__on;
    if (a) {
      for (var u = 0, l = a.length, h; u < l; ++u)
        for (s = 0, h = a[u]; s < i; ++s)
          if ((o = r[s]).type === h.type && o.name === h.name)
            return h.value;
    }
    return;
  }
  for (a = e ? yn : gn, s = 0; s < i; ++s) this.each(a(r[s], e, n));
  return this;
}
function Mt(t, e, n) {
  var r = At(t), s = r.CustomEvent;
  typeof s == "function" ? s = new s(e, n) : (s = r.document.createEvent("Event"), n ? (s.initEvent(e, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(e, !1, !1)), t.dispatchEvent(s);
}
function wn(t, e) {
  return function() {
    return Mt(this, t, e);
  };
}
function xn(t, e) {
  return function() {
    return Mt(this, t, e.apply(this, arguments));
  };
}
function vn(t, e) {
  return this.each((typeof e == "function" ? xn : wn)(t, e));
}
function* An() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], s = 0, i = r.length, o; s < i; ++s)
      (o = r[s]) && (yield o);
}
var $n = [null];
function B(t, e) {
  this._groups = t, this._parents = e;
}
function bn() {
  return this;
}
B.prototype = {
  constructor: B,
  select: Xt,
  selectAll: Kt,
  selectChild: ee,
  selectChildren: ie,
  filter: oe,
  data: fe,
  enter: le,
  exit: pe,
  join: me,
  merge: ge,
  selection: bn,
  order: ye,
  sort: _e,
  call: xe,
  nodes: ve,
  node: Ae,
  size: $e,
  empty: be,
  each: ke,
  attr: Te,
  style: Pe,
  property: ze,
  classed: We,
  text: Ge,
  html: je,
  raise: en,
  lower: rn,
  append: sn,
  insert: ln,
  remove: cn,
  clone: fn,
  datum: dn,
  on: _n,
  dispatch: vn,
  [Symbol.iterator]: An
};
function at(t) {
  return typeof t == "string" ? new B([document.querySelectorAll(t)], [document.documentElement]) : new B([wt(t)], $n);
}
var X = 0, V = 0;
const kn = [
  "#4285f4",
  "#db4437",
  "#f4b400",
  "#0f9d58",
  "#ab47bc",
  "#5e97f5",
  "#e06055",
  "#f5bf26",
  "#33ab71",
  "#b762c6",
  "#00acc1",
  "#ff855f",
  "#9e9d24",
  "#26b8ca",
  "#ff7043"
];
function Sn(t) {
  const e = window.getComputedStyle(t, null).getPropertyValue("font-size");
  return parseFloat(e);
}
function ct(t) {
  const e = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), r = String(t.getDate()).padStart(2, "0");
  return `${e}${n}${r}`;
}
function q(t, e) {
  return "translate(" + t + "," + e + ")";
}
function Mn() {
  document.querySelectorAll('g.task[class*=" --"]').forEach(function(e) {
    e.style.display = "none";
  });
}
function Z(t, e, n) {
  const s = d.select(t).attr("class");
  let i = !1;
  e.selectAll("g.row").each(function(g) {
    const w = d.select(this).attr("class");
    if (w == s)
      i = !0;
    else if (i) {
      let m = this.getAttribute("transform"), f = parseFloat(m.split("(")[1].split(",")[0].trim()), c = parseFloat(m.split(",")[1].split(")")[0].trim());
      this.setAttribute("transform", `translate(${f},${c + n})`);
      var A = w.split(" ")[1];
      document.querySelectorAll(`g.task.${A} rect`).forEach(function(_) {
        _.setAttribute("y", parseFloat(_.getAttribute("y")) + n);
      }), document.querySelectorAll(`g.task.${A} text`).forEach(function(_) {
        _.setAttribute("y", parseFloat(_.getAttribute("y")) + n);
      });
    }
  }), d.selectAll(".tick line").each(function() {
    const g = d.select(this), y = parseFloat(g.attr("y1"));
    isNaN(y) || g.attr("y1", y + n);
  });
  const o = document.querySelector('path[stroke-width="1.75"]');
  let u = o.getAttribute("d").match(/M([\d.-]+),([\d.-]+)V([\d.-]+)/), l = parseFloat(u[1]), h = parseFloat(u[2]), v = parseFloat(u[3]) + n;
  o.setAttribute("d", `M${l},${h}V${v}`);
  const $ = d.select("g.x.axis.bottom-axis");
  let S = $.attr("transform"), N = parseFloat(S.split("(")[1].split(",")[0].trim()), C = parseFloat(S.split(",")[1].split(")")[0].trim()) + n;
  $.attr("transform", `translate(${N}, ${C})`);
}
function Ct(t, e) {
  e.forEach(function(r) {
    document.querySelectorAll(`g.row.${r}`).forEach(function(i) {
      i.style.display = "block";
    });
  });
  const n = d.select(t).attr("class").split(" ")[1];
  d.selectAll(`g.task.${n}`).each(function(r) {
    var s = r[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    if (s == n.replace(/--/g, ""))
      d.select(this).style("display", "none");
    else if (s != n.replace(/--/g, "")) {
      d.select(this).style("display", "block");
      var i = (e.indexOf(s) + 1) * 38;
      let o = d.select(this), a = o.attr("transform"), u = parseFloat(a.split("(")[1].split(",")[0].trim()), l = parseFloat(a.split(",")[1].split(")")[0].trim()), h = l + i;
      o.attr("transform", `translate(${u}, ${l})`).transition().duration(1e3).attr("transform", `translate(${u}, ${h})`).on("start", () => {
        at(`g.task.${s}`).style("display", "none");
      }).on("end", () => {
        o.style("display", "none"), o.attr("transform", `translate(${u}, ${l})`), at(`g.task.${s}`).style("display", "block");
      });
    }
  });
}
function Et(t, e) {
  return new Promise((n) => {
    const r = d.select(t).attr("class").split(" ")[1];
    d.selectAll(`g.task:not(.${r})`).each(function(s) {
      var i = s[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
      if (e.includes(i)) {
        d.select(this).style("display", "block");
        var o = (e.indexOf(i) + 1) * 38;
        let a = d.select(this), u = a.attr("transform"), l = parseFloat(u.split("(")[1].split(",")[0].trim()), h = parseFloat(u.split(",")[1].split(")")[0].trim()), p = h - o;
        a.transition().duration(1e3).attr("transform", `translate(${l}, ${p})`).on("end", () => {
          d.selectAll(`g.${r}`).style("display", "block"), a.style("display", "none"), a.attr("transform", `translate(${l}, ${h})`), e.forEach(function(v) {
            document.querySelectorAll(`.${v}`).forEach(function(S) {
              S.style.display = "none";
            });
          }), n();
        });
      }
    });
  });
}
function G(t, e) {
  const r = d.select(t).attr("class"), s = [];
  let i = !1, o = !1;
  return e.selectAll("g.row").each(function(a) {
    const l = d.select(this).attr("class");
    l == r ? i = !0 : i && l.split(" ")[2] == "timelineheader" ? o = !0 : i && !o && s.push(l.split(" ")[1]);
  }), s;
}
function Cn() {
  const t = document.getElementById("collapseAllButton");
  t.disabled = !0;
  let e = [];
  d.selectAll("g.row.timelineheader text").each(function() {
    if (d.select(this).text() === "-") {
      const r = this.parentNode, s = G(r, d.select(r.parentNode)), i = s.length * 38;
      let o = Et(r, s).then(() => {
        Z(r, d.select(r.parentNode), -i), d.select(this).text("+").style("font-size", "20px");
      });
      e.push(o);
    }
  }), Promise.all(e).then(() => {
    t.disabled = !1;
  });
}
window.collapseAll = Cn;
function En() {
  const t = document.getElementById("expandAllButton");
  t.disabled = !0;
  let e = [];
  d.selectAll("g.row.timelineheader text").each(function() {
    if (d.select(this).text() === "+") {
      const r = this.parentNode, s = G(r, d.select(r.parentNode)), i = s.length * 38;
      let o = new Promise((a) => {
        Ct(r, s), Z(r, d.select(r.parentNode), i), a();
      }).then(() => {
        d.select(this).text("-").style("font-size", "30px");
      });
      e.push(o);
    }
  }), Promise.all(e).then(() => {
    t.disabled = !1;
  });
}
window.expandAll = En;
function Dn(t) {
  let e = kn, n = 5, r = 2, s = !1, i = !1, o, a, u = 0, l = W(0), h = W(1), p = W(2), v = W(3);
  console.log(t);
  function $(g, y) {
    const w = g.select("text"), A = g.select("rect"), m = A.attr("width") - 2 * n, f = h(y);
    w.text(f);
    let c = w.node().getComputedTextLength();
    if (c > m) {
      const x = m < 0 ? 0 : m / c, k = Math.floor(f.length * x);
      w.text(k > 2 ? f.slice(0, k - 2) + "…" : "");
    }
  }
  function S(g, y, w) {
    const A = g.select("text").node(), m = A.getBBox(), f = w.scale().domain().indexOf(l(y)), c = w.colorscale()(f), x = g.selectAll("rect.bckg").data([y]).join("rect").attr("class", "bckg").attr("fill", c).attr("x", m.x - n + r).attr("y", m.y - 2).attr("width", m.width + n - r).attr("height", m.height);
    g.node().insertBefore(x.node(), A);
  }
  function N(g, y) {
    g.each(function(w, A) {
      const m = d.select(this.parentNode);
      v(w) - p(w) ? $(m, w) : S(m, w, y);
    });
  }
  function b(g) {
    const y = g.datum(), w = new Set(d.map(y, l)), A = new ut(C), m = d.scaleOrdinal(e);
    o = o || [d.min(y, p), d.max(y, v)], i && (o = d.extent(o.concat(/* @__PURE__ */ new Date()))), g.each(function(f) {
      const c = a || this.getBoundingClientRect().width - 15, x = w.size * (Sn(this) + 4 * n), k = d.scaleBand().domain(w).range([0, x]), _ = d.scaleTime().domain(o), E = (s ? Rt : Pt)(k).width(c), F = d.select(this).selectAll("svg").data([1]).join("svg");
      F.attr("class", "timeline").attr("width", c).attr("height", x + 40);
      const T = F.append("g").attr("transform", "translate(0,20)"), D = T.append("g").attr("class", "y axis").call(E);
      let H = document.querySelector('path[stroke-width="1.75"]').getAttribute("d").match(/M([\d.-]+),([\d.-]+)V([\d.-]+)/), K = parseFloat(H[1]);
      D.selectAll("text").on("mouseover", function() {
        d.select(this).style("text-decoration", "underline");
      }).on("mouseout", function() {
        d.select(this).style("text-decoration", "none");
      }).attr("text-anchor", function(M) {
        return M.startsWith(" •") ? "middle" : "end";
      }).attr("x", function(M) {
        return M.startsWith(" •") ? K / 2 : K - 0.5;
      }).style("cursor", "pointer").style("font-weight", function(M) {
        return M.startsWith(" •") ? "bold" : "normal";
      }).style("background", "none").on("click", function(M, O) {
        const P = O.replace(/ • /g, "").replace("Topic, ", "").replace(" ", "%20"), L = `https://www.primarysourcecoop.org/publications/${t}/search#q%3D%2Bsubject%3A%22${P}%22`;
        window.open(L, "_blank");
      }), D.selectAll("g.row").each(function(M) {
        const O = d.select(this).datum();
        d.select(this).classed(d.select(this).datum().replace(/•/g, "").replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, ""), !0), O.startsWith(" •") && d.select(this).classed("timelineheader", !0).append("text").attr("x", K - 10).attr("y", 25).text("-").style("text-anchor", "end").style("cursor", "pointer").style("font-size", "30px").attr("fill", "black").style("-ms-user-select", "none").style("-webkit-user-select", "none").style("user-select", "none");
      }), D.selectAll("g.row.timelineheader text").on("click", function(M, O) {
        const Q = d.select(this).text();
        if (Q === "+") {
          X -= 1, V += 1, console.log("Collapsed: ", X), console.log("Expanded: ", V);
          let P = G(this.parentNode, D), L = P.length * 38;
          Ct(this.parentNode, P), Z(this.parentNode, D, L), d.select(this).text() === "+" ? d.select(this).text("-").style("font-size", "30px") : d.select(this).text("+");
        } else if (Q === "-") {
          X += 1, V -= 1, console.log("Collapsed: ", X), console.log("Expanded: ", V);
          let P = G(this.parentNode, D), L = P.length * 38;
          Et(this.parentNode, P).then(() => {
            Z(this.parentNode, D, -L);
          }), d.select(this).text() === "-" ? d.select(this).text("+").style("font-size", "20px") : d.select(this).text("-");
        } else {
          const L = O.replace(/ • /g, "").replace("Topic, ", "").replace(" ", "%20"), j = `https://www.primarysourcecoop.org/publications/${t}/search#q%3D%2Bsubject%3A%22${L}%22`;
          window.open(j, "_blank");
        }
      }), V = d.selectAll("text").filter(function() {
        return this.textContent.startsWith(" •");
      }).size();
      let Y = E.range();
      _.range([Y[0] + n, Y[1] - n]).clamp(!0);
      const J = d.axisBottom(_), z = T.append("g").attr("class", "x axis").attr("transform", q(0, 0)).call(J);
      z.selectAll(".tick text").attr("dy", "-1.5em"), z.selectAll(".tick line").attr("y2", "-5").attr("y1", x);
      const Nt = d.axisBottom(_);
      F.append("g").attr("class", "x axis bottom-axis").attr("transform", q(0, x + 20)).call(Nt).selectAll(".tick line").attr("y2", "5"), D.on("offset", () => {
        Y = E.range(), _.range([Y[0] + n, Y[1] - n]).clamp(!0), J.ticks(Math.min((Y[1] - Y[0]) / 70, 10)), z.call(J), R.attr("transform", (M) => q(_(p(M)), k(l(M)))).selectAll("rect").attr("width", (M) => _(v(M)) - _(p(M)) || r).call((M) => N(M, E)), D.call(E.draw_ticks, _.ticks().map(_));
      }), z.select(".domain").remove(), z.selectAll(".tick line").attr("stroke", "#AAA");
      const Ft = _.ticks().map(_);
      D.call(E.draw_ticks, Ft);
      let R = T.selectAll("g.task").data(f);
      R.exit().remove();
      const it = R.enter().append("g").classed("task", !0);
      it.each(function(M) {
        const O = l(M).replace(/•/g, "").replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
        d.select(this).classed(O, !0);
      }).append("rect").style("opacity", 1).attr("y", n).style("cursor", "pointer").attr("height", k.bandwidth() - 2 * n).on("click", A.show).style("fill", ot(h, m)), R = R.merge(it), R.attr("transform", (M) => q(Y[0], k(l(M)))).selectAll("rect").attr("width", 0), R.transition().duration(u).attr("transform", (M) => q(_(p(M)), k(l(M)))).selectAll("rect").attr("width", (M) => _(v(M)) - _(p(M)) || r), i && T.append("path").attr("stroke", "red").attr("d", "M" + _(/* @__PURE__ */ new Date()) + ",0.5V" + x);
    }), Mn();
  }
  return b.dates = function(g) {
    return arguments.length ? (o = g, b) : o;
  }, b.width = function(g) {
    return arguments.length ? (a = g, b) : a;
  }, b.today = function(g) {
    return arguments.length ? (i = g, b) : i;
  }, b.colors = function(g) {
    return arguments.length ? (e = g, b) : e;
  }, b.padding = function(g) {
    return arguments.length ? (n = g, b) : n;
  }, b.milestone_width = function(g) {
    return arguments.length ? (r = g, b) : r;
  }, b.reversed = function(g) {
    return arguments.length ? (s = g, b) : s;
  }, b.duration = function(g) {
    return arguments.length ? (u = g, b) : u;
  }, b;
  function C(g, y) {
    const w = ot(d.isoParse, d.timeFormat("%Y")), A = `<b>${h(y)}</b><hr style="margin: 2px 0 2px 0">${w(p(y))}`, m = v(y) - p(y) ? ` - ${w(v(y))}, ${Vt(p(y), v(y))}` : "";
    let c = String(y[1]).replace(/ /g, "%20").replace("Topic,%20", "");
    const x = ct(y[2]), k = ct(y[3]), E = `<br><a href="${`https://www.primarysourcecoop.org/publications/${t}/search#q%3D%2Bsubject%3A%22${c}%22%20%2Bdate_when%3A%5B${x}%20TO%20${k}%5D%7Crows=20%7Cstart=0%7Chl=true%7Chl.fl=text_merge%7Csort=date_when%20asc%7Cff=person_keyword;subject%7Cfl=id%20index%20title%20filename%20resource_group_name%20date_when%20date_to%20author%20recipient%20person_keyword%20subject%20doc_beginning`}" target="_blank">${y[4]} Docs</a>`;
    return `${A}${m}${E}`;
  }
}
export {
  Vt as durationFormat,
  Dn as timeline,
  Pt as timelineAxisLeft,
  Rt as timelineAxisRight,
  ut as tooltip
};
