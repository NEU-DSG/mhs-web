function se(t, e) {
  return t == null || e == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function ri(t, e) {
  return t == null || e == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function tn(t) {
  let e, n, r;
  t.length !== 2 ? (e = se, n = (u, c) => se(t(u), c), r = (u, c) => t(u) - c) : (e = t === se || t === ri ? t : ii, n = t, r = t);
  function i(u, c, s = 0, l = u.length) {
    if (s < l) {
      if (e(c, c) !== 0) return l;
      do {
        const f = s + l >>> 1;
        n(u[f], c) < 0 ? s = f + 1 : l = f;
      } while (s < l);
    }
    return s;
  }
  function o(u, c, s = 0, l = u.length) {
    if (s < l) {
      if (e(c, c) !== 0) return l;
      do {
        const f = s + l >>> 1;
        n(u[f], c) <= 0 ? s = f + 1 : l = f;
      } while (s < l);
    }
    return s;
  }
  function a(u, c, s = 0, l = u.length) {
    const f = i(u, c, s, l - 1);
    return f > s && r(u[f - 1], c) > -r(u[f], c) ? f - 1 : f;
  }
  return { left: i, center: a, right: o };
}
function ii() {
  return 0;
}
function oi(t) {
  return t === null ? NaN : +t;
}
const ai = tn(se), si = ai.right;
tn(oi).center;
function ui(t, e) {
  let n, r;
  if (e === void 0)
    for (const i of t)
      i != null && (n === void 0 ? i >= i && (n = r = i) : (n > i && (n = i), r < i && (r = i)));
  else {
    let i = -1;
    for (let o of t)
      (o = e(o, ++i, t)) != null && (n === void 0 ? o >= o && (n = r = o) : (n > o && (n = o), r < o && (r = o)));
  }
  return [n, r];
}
class $n extends Map {
  constructor(e, n = fi) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: n } }), e != null) for (const [r, i] of e) this.set(r, i);
  }
  get(e) {
    return super.get(kn(this, e));
  }
  has(e) {
    return super.has(kn(this, e));
  }
  set(e, n) {
    return super.set(ci(this, e), n);
  }
  delete(e) {
    return super.delete(li(this, e));
  }
}
function kn({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : n;
}
function ci({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) ? t.get(r) : (t.set(r, n), n);
}
function li({ _intern: t, _key: e }, n) {
  const r = e(n);
  return t.has(r) && (n = t.get(r), t.delete(r)), n;
}
function fi(t) {
  return t !== null && typeof t == "object" ? t.valueOf() : t;
}
const hi = Math.sqrt(50), di = Math.sqrt(10), gi = Math.sqrt(2);
function he(t, e, n) {
  const r = (e - t) / Math.max(0, n), i = Math.floor(Math.log10(r)), o = r / Math.pow(10, i), a = o >= hi ? 10 : o >= di ? 5 : o >= gi ? 2 : 1;
  let u, c, s;
  return i < 0 ? (s = Math.pow(10, -i) / a, u = Math.round(t * s), c = Math.round(e * s), u / s < t && ++u, c / s > e && --c, s = -s) : (s = Math.pow(10, i) * a, u = Math.round(t / s), c = Math.round(e / s), u * s < t && ++u, c * s > e && --c), c < u && 0.5 <= n && n < 2 ? he(t, e, n * 2) : [u, c, s];
}
function mi(t, e, n) {
  if (e = +e, t = +t, n = +n, !(n > 0)) return [];
  if (t === e) return [t];
  const r = e < t, [i, o, a] = r ? he(e, t, n) : he(t, e, n);
  if (!(o >= i)) return [];
  const u = o - i + 1, c = new Array(u);
  if (r)
    if (a < 0) for (let s = 0; s < u; ++s) c[s] = (o - s) / -a;
    else for (let s = 0; s < u; ++s) c[s] = (o - s) * a;
  else if (a < 0) for (let s = 0; s < u; ++s) c[s] = (i + s) / -a;
  else for (let s = 0; s < u; ++s) c[s] = (i + s) * a;
  return c;
}
function Pe(t, e, n) {
  return e = +e, t = +t, n = +n, he(t, e, n)[2];
}
function We(t, e, n) {
  e = +e, t = +t, n = +n;
  const r = e < t, i = r ? Pe(e, t, n) : Pe(t, e, n);
  return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function cr(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n < r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n < i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function pi(t, e) {
  let n;
  if (e === void 0)
    for (const r of t)
      r != null && (n > r || n === void 0 && r >= r) && (n = r);
  else {
    let r = -1;
    for (let i of t)
      (i = e(i, ++r, t)) != null && (n > i || n === void 0 && i >= i) && (n = i);
  }
  return n;
}
function yi(t, e, n) {
  t = +t, e = +e, n = (i = arguments.length) < 2 ? (e = t, t = 0, 1) : i < 3 ? 1 : +n;
  for (var r = -1, i = Math.max(0, Math.ceil((e - t) / n)) | 0, o = new Array(i); ++r < i; )
    o[r] = t + r * n;
  return o;
}
function wi(t, e) {
  if (typeof t[Symbol.iterator] != "function") throw new TypeError("values is not iterable");
  if (typeof e != "function") throw new TypeError("mapper is not a function");
  return Array.from(t, (n, r) => e(n, r, t));
}
function xi(t) {
  return t;
}
var Fe = 1, ue = 2, ze = 3, zt = 4, Tn = 1e-6;
function vi(t) {
  return "translate(" + t + ",0)";
}
function _i(t) {
  return "translate(0," + t + ")";
}
function Mi(t) {
  return (e) => +t(e);
}
function bi(t, e) {
  return e = Math.max(0, t.bandwidth() - e * 2) / 2, t.round() && (e = Math.round(e)), (n) => +t(n) + e;
}
function $i() {
  return !this.__axis;
}
function en(t, e) {
  var n = [], r = null, i = null, o = 6, a = 6, u = 3, c = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, s = t === Fe || t === zt ? -1 : 1, l = t === zt || t === ue ? "x" : "y", f = t === Fe || t === ze ? vi : _i;
  function h(d) {
    var k = r ?? (e.ticks ? e.ticks.apply(e, n) : e.domain()), E = i ?? (e.tickFormat ? e.tickFormat.apply(e, n) : xi), Y = Math.max(o, 0) + u, L = e.range(), A = +L[0] + c, S = +L[L.length - 1] + c, p = (e.bandwidth ? bi : Mi)(e.copy(), c), b = d.selection ? d.selection() : d, g = b.selectAll(".domain").data([null]), y = b.selectAll(".tick").data(k, e).order(), w = y.exit(), N = y.enter().append("g").attr("class", "tick"), C = y.select("line"), m = y.select("text");
    g = g.merge(g.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), y = y.merge(N), C = C.merge(N.append("line").attr("stroke", "currentColor").attr(l + "2", s * o)), m = m.merge(N.append("text").attr("fill", "currentColor").attr(l, s * Y).attr("dy", t === Fe ? "0em" : t === ze ? "0.71em" : "0.32em")), d !== b && (g = g.transition(d), y = y.transition(d), C = C.transition(d), m = m.transition(d), w = w.transition(d).attr("opacity", Tn).attr("transform", function(H) {
      return isFinite(H = p(H)) ? f(H + c) : this.getAttribute("transform");
    }), N.attr("opacity", Tn).attr("transform", function(H) {
      var P = this.parentNode.__axis;
      return f((P && isFinite(P = P(H)) ? P : p(H)) + c);
    })), w.remove(), g.attr("d", t === zt || t === ue ? a ? "M" + s * a + "," + A + "H" + c + "V" + S + "H" + s * a : "M" + c + "," + A + "V" + S : a ? "M" + A + "," + s * a + "V" + c + "H" + S + "V" + s * a : "M" + A + "," + c + "H" + S), y.attr("opacity", 1).attr("transform", function(H) {
      return f(p(H) + c);
    }), C.attr(l + "2", s * o), m.attr(l, s * Y).text(E), b.filter($i).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", t === ue ? "start" : t === zt ? "end" : "middle"), b.each(function() {
      this.__axis = p;
    });
  }
  return h.scale = function(d) {
    return arguments.length ? (e = d, h) : e;
  }, h.ticks = function() {
    return n = Array.from(arguments), h;
  }, h.tickArguments = function(d) {
    return arguments.length ? (n = d == null ? [] : Array.from(d), h) : n.slice();
  }, h.tickValues = function(d) {
    return arguments.length ? (r = d == null ? null : Array.from(d), h) : r && r.slice();
  }, h.tickFormat = function(d) {
    return arguments.length ? (i = d, h) : i;
  }, h.tickSize = function(d) {
    return arguments.length ? (o = a = +d, h) : o;
  }, h.tickSizeInner = function(d) {
    return arguments.length ? (o = +d, h) : o;
  }, h.tickSizeOuter = function(d) {
    return arguments.length ? (a = +d, h) : a;
  }, h.tickPadding = function(d) {
    return arguments.length ? (u = +d, h) : u;
  }, h.offset = function(d) {
    return arguments.length ? (c = +d, h) : c;
  }, h;
}
function al(t) {
  return en(ue, t);
}
function Sn(t) {
  return en(ze, t);
}
function sl(t) {
  return en(zt, t);
}
function nn(t, e, n) {
  t.prototype = e.prototype = n, n.constructor = t;
}
function lr(t, e) {
  var n = Object.create(t.prototype);
  for (var r in e) n[r] = e[r];
  return n;
}
function Qt() {
}
var Xt = 0.7, de = 1 / Xt, At = "\\s*([+-]?\\d+)\\s*", Zt = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", ct = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", ki = /^#([0-9a-f]{3,8})$/, Ti = new RegExp(`^rgb\\(${At},${At},${At}\\)$`), Si = new RegExp(`^rgb\\(${ct},${ct},${ct}\\)$`), Ci = new RegExp(`^rgba\\(${At},${At},${At},${Zt}\\)$`), Ai = new RegExp(`^rgba\\(${ct},${ct},${ct},${Zt}\\)$`), Di = new RegExp(`^hsl\\(${Zt},${ct},${ct}\\)$`), Ni = new RegExp(`^hsla\\(${Zt},${ct},${ct},${Zt}\\)$`), Cn = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
nn(Qt, _t, {
  copy(t) {
    return Object.assign(new this.constructor(), this, t);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: An,
  // Deprecated! Use color.formatHex.
  formatHex: An,
  formatHex8: Fi,
  formatHsl: Ui,
  formatRgb: Dn,
  toString: Dn
});
function An() {
  return this.rgb().formatHex();
}
function Fi() {
  return this.rgb().formatHex8();
}
function Ui() {
  return fr(this).formatHsl();
}
function Dn() {
  return this.rgb().formatRgb();
}
function _t(t) {
  var e, n;
  return t = (t + "").trim().toLowerCase(), (e = ki.exec(t)) ? (n = e[1].length, e = parseInt(e[1], 16), n === 6 ? Nn(e) : n === 3 ? new tt(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : n === 8 ? te(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : n === 4 ? te(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = Ti.exec(t)) ? new tt(e[1], e[2], e[3], 1) : (e = Si.exec(t)) ? new tt(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = Ci.exec(t)) ? te(e[1], e[2], e[3], e[4]) : (e = Ai.exec(t)) ? te(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = Di.exec(t)) ? Yn(e[1], e[2] / 100, e[3] / 100, 1) : (e = Ni.exec(t)) ? Yn(e[1], e[2] / 100, e[3] / 100, e[4]) : Cn.hasOwnProperty(t) ? Nn(Cn[t]) : t === "transparent" ? new tt(NaN, NaN, NaN, 0) : null;
}
function Nn(t) {
  return new tt(t >> 16 & 255, t >> 8 & 255, t & 255, 1);
}
function te(t, e, n, r) {
  return r <= 0 && (t = e = n = NaN), new tt(t, e, n, r);
}
function Yi(t) {
  return t instanceof Qt || (t = _t(t)), t ? (t = t.rgb(), new tt(t.r, t.g, t.b, t.opacity)) : new tt();
}
function qe(t, e, n, r) {
  return arguments.length === 1 ? Yi(t) : new tt(t, e, n, r ?? 1);
}
function tt(t, e, n, r) {
  this.r = +t, this.g = +e, this.b = +n, this.opacity = +r;
}
nn(tt, qe, lr(Qt, {
  brighter(t) {
    return t = t == null ? de : Math.pow(de, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Xt : Math.pow(Xt, t), new tt(this.r * t, this.g * t, this.b * t, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new tt(vt(this.r), vt(this.g), vt(this.b), ge(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Fn,
  // Deprecated! Use color.formatHex.
  formatHex: Fn,
  formatHex8: Ei,
  formatRgb: Un,
  toString: Un
}));
function Fn() {
  return `#${xt(this.r)}${xt(this.g)}${xt(this.b)}`;
}
function Ei() {
  return `#${xt(this.r)}${xt(this.g)}${xt(this.b)}${xt((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Un() {
  const t = ge(this.opacity);
  return `${t === 1 ? "rgb(" : "rgba("}${vt(this.r)}, ${vt(this.g)}, ${vt(this.b)}${t === 1 ? ")" : `, ${t})`}`;
}
function ge(t) {
  return isNaN(t) ? 1 : Math.max(0, Math.min(1, t));
}
function vt(t) {
  return Math.max(0, Math.min(255, Math.round(t) || 0));
}
function xt(t) {
  return t = vt(t), (t < 16 ? "0" : "") + t.toString(16);
}
function Yn(t, e, n, r) {
  return r <= 0 ? t = e = n = NaN : n <= 0 || n >= 1 ? t = e = NaN : e <= 0 && (t = NaN), new ot(t, e, n, r);
}
function fr(t) {
  if (t instanceof ot) return new ot(t.h, t.s, t.l, t.opacity);
  if (t instanceof Qt || (t = _t(t)), !t) return new ot();
  if (t instanceof ot) return t;
  t = t.rgb();
  var e = t.r / 255, n = t.g / 255, r = t.b / 255, i = Math.min(e, n, r), o = Math.max(e, n, r), a = NaN, u = o - i, c = (o + i) / 2;
  return u ? (e === o ? a = (n - r) / u + (n < r) * 6 : n === o ? a = (r - e) / u + 2 : a = (e - n) / u + 4, u /= c < 0.5 ? o + i : 2 - o - i, a *= 60) : u = c > 0 && c < 1 ? 0 : a, new ot(a, u, c, t.opacity);
}
function Hi(t, e, n, r) {
  return arguments.length === 1 ? fr(t) : new ot(t, e, n, r ?? 1);
}
function ot(t, e, n, r) {
  this.h = +t, this.s = +e, this.l = +n, this.opacity = +r;
}
nn(ot, Hi, lr(Qt, {
  brighter(t) {
    return t = t == null ? de : Math.pow(de, t), new ot(this.h, this.s, this.l * t, this.opacity);
  },
  darker(t) {
    return t = t == null ? Xt : Math.pow(Xt, t), new ot(this.h, this.s, this.l * t, this.opacity);
  },
  rgb() {
    var t = this.h % 360 + (this.h < 0) * 360, e = isNaN(t) || isNaN(this.s) ? 0 : this.s, n = this.l, r = n + (n < 0.5 ? n : 1 - n) * e, i = 2 * n - r;
    return new tt(
      Ue(t >= 240 ? t - 240 : t + 120, i, r),
      Ue(t, i, r),
      Ue(t < 120 ? t + 240 : t - 120, i, r),
      this.opacity
    );
  },
  clamp() {
    return new ot(En(this.h), ee(this.s), ee(this.l), ge(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const t = ge(this.opacity);
    return `${t === 1 ? "hsl(" : "hsla("}${En(this.h)}, ${ee(this.s) * 100}%, ${ee(this.l) * 100}%${t === 1 ? ")" : `, ${t})`}`;
  }
}));
function En(t) {
  return t = (t || 0) % 360, t < 0 ? t + 360 : t;
}
function ee(t) {
  return Math.max(0, Math.min(1, t || 0));
}
function Ue(t, e, n) {
  return (t < 60 ? e + (n - e) * t / 60 : t < 180 ? n : t < 240 ? e + (n - e) * (240 - t) / 60 : e) * 255;
}
var Oi = { value: () => {
} };
function rn() {
  for (var t = 0, e = arguments.length, n = {}, r; t < e; ++t) {
    if (!(r = arguments[t] + "") || r in n || /[\s.]/.test(r)) throw new Error("illegal type: " + r);
    n[r] = [];
  }
  return new ce(n);
}
function ce(t) {
  this._ = t;
}
function Ii(t, e) {
  return t.trim().split(/^|\s+/).map(function(n) {
    var r = "", i = n.indexOf(".");
    if (i >= 0 && (r = n.slice(i + 1), n = n.slice(0, i)), n && !e.hasOwnProperty(n)) throw new Error("unknown type: " + n);
    return { type: n, name: r };
  });
}
ce.prototype = rn.prototype = {
  constructor: ce,
  on: function(t, e) {
    var n = this._, r = Ii(t + "", n), i, o = -1, a = r.length;
    if (arguments.length < 2) {
      for (; ++o < a; ) if ((i = (t = r[o]).type) && (i = Ri(n[i], t.name))) return i;
      return;
    }
    if (e != null && typeof e != "function") throw new Error("invalid callback: " + e);
    for (; ++o < a; )
      if (i = (t = r[o]).type) n[i] = Hn(n[i], t.name, e);
      else if (e == null) for (i in n) n[i] = Hn(n[i], t.name, null);
    return this;
  },
  copy: function() {
    var t = {}, e = this._;
    for (var n in e) t[n] = e[n].slice();
    return new ce(t);
  },
  call: function(t, e) {
    if ((i = arguments.length - 2) > 0) for (var n = new Array(i), r = 0, i, o; r < i; ++r) n[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (o = this._[t], r = 0, i = o.length; r < i; ++r) o[r].value.apply(e, n);
  },
  apply: function(t, e, n) {
    if (!this._.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    for (var r = this._[t], i = 0, o = r.length; i < o; ++i) r[i].value.apply(e, n);
  }
};
function Ri(t, e) {
  for (var n = 0, r = t.length, i; n < r; ++n)
    if ((i = t[n]).name === e)
      return i.value;
}
function Hn(t, e, n) {
  for (var r = 0, i = t.length; r < i; ++r)
    if (t[r].name === e) {
      t[r] = Oi, t = t.slice(0, r).concat(t.slice(r + 1));
      break;
    }
  return n != null && t.push({ name: e, value: n }), t;
}
var Ve = "http://www.w3.org/1999/xhtml";
const On = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Ve,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Se(t) {
  var e = t += "", n = e.indexOf(":");
  return n >= 0 && (e = t.slice(0, n)) !== "xmlns" && (t = t.slice(n + 1)), On.hasOwnProperty(e) ? { space: On[e], local: t } : t;
}
function Li(t) {
  return function() {
    var e = this.ownerDocument, n = this.namespaceURI;
    return n === Ve && e.documentElement.namespaceURI === Ve ? e.createElement(t) : e.createElementNS(n, t);
  };
}
function Pi(t) {
  return function() {
    return this.ownerDocument.createElementNS(t.space, t.local);
  };
}
function hr(t) {
  var e = Se(t);
  return (e.local ? Pi : Li)(e);
}
function Wi() {
}
function on(t) {
  return t == null ? Wi : function() {
    return this.querySelector(t);
  };
}
function zi(t) {
  typeof t != "function" && (t = on(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = new Array(a), c, s, l = 0; l < a; ++l)
      (c = o[l]) && (s = t.call(c, c.__data__, l, o)) && ("__data__" in c && (s.__data__ = c.__data__), u[l] = s);
  return new j(r, this._parents);
}
function dr(t) {
  return t == null ? [] : Array.isArray(t) ? t : Array.from(t);
}
function qi() {
  return [];
}
function gr(t) {
  return t == null ? qi : function() {
    return this.querySelectorAll(t);
  };
}
function Vi(t) {
  return function() {
    return dr(t.apply(this, arguments));
  };
}
function Bi(t) {
  typeof t == "function" ? t = Vi(t) : t = gr(t);
  for (var e = this._groups, n = e.length, r = [], i = [], o = 0; o < n; ++o)
    for (var a = e[o], u = a.length, c, s = 0; s < u; ++s)
      (c = a[s]) && (r.push(t.call(c, c.__data__, s, a)), i.push(c));
  return new j(r, i);
}
function mr(t) {
  return function() {
    return this.matches(t);
  };
}
function pr(t) {
  return function(e) {
    return e.matches(t);
  };
}
var Xi = Array.prototype.find;
function Zi(t) {
  return function() {
    return Xi.call(this.children, t);
  };
}
function Gi() {
  return this.firstElementChild;
}
function Ji(t) {
  return this.select(t == null ? Gi : Zi(typeof t == "function" ? t : pr(t)));
}
var Qi = Array.prototype.filter;
function Ki() {
  return Array.from(this.children);
}
function ji(t) {
  return function() {
    return Qi.call(this.children, t);
  };
}
function to(t) {
  return this.selectAll(t == null ? Ki : ji(typeof t == "function" ? t : pr(t)));
}
function eo(t) {
  typeof t != "function" && (t = mr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = [], c, s = 0; s < a; ++s)
      (c = o[s]) && t.call(c, c.__data__, s, o) && u.push(c);
  return new j(r, this._parents);
}
function yr(t) {
  return new Array(t.length);
}
function no() {
  return new j(this._enter || this._groups.map(yr), this._parents);
}
function me(t, e) {
  this.ownerDocument = t.ownerDocument, this.namespaceURI = t.namespaceURI, this._next = null, this._parent = t, this.__data__ = e;
}
me.prototype = {
  constructor: me,
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
function ro(t) {
  return function() {
    return t;
  };
}
function io(t, e, n, r, i, o) {
  for (var a = 0, u, c = e.length, s = o.length; a < s; ++a)
    (u = e[a]) ? (u.__data__ = o[a], r[a] = u) : n[a] = new me(t, o[a]);
  for (; a < c; ++a)
    (u = e[a]) && (i[a] = u);
}
function oo(t, e, n, r, i, o, a) {
  var u, c, s = /* @__PURE__ */ new Map(), l = e.length, f = o.length, h = new Array(l), d;
  for (u = 0; u < l; ++u)
    (c = e[u]) && (h[u] = d = a.call(c, c.__data__, u, e) + "", s.has(d) ? i[u] = c : s.set(d, c));
  for (u = 0; u < f; ++u)
    d = a.call(t, o[u], u, o) + "", (c = s.get(d)) ? (r[u] = c, c.__data__ = o[u], s.delete(d)) : n[u] = new me(t, o[u]);
  for (u = 0; u < l; ++u)
    (c = e[u]) && s.get(h[u]) === c && (i[u] = c);
}
function ao(t) {
  return t.__data__;
}
function so(t, e) {
  if (!arguments.length) return Array.from(this, ao);
  var n = e ? oo : io, r = this._parents, i = this._groups;
  typeof t != "function" && (t = ro(t));
  for (var o = i.length, a = new Array(o), u = new Array(o), c = new Array(o), s = 0; s < o; ++s) {
    var l = r[s], f = i[s], h = f.length, d = uo(t.call(l, l && l.__data__, s, r)), k = d.length, E = u[s] = new Array(k), Y = a[s] = new Array(k), L = c[s] = new Array(h);
    n(l, f, E, Y, L, d, e);
    for (var A = 0, S = 0, p, b; A < k; ++A)
      if (p = E[A]) {
        for (A >= S && (S = A + 1); !(b = Y[S]) && ++S < k; ) ;
        p._next = b || null;
      }
  }
  return a = new j(a, r), a._enter = u, a._exit = c, a;
}
function uo(t) {
  return typeof t == "object" && "length" in t ? t : Array.from(t);
}
function co() {
  return new j(this._exit || this._groups.map(yr), this._parents);
}
function lo(t, e, n) {
  var r = this.enter(), i = this, o = this.exit();
  return typeof t == "function" ? (r = t(r), r && (r = r.selection())) : r = r.append(t + ""), e != null && (i = e(i), i && (i = i.selection())), n == null ? o.remove() : n(o), r && i ? r.merge(i).order() : i;
}
function fo(t) {
  for (var e = t.selection ? t.selection() : t, n = this._groups, r = e._groups, i = n.length, o = r.length, a = Math.min(i, o), u = new Array(i), c = 0; c < a; ++c)
    for (var s = n[c], l = r[c], f = s.length, h = u[c] = new Array(f), d, k = 0; k < f; ++k)
      (d = s[k] || l[k]) && (h[k] = d);
  for (; c < i; ++c)
    u[c] = n[c];
  return new j(u, this._parents);
}
function ho() {
  for (var t = this._groups, e = -1, n = t.length; ++e < n; )
    for (var r = t[e], i = r.length - 1, o = r[i], a; --i >= 0; )
      (a = r[i]) && (o && a.compareDocumentPosition(o) ^ 4 && o.parentNode.insertBefore(a, o), o = a);
  return this;
}
function go(t) {
  t || (t = mo);
  function e(f, h) {
    return f && h ? t(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, r = n.length, i = new Array(r), o = 0; o < r; ++o) {
    for (var a = n[o], u = a.length, c = i[o] = new Array(u), s, l = 0; l < u; ++l)
      (s = a[l]) && (c[l] = s);
    c.sort(e);
  }
  return new j(i, this._parents).order();
}
function mo(t, e) {
  return t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
}
function po() {
  var t = arguments[0];
  return arguments[0] = this, t.apply(null, arguments), this;
}
function yo() {
  return Array.from(this);
}
function wo() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length; i < o; ++i) {
      var a = r[i];
      if (a) return a;
    }
  return null;
}
function xo() {
  let t = 0;
  for (const e of this) ++t;
  return t;
}
function vo() {
  return !this.node();
}
function _o(t) {
  for (var e = this._groups, n = 0, r = e.length; n < r; ++n)
    for (var i = e[n], o = 0, a = i.length, u; o < a; ++o)
      (u = i[o]) && t.call(u, u.__data__, o, i);
  return this;
}
function Mo(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function bo(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function $o(t, e) {
  return function() {
    this.setAttribute(t, e);
  };
}
function ko(t, e) {
  return function() {
    this.setAttributeNS(t.space, t.local, e);
  };
}
function To(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttribute(t) : this.setAttribute(t, n);
  };
}
function So(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? this.removeAttributeNS(t.space, t.local) : this.setAttributeNS(t.space, t.local, n);
  };
}
function Co(t, e) {
  var n = Se(t);
  if (arguments.length < 2) {
    var r = this.node();
    return n.local ? r.getAttributeNS(n.space, n.local) : r.getAttribute(n);
  }
  return this.each((e == null ? n.local ? bo : Mo : typeof e == "function" ? n.local ? So : To : n.local ? ko : $o)(n, e));
}
function wr(t) {
  return t.ownerDocument && t.ownerDocument.defaultView || t.document && t || t.defaultView;
}
function Ao(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Do(t, e, n) {
  return function() {
    this.style.setProperty(t, e, n);
  };
}
function No(t, e, n) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(t) : this.style.setProperty(t, r, n);
  };
}
function Fo(t, e, n) {
  return arguments.length > 1 ? this.each((e == null ? Ao : typeof e == "function" ? No : Do)(t, e, n ?? "")) : Ft(this.node(), t);
}
function Ft(t, e) {
  return t.style.getPropertyValue(e) || wr(t).getComputedStyle(t, null).getPropertyValue(e);
}
function Uo(t) {
  return function() {
    delete this[t];
  };
}
function Yo(t, e) {
  return function() {
    this[t] = e;
  };
}
function Eo(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    n == null ? delete this[t] : this[t] = n;
  };
}
function Ho(t, e) {
  return arguments.length > 1 ? this.each((e == null ? Uo : typeof e == "function" ? Eo : Yo)(t, e)) : this.node()[t];
}
function xr(t) {
  return t.trim().split(/^|\s+/);
}
function an(t) {
  return t.classList || new vr(t);
}
function vr(t) {
  this._node = t, this._names = xr(t.getAttribute("class") || "");
}
vr.prototype = {
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
function _r(t, e) {
  for (var n = an(t), r = -1, i = e.length; ++r < i; ) n.add(e[r]);
}
function Mr(t, e) {
  for (var n = an(t), r = -1, i = e.length; ++r < i; ) n.remove(e[r]);
}
function Oo(t) {
  return function() {
    _r(this, t);
  };
}
function Io(t) {
  return function() {
    Mr(this, t);
  };
}
function Ro(t, e) {
  return function() {
    (e.apply(this, arguments) ? _r : Mr)(this, t);
  };
}
function Lo(t, e) {
  var n = xr(t + "");
  if (arguments.length < 2) {
    for (var r = an(this.node()), i = -1, o = n.length; ++i < o; ) if (!r.contains(n[i])) return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? Ro : e ? Oo : Io)(n, e));
}
function Po() {
  this.textContent = "";
}
function Wo(t) {
  return function() {
    this.textContent = t;
  };
}
function zo(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.textContent = e ?? "";
  };
}
function qo(t) {
  return arguments.length ? this.each(t == null ? Po : (typeof t == "function" ? zo : Wo)(t)) : this.node().textContent;
}
function Vo() {
  this.innerHTML = "";
}
function Bo(t) {
  return function() {
    this.innerHTML = t;
  };
}
function Xo(t) {
  return function() {
    var e = t.apply(this, arguments);
    this.innerHTML = e ?? "";
  };
}
function Zo(t) {
  return arguments.length ? this.each(t == null ? Vo : (typeof t == "function" ? Xo : Bo)(t)) : this.node().innerHTML;
}
function Go() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function Jo() {
  return this.each(Go);
}
function Qo() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function Ko() {
  return this.each(Qo);
}
function jo(t) {
  var e = typeof t == "function" ? t : hr(t);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function ta() {
  return null;
}
function ea(t, e) {
  var n = typeof t == "function" ? t : hr(t), r = e == null ? ta : typeof e == "function" ? e : on(e);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function na() {
  var t = this.parentNode;
  t && t.removeChild(this);
}
function ra() {
  return this.each(na);
}
function ia() {
  var t = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function oa() {
  var t = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(t, this.nextSibling) : t;
}
function aa(t) {
  return this.select(t ? oa : ia);
}
function sa(t) {
  return arguments.length ? this.property("__data__", t) : this.node().__data__;
}
function ua(t) {
  return function(e) {
    t.call(this, e, this.__data__);
  };
}
function ca(t) {
  return t.trim().split(/^|\s+/).map(function(e) {
    var n = "", r = e.indexOf(".");
    return r >= 0 && (n = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: n };
  });
}
function la(t) {
  return function() {
    var e = this.__on;
    if (e) {
      for (var n = 0, r = -1, i = e.length, o; n < i; ++n)
        o = e[n], (!t.type || o.type === t.type) && o.name === t.name ? this.removeEventListener(o.type, o.listener, o.options) : e[++r] = o;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function fa(t, e, n) {
  return function() {
    var r = this.__on, i, o = ua(e);
    if (r) {
      for (var a = 0, u = r.length; a < u; ++a)
        if ((i = r[a]).type === t.type && i.name === t.name) {
          this.removeEventListener(i.type, i.listener, i.options), this.addEventListener(i.type, i.listener = o, i.options = n), i.value = e;
          return;
        }
    }
    this.addEventListener(t.type, o, n), i = { type: t.type, name: t.name, value: e, listener: o, options: n }, r ? r.push(i) : this.__on = [i];
  };
}
function ha(t, e, n) {
  var r = ca(t + ""), i, o = r.length, a;
  if (arguments.length < 2) {
    var u = this.node().__on;
    if (u) {
      for (var c = 0, s = u.length, l; c < s; ++c)
        for (i = 0, l = u[c]; i < o; ++i)
          if ((a = r[i]).type === l.type && a.name === l.name)
            return l.value;
    }
    return;
  }
  for (u = e ? fa : la, i = 0; i < o; ++i) this.each(u(r[i], e, n));
  return this;
}
function br(t, e, n) {
  var r = wr(t), i = r.CustomEvent;
  typeof i == "function" ? i = new i(e, n) : (i = r.document.createEvent("Event"), n ? (i.initEvent(e, n.bubbles, n.cancelable), i.detail = n.detail) : i.initEvent(e, !1, !1)), t.dispatchEvent(i);
}
function da(t, e) {
  return function() {
    return br(this, t, e);
  };
}
function ga(t, e) {
  return function() {
    return br(this, t, e.apply(this, arguments));
  };
}
function ma(t, e) {
  return this.each((typeof e == "function" ? ga : da)(t, e));
}
function* pa() {
  for (var t = this._groups, e = 0, n = t.length; e < n; ++e)
    for (var r = t[e], i = 0, o = r.length, a; i < o; ++i)
      (a = r[i]) && (yield a);
}
var sn = [null];
function j(t, e) {
  this._groups = t, this._parents = e;
}
function Kt() {
  return new j([[document.documentElement]], sn);
}
function ya() {
  return this;
}
j.prototype = Kt.prototype = {
  constructor: j,
  select: zi,
  selectAll: Bi,
  selectChild: Ji,
  selectChildren: to,
  filter: eo,
  data: so,
  enter: no,
  exit: co,
  join: lo,
  merge: fo,
  selection: ya,
  order: ho,
  sort: go,
  call: po,
  nodes: yo,
  node: wo,
  size: xo,
  empty: vo,
  each: _o,
  attr: Co,
  style: Fo,
  property: Ho,
  classed: Lo,
  text: qo,
  html: Zo,
  raise: Jo,
  lower: Ko,
  append: jo,
  insert: ea,
  remove: ra,
  clone: aa,
  datum: sa,
  on: ha,
  dispatch: ma,
  [Symbol.iterator]: pa
};
function R(t) {
  return typeof t == "string" ? new j([[document.querySelector(t)]], [document.documentElement]) : new j([[t]], sn);
}
function wa(t) {
  let e;
  for (; e = t.sourceEvent; ) t = e;
  return t;
}
function In(t, e) {
  if (t = wa(t), e === void 0 && (e = t.currentTarget), e) {
    var n = e.ownerSVGElement || e;
    if (n.createSVGPoint) {
      var r = n.createSVGPoint();
      return r.x = t.clientX, r.y = t.clientY, r = r.matrixTransform(e.getScreenCTM().inverse()), [r.x, r.y];
    }
    if (e.getBoundingClientRect) {
      var i = e.getBoundingClientRect();
      return [t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop];
    }
  }
  return [t.pageX, t.pageY];
}
function mt(t) {
  return typeof t == "string" ? new j([document.querySelectorAll(t)], [document.documentElement]) : new j([dr(t)], sn);
}
const xa = { passive: !1 }, Gt = { capture: !0, passive: !1 };
function Ye(t) {
  t.stopImmediatePropagation();
}
function Dt(t) {
  t.preventDefault(), t.stopImmediatePropagation();
}
function va(t) {
  var e = t.document.documentElement, n = R(t).on("dragstart.drag", Dt, Gt);
  "onselectstart" in e ? n.on("selectstart.drag", Dt, Gt) : (e.__noselect = e.style.MozUserSelect, e.style.MozUserSelect = "none");
}
function _a(t, e) {
  var n = t.document.documentElement, r = R(t).on("dragstart.drag", null);
  e && (r.on("click.drag", Dt, Gt), setTimeout(function() {
    r.on("click.drag", null);
  }, 0)), "onselectstart" in n ? r.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const ne = (t) => () => t;
function Be(t, {
  sourceEvent: e,
  subject: n,
  target: r,
  identifier: i,
  active: o,
  x: a,
  y: u,
  dx: c,
  dy: s,
  dispatch: l
}) {
  Object.defineProperties(this, {
    type: { value: t, enumerable: !0, configurable: !0 },
    sourceEvent: { value: e, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: r, enumerable: !0, configurable: !0 },
    identifier: { value: i, enumerable: !0, configurable: !0 },
    active: { value: o, enumerable: !0, configurable: !0 },
    x: { value: a, enumerable: !0, configurable: !0 },
    y: { value: u, enumerable: !0, configurable: !0 },
    dx: { value: c, enumerable: !0, configurable: !0 },
    dy: { value: s, enumerable: !0, configurable: !0 },
    _: { value: l }
  });
}
Be.prototype.on = function() {
  var t = this._.on.apply(this._, arguments);
  return t === this._ ? this : t;
};
function Ma(t) {
  return !t.ctrlKey && !t.button;
}
function ba() {
  return this.parentNode;
}
function $a(t, e) {
  return e ?? { x: t.x, y: t.y };
}
function ka() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function ul() {
  var t = Ma, e = ba, n = $a, r = ka, i = {}, o = rn("start", "drag", "end"), a = 0, u, c, s, l, f = 0;
  function h(p) {
    p.on("mousedown.drag", d).filter(r).on("touchstart.drag", Y).on("touchmove.drag", L, xa).on("touchend.drag touchcancel.drag", A).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function d(p, b) {
    if (!(l || !t.call(this, p, b))) {
      var g = S(this, e.call(this, p, b), p, b, "mouse");
      g && (R(p.view).on("mousemove.drag", k, Gt).on("mouseup.drag", E, Gt), va(p.view), Ye(p), s = !1, u = p.clientX, c = p.clientY, g("start", p));
    }
  }
  function k(p) {
    if (Dt(p), !s) {
      var b = p.clientX - u, g = p.clientY - c;
      s = b * b + g * g > f;
    }
    i.mouse("drag", p);
  }
  function E(p) {
    R(p.view).on("mousemove.drag mouseup.drag", null), _a(p.view, s), Dt(p), i.mouse("end", p);
  }
  function Y(p, b) {
    if (t.call(this, p, b)) {
      var g = p.changedTouches, y = e.call(this, p, b), w = g.length, N, C;
      for (N = 0; N < w; ++N)
        (C = S(this, y, p, b, g[N].identifier, g[N])) && (Ye(p), C("start", p, g[N]));
    }
  }
  function L(p) {
    var b = p.changedTouches, g = b.length, y, w;
    for (y = 0; y < g; ++y)
      (w = i[b[y].identifier]) && (Dt(p), w("drag", p, b[y]));
  }
  function A(p) {
    var b = p.changedTouches, g = b.length, y, w;
    for (l && clearTimeout(l), l = setTimeout(function() {
      l = null;
    }, 500), y = 0; y < g; ++y)
      (w = i[b[y].identifier]) && (Ye(p), w("end", p, b[y]));
  }
  function S(p, b, g, y, w, N) {
    var C = o.copy(), m = In(N || g, b), H, P, T;
    if ((T = n.call(p, new Be("beforestart", {
      sourceEvent: g,
      target: h,
      identifier: w,
      active: a,
      x: m[0],
      y: m[1],
      dx: 0,
      dy: 0,
      dispatch: C
    }), y)) != null)
      return H = T.x - m[0] || 0, P = T.y - m[1] || 0, function _(M, D, $) {
        var F = m, O;
        switch (M) {
          case "start":
            i[w] = _, O = a++;
            break;
          case "end":
            delete i[w], --a;
          case "drag":
            m = In($ || D, b), O = a;
            break;
        }
        C.call(
          M,
          p,
          new Be(M, {
            sourceEvent: D,
            subject: T,
            target: h,
            identifier: w,
            active: O,
            x: m[0] + H,
            y: m[1] + P,
            dx: m[0] - F[0],
            dy: m[1] - F[1],
            dispatch: C
          }),
          y
        );
      };
  }
  return h.filter = function(p) {
    return arguments.length ? (t = typeof p == "function" ? p : ne(!!p), h) : t;
  }, h.container = function(p) {
    return arguments.length ? (e = typeof p == "function" ? p : ne(p), h) : e;
  }, h.subject = function(p) {
    return arguments.length ? (n = typeof p == "function" ? p : ne(p), h) : n;
  }, h.touchable = function(p) {
    return arguments.length ? (r = typeof p == "function" ? p : ne(!!p), h) : r;
  }, h.on = function() {
    var p = o.on.apply(o, arguments);
    return p === o ? h : p;
  }, h.clickDistance = function(p) {
    return arguments.length ? (f = (p = +p) * p, h) : Math.sqrt(f);
  }, h;
}
function Ce(t, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(t);
      break;
    default:
      this.range(e).domain(t);
      break;
  }
  return this;
}
const Rn = Symbol("implicit");
function Nt() {
  var t = new $n(), e = [], n = [], r = Rn;
  function i(o) {
    let a = t.get(o);
    if (a === void 0) {
      if (r !== Rn) return r;
      t.set(o, a = e.push(o) - 1);
    }
    return n[a % n.length];
  }
  return i.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [], t = new $n();
    for (const a of o)
      t.has(a) || t.set(a, e.push(a) - 1);
    return i;
  }, i.range = function(o) {
    return arguments.length ? (n = Array.from(o), i) : n.slice();
  }, i.unknown = function(o) {
    return arguments.length ? (r = o, i) : r;
  }, i.copy = function() {
    return Nt(e, n).unknown(r);
  }, Ce.apply(i, arguments), i;
}
function $r() {
  var t = Nt().unknown(void 0), e = t.domain, n = t.range, r = 0, i = 1, o, a, u = !1, c = 0, s = 0, l = 0.5;
  delete t.unknown;
  function f() {
    var h = e().length, d = i < r, k = d ? i : r, E = d ? r : i;
    o = (E - k) / Math.max(1, h - c + s * 2), u && (o = Math.floor(o)), k += (E - k - o * (h - c)) * l, a = o * (1 - c), u && (k = Math.round(k), a = Math.round(a));
    var Y = yi(h).map(function(L) {
      return k + o * L;
    });
    return n(d ? Y.reverse() : Y);
  }
  return t.domain = function(h) {
    return arguments.length ? (e(h), f()) : e();
  }, t.range = function(h) {
    return arguments.length ? ([r, i] = h, r = +r, i = +i, f()) : [r, i];
  }, t.rangeRound = function(h) {
    return [r, i] = h, r = +r, i = +i, u = !0, f();
  }, t.bandwidth = function() {
    return a;
  }, t.step = function() {
    return o;
  }, t.round = function(h) {
    return arguments.length ? (u = !!h, f()) : u;
  }, t.padding = function(h) {
    return arguments.length ? (c = Math.min(1, s = +h), f()) : c;
  }, t.paddingInner = function(h) {
    return arguments.length ? (c = Math.min(1, h), f()) : c;
  }, t.paddingOuter = function(h) {
    return arguments.length ? (s = +h, f()) : s;
  }, t.align = function(h) {
    return arguments.length ? (l = Math.max(0, Math.min(1, h)), f()) : l;
  }, t.copy = function() {
    return $r(e(), [r, i]).round(u).paddingInner(c).paddingOuter(s).align(l);
  }, Ce.apply(f(), arguments);
}
const un = (t) => () => t;
function Ta(t, e) {
  return function(n) {
    return t + n * e;
  };
}
function Sa(t, e, n) {
  return t = Math.pow(t, n), e = Math.pow(e, n) - t, n = 1 / n, function(r) {
    return Math.pow(t + r * e, n);
  };
}
function Ca(t) {
  return (t = +t) == 1 ? kr : function(e, n) {
    return n - e ? Sa(e, n, t) : un(isNaN(e) ? n : e);
  };
}
function kr(t, e) {
  var n = e - t;
  return n ? Ta(t, n) : un(isNaN(t) ? e : t);
}
const pe = function t(e) {
  var n = Ca(e);
  function r(i, o) {
    var a = n((i = qe(i)).r, (o = qe(o)).r), u = n(i.g, o.g), c = n(i.b, o.b), s = kr(i.opacity, o.opacity);
    return function(l) {
      return i.r = a(l), i.g = u(l), i.b = c(l), i.opacity = s(l), i + "";
    };
  }
  return r.gamma = t, r;
}(1);
function Aa(t, e) {
  e || (e = []);
  var n = t ? Math.min(e.length, t.length) : 0, r = e.slice(), i;
  return function(o) {
    for (i = 0; i < n; ++i) r[i] = t[i] * (1 - o) + e[i] * o;
    return r;
  };
}
function Da(t) {
  return ArrayBuffer.isView(t) && !(t instanceof DataView);
}
function Na(t, e) {
  var n = e ? e.length : 0, r = t ? Math.min(n, t.length) : 0, i = new Array(r), o = new Array(n), a;
  for (a = 0; a < r; ++a) i[a] = cn(t[a], e[a]);
  for (; a < n; ++a) o[a] = e[a];
  return function(u) {
    for (a = 0; a < r; ++a) o[a] = i[a](u);
    return o;
  };
}
function Fa(t, e) {
  var n = /* @__PURE__ */ new Date();
  return t = +t, e = +e, function(r) {
    return n.setTime(t * (1 - r) + e * r), n;
  };
}
function it(t, e) {
  return t = +t, e = +e, function(n) {
    return t * (1 - n) + e * n;
  };
}
function Ua(t, e) {
  var n = {}, r = {}, i;
  (t === null || typeof t != "object") && (t = {}), (e === null || typeof e != "object") && (e = {});
  for (i in e)
    i in t ? n[i] = cn(t[i], e[i]) : r[i] = e[i];
  return function(o) {
    for (i in n) r[i] = n[i](o);
    return r;
  };
}
var Xe = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ee = new RegExp(Xe.source, "g");
function Ya(t) {
  return function() {
    return t;
  };
}
function Ea(t) {
  return function(e) {
    return t(e) + "";
  };
}
function Tr(t, e) {
  var n = Xe.lastIndex = Ee.lastIndex = 0, r, i, o, a = -1, u = [], c = [];
  for (t = t + "", e = e + ""; (r = Xe.exec(t)) && (i = Ee.exec(e)); )
    (o = i.index) > n && (o = e.slice(n, o), u[a] ? u[a] += o : u[++a] = o), (r = r[0]) === (i = i[0]) ? u[a] ? u[a] += i : u[++a] = i : (u[++a] = null, c.push({ i: a, x: it(r, i) })), n = Ee.lastIndex;
  return n < e.length && (o = e.slice(n), u[a] ? u[a] += o : u[++a] = o), u.length < 2 ? c[0] ? Ea(c[0].x) : Ya(e) : (e = c.length, function(s) {
    for (var l = 0, f; l < e; ++l) u[(f = c[l]).i] = f.x(s);
    return u.join("");
  });
}
function cn(t, e) {
  var n = typeof e, r;
  return e == null || n === "boolean" ? un(e) : (n === "number" ? it : n === "string" ? (r = _t(e)) ? (e = r, pe) : Tr : e instanceof _t ? pe : e instanceof Date ? Fa : Da(e) ? Aa : Array.isArray(e) ? Na : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Ua : it)(t, e);
}
function Ha(t, e) {
  return t = +t, e = +e, function(n) {
    return Math.round(t * (1 - n) + e * n);
  };
}
var Ln = 180 / Math.PI, Ze = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Sr(t, e, n, r, i, o) {
  var a, u, c;
  return (a = Math.sqrt(t * t + e * e)) && (t /= a, e /= a), (c = t * n + e * r) && (n -= t * c, r -= e * c), (u = Math.sqrt(n * n + r * r)) && (n /= u, r /= u, c /= u), t * r < e * n && (t = -t, e = -e, c = -c, a = -a), {
    translateX: i,
    translateY: o,
    rotate: Math.atan2(e, t) * Ln,
    skewX: Math.atan(c) * Ln,
    scaleX: a,
    scaleY: u
  };
}
var re;
function Oa(t) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(t + "");
  return e.isIdentity ? Ze : Sr(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Ia(t) {
  return t == null || (re || (re = document.createElementNS("http://www.w3.org/2000/svg", "g")), re.setAttribute("transform", t), !(t = re.transform.baseVal.consolidate())) ? Ze : (t = t.matrix, Sr(t.a, t.b, t.c, t.d, t.e, t.f));
}
function Cr(t, e, n, r) {
  function i(s) {
    return s.length ? s.pop() + " " : "";
  }
  function o(s, l, f, h, d, k) {
    if (s !== f || l !== h) {
      var E = d.push("translate(", null, e, null, n);
      k.push({ i: E - 4, x: it(s, f) }, { i: E - 2, x: it(l, h) });
    } else (f || h) && d.push("translate(" + f + e + h + n);
  }
  function a(s, l, f, h) {
    s !== l ? (s - l > 180 ? l += 360 : l - s > 180 && (s += 360), h.push({ i: f.push(i(f) + "rotate(", null, r) - 2, x: it(s, l) })) : l && f.push(i(f) + "rotate(" + l + r);
  }
  function u(s, l, f, h) {
    s !== l ? h.push({ i: f.push(i(f) + "skewX(", null, r) - 2, x: it(s, l) }) : l && f.push(i(f) + "skewX(" + l + r);
  }
  function c(s, l, f, h, d, k) {
    if (s !== f || l !== h) {
      var E = d.push(i(d) + "scale(", null, ",", null, ")");
      k.push({ i: E - 4, x: it(s, f) }, { i: E - 2, x: it(l, h) });
    } else (f !== 1 || h !== 1) && d.push(i(d) + "scale(" + f + "," + h + ")");
  }
  return function(s, l) {
    var f = [], h = [];
    return s = t(s), l = t(l), o(s.translateX, s.translateY, l.translateX, l.translateY, f, h), a(s.rotate, l.rotate, f, h), u(s.skewX, l.skewX, f, h), c(s.scaleX, s.scaleY, l.scaleX, l.scaleY, f, h), s = l = null, function(d) {
      for (var k = -1, E = h.length, Y; ++k < E; ) f[(Y = h[k]).i] = Y.x(d);
      return f.join("");
    };
  };
}
var Ra = Cr(Oa, "px, ", "px)", "deg)"), La = Cr(Ia, ", ", ")", ")");
function Pa(t) {
  return function() {
    return t;
  };
}
function Wa(t) {
  return +t;
}
var Pn = [0, 1];
function St(t) {
  return t;
}
function Ge(t, e) {
  return (e -= t = +t) ? function(n) {
    return (n - t) / e;
  } : Pa(isNaN(e) ? NaN : 0.5);
}
function za(t, e) {
  var n;
  return t > e && (n = t, t = e, e = n), function(r) {
    return Math.max(t, Math.min(e, r));
  };
}
function qa(t, e, n) {
  var r = t[0], i = t[1], o = e[0], a = e[1];
  return i < r ? (r = Ge(i, r), o = n(a, o)) : (r = Ge(r, i), o = n(o, a)), function(u) {
    return o(r(u));
  };
}
function Va(t, e, n) {
  var r = Math.min(t.length, e.length) - 1, i = new Array(r), o = new Array(r), a = -1;
  for (t[r] < t[0] && (t = t.slice().reverse(), e = e.slice().reverse()); ++a < r; )
    i[a] = Ge(t[a], t[a + 1]), o[a] = n(e[a], e[a + 1]);
  return function(u) {
    var c = si(t, u, 1, r) - 1;
    return o[c](i[c](u));
  };
}
function Ar(t, e) {
  return e.domain(t.domain()).range(t.range()).interpolate(t.interpolate()).clamp(t.clamp()).unknown(t.unknown());
}
function Ba() {
  var t = Pn, e = Pn, n = cn, r, i, o, a = St, u, c, s;
  function l() {
    var h = Math.min(t.length, e.length);
    return a !== St && (a = za(t[0], t[h - 1])), u = h > 2 ? Va : qa, c = s = null, f;
  }
  function f(h) {
    return h == null || isNaN(h = +h) ? o : (c || (c = u(t.map(r), e, n)))(r(a(h)));
  }
  return f.invert = function(h) {
    return a(i((s || (s = u(e, t.map(r), it)))(h)));
  }, f.domain = function(h) {
    return arguments.length ? (t = Array.from(h, Wa), l()) : t.slice();
  }, f.range = function(h) {
    return arguments.length ? (e = Array.from(h), l()) : e.slice();
  }, f.rangeRound = function(h) {
    return e = Array.from(h), n = Ha, l();
  }, f.clamp = function(h) {
    return arguments.length ? (a = h ? !0 : St, l()) : a !== St;
  }, f.interpolate = function(h) {
    return arguments.length ? (n = h, l()) : n;
  }, f.unknown = function(h) {
    return arguments.length ? (o = h, f) : o;
  }, function(h, d) {
    return r = h, i = d, l();
  };
}
function Dr() {
  return Ba()(St, St);
}
function Xa(t) {
  return Math.abs(t = Math.round(t)) >= 1e21 ? t.toLocaleString("en").replace(/,/g, "") : t.toString(10);
}
function ye(t, e) {
  if ((n = (t = e ? t.toExponential(e - 1) : t.toExponential()).indexOf("e")) < 0) return null;
  var n, r = t.slice(0, n);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +t.slice(n + 1)
  ];
}
function Ut(t) {
  return t = ye(Math.abs(t)), t ? t[1] : NaN;
}
function Za(t, e) {
  return function(n, r) {
    for (var i = n.length, o = [], a = 0, u = t[0], c = 0; i > 0 && u > 0 && (c + u + 1 > r && (u = Math.max(1, r - c)), o.push(n.substring(i -= u, i + u)), !((c += u + 1) > r)); )
      u = t[a = (a + 1) % t.length];
    return o.reverse().join(e);
  };
}
function Ga(t) {
  return function(e) {
    return e.replace(/[0-9]/g, function(n) {
      return t[+n];
    });
  };
}
var Ja = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function we(t) {
  if (!(e = Ja.exec(t))) throw new Error("invalid format: " + t);
  var e;
  return new ln({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
we.prototype = ln.prototype;
function ln(t) {
  this.fill = t.fill === void 0 ? " " : t.fill + "", this.align = t.align === void 0 ? ">" : t.align + "", this.sign = t.sign === void 0 ? "-" : t.sign + "", this.symbol = t.symbol === void 0 ? "" : t.symbol + "", this.zero = !!t.zero, this.width = t.width === void 0 ? void 0 : +t.width, this.comma = !!t.comma, this.precision = t.precision === void 0 ? void 0 : +t.precision, this.trim = !!t.trim, this.type = t.type === void 0 ? "" : t.type + "";
}
ln.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function Qa(t) {
  t: for (var e = t.length, n = 1, r = -1, i; n < e; ++n)
    switch (t[n]) {
      case ".":
        r = i = n;
        break;
      case "0":
        r === 0 && (r = n), i = n;
        break;
      default:
        if (!+t[n]) break t;
        r > 0 && (r = 0);
        break;
    }
  return r > 0 ? t.slice(0, r) + t.slice(i + 1) : t;
}
var Nr;
function Ka(t, e) {
  var n = ye(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1], o = i - (Nr = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, a = r.length;
  return o === a ? r : o > a ? r + new Array(o - a + 1).join("0") : o > 0 ? r.slice(0, o) + "." + r.slice(o) : "0." + new Array(1 - o).join("0") + ye(t, Math.max(0, e + o - 1))[0];
}
function Wn(t, e) {
  var n = ye(t, e);
  if (!n) return t + "";
  var r = n[0], i = n[1];
  return i < 0 ? "0." + new Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + new Array(i - r.length + 2).join("0");
}
const zn = {
  "%": (t, e) => (t * 100).toFixed(e),
  b: (t) => Math.round(t).toString(2),
  c: (t) => t + "",
  d: Xa,
  e: (t, e) => t.toExponential(e),
  f: (t, e) => t.toFixed(e),
  g: (t, e) => t.toPrecision(e),
  o: (t) => Math.round(t).toString(8),
  p: (t, e) => Wn(t * 100, e),
  r: Wn,
  s: Ka,
  X: (t) => Math.round(t).toString(16).toUpperCase(),
  x: (t) => Math.round(t).toString(16)
};
function qn(t) {
  return t;
}
var Vn = Array.prototype.map, Bn = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function ja(t) {
  var e = t.grouping === void 0 || t.thousands === void 0 ? qn : Za(Vn.call(t.grouping, Number), t.thousands + ""), n = t.currency === void 0 ? "" : t.currency[0] + "", r = t.currency === void 0 ? "" : t.currency[1] + "", i = t.decimal === void 0 ? "." : t.decimal + "", o = t.numerals === void 0 ? qn : Ga(Vn.call(t.numerals, String)), a = t.percent === void 0 ? "%" : t.percent + "", u = t.minus === void 0 ? "−" : t.minus + "", c = t.nan === void 0 ? "NaN" : t.nan + "";
  function s(f) {
    f = we(f);
    var h = f.fill, d = f.align, k = f.sign, E = f.symbol, Y = f.zero, L = f.width, A = f.comma, S = f.precision, p = f.trim, b = f.type;
    b === "n" ? (A = !0, b = "g") : zn[b] || (S === void 0 && (S = 12), p = !0, b = "g"), (Y || h === "0" && d === "=") && (Y = !0, h = "0", d = "=");
    var g = E === "$" ? n : E === "#" && /[boxX]/.test(b) ? "0" + b.toLowerCase() : "", y = E === "$" ? r : /[%p]/.test(b) ? a : "", w = zn[b], N = /[defgprs%]/.test(b);
    S = S === void 0 ? 6 : /[gprs]/.test(b) ? Math.max(1, Math.min(21, S)) : Math.max(0, Math.min(20, S));
    function C(m) {
      var H = g, P = y, T, _, M;
      if (b === "c")
        P = w(m) + P, m = "";
      else {
        m = +m;
        var D = m < 0 || 1 / m < 0;
        if (m = isNaN(m) ? c : w(Math.abs(m), S), p && (m = Qa(m)), D && +m == 0 && k !== "+" && (D = !1), H = (D ? k === "(" ? k : u : k === "-" || k === "(" ? "" : k) + H, P = (b === "s" ? Bn[8 + Nr / 3] : "") + P + (D && k === "(" ? ")" : ""), N) {
          for (T = -1, _ = m.length; ++T < _; )
            if (M = m.charCodeAt(T), 48 > M || M > 57) {
              P = (M === 46 ? i + m.slice(T + 1) : m.slice(T)) + P, m = m.slice(0, T);
              break;
            }
        }
      }
      A && !Y && (m = e(m, 1 / 0));
      var $ = H.length + m.length + P.length, F = $ < L ? new Array(L - $ + 1).join(h) : "";
      switch (A && Y && (m = e(F + m, F.length ? L - P.length : 1 / 0), F = ""), d) {
        case "<":
          m = H + m + P + F;
          break;
        case "=":
          m = H + F + m + P;
          break;
        case "^":
          m = F.slice(0, $ = F.length >> 1) + H + m + P + F.slice($);
          break;
        default:
          m = F + H + m + P;
          break;
      }
      return o(m);
    }
    return C.toString = function() {
      return f + "";
    }, C;
  }
  function l(f, h) {
    var d = s((f = we(f), f.type = "f", f)), k = Math.max(-8, Math.min(8, Math.floor(Ut(h) / 3))) * 3, E = Math.pow(10, -k), Y = Bn[8 + k / 3];
    return function(L) {
      return d(E * L) + Y;
    };
  }
  return {
    format: s,
    formatPrefix: l
  };
}
var ie, Fr, Ur;
ts({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function ts(t) {
  return ie = ja(t), Fr = ie.format, Ur = ie.formatPrefix, ie;
}
function es(t) {
  return Math.max(0, -Ut(Math.abs(t)));
}
function ns(t, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Ut(e) / 3))) * 3 - Ut(Math.abs(t)));
}
function rs(t, e) {
  return t = Math.abs(t), e = Math.abs(e) - t, Math.max(0, Ut(e) - Ut(t)) + 1;
}
function is(t, e, n, r) {
  var i = We(t, e, n), o;
  switch (r = we(r ?? ",f"), r.type) {
    case "s": {
      var a = Math.max(Math.abs(t), Math.abs(e));
      return r.precision == null && !isNaN(o = ns(i, a)) && (r.precision = o), Ur(r, a);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(o = rs(i, Math.max(Math.abs(t), Math.abs(e)))) && (r.precision = o - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(o = es(i)) && (r.precision = o - (r.type === "%") * 2);
      break;
    }
  }
  return Fr(r);
}
function os(t) {
  var e = t.domain;
  return t.ticks = function(n) {
    var r = e();
    return mi(r[0], r[r.length - 1], n ?? 10);
  }, t.tickFormat = function(n, r) {
    var i = e();
    return is(i[0], i[i.length - 1], n ?? 10, r);
  }, t.nice = function(n) {
    n == null && (n = 10);
    var r = e(), i = 0, o = r.length - 1, a = r[i], u = r[o], c, s, l = 10;
    for (u < a && (s = a, a = u, u = s, s = i, i = o, o = s); l-- > 0; ) {
      if (s = Pe(a, u, n), s === c)
        return r[i] = a, r[o] = u, e(r);
      if (s > 0)
        a = Math.floor(a / s) * s, u = Math.ceil(u / s) * s;
      else if (s < 0)
        a = Math.ceil(a * s) / s, u = Math.floor(u * s) / s;
      else
        break;
      c = s;
    }
    return t;
  }, t;
}
function as() {
  var t = Dr();
  return t.copy = function() {
    return Ar(t, as());
  }, Ce.apply(t, arguments), os(t);
}
function ss(t, e) {
  t = t.slice();
  var n = 0, r = t.length - 1, i = t[n], o = t[r], a;
  return o < i && (a = n, n = r, r = a, a = i, i = o, o = a), t[n] = e.floor(i), t[r] = e.ceil(o), t;
}
const He = /* @__PURE__ */ new Date(), Oe = /* @__PURE__ */ new Date();
function G(t, e, n, r) {
  function i(o) {
    return t(o = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+o)), o;
  }
  return i.floor = (o) => (t(o = /* @__PURE__ */ new Date(+o)), o), i.ceil = (o) => (t(o = new Date(o - 1)), e(o, 1), t(o), o), i.round = (o) => {
    const a = i(o), u = i.ceil(o);
    return o - a < u - o ? a : u;
  }, i.offset = (o, a) => (e(o = /* @__PURE__ */ new Date(+o), a == null ? 1 : Math.floor(a)), o), i.range = (o, a, u) => {
    const c = [];
    if (o = i.ceil(o), u = u == null ? 1 : Math.floor(u), !(o < a) || !(u > 0)) return c;
    let s;
    do
      c.push(s = /* @__PURE__ */ new Date(+o)), e(o, u), t(o);
    while (s < o && o < a);
    return c;
  }, i.filter = (o) => G((a) => {
    if (a >= a) for (; t(a), !o(a); ) a.setTime(a - 1);
  }, (a, u) => {
    if (a >= a)
      if (u < 0) for (; ++u <= 0; )
        for (; e(a, -1), !o(a); )
          ;
      else for (; --u >= 0; )
        for (; e(a, 1), !o(a); )
          ;
  }), n && (i.count = (o, a) => (He.setTime(+o), Oe.setTime(+a), t(He), t(Oe), Math.floor(n(He, Oe))), i.every = (o) => (o = Math.floor(o), !isFinite(o) || !(o > 0) ? null : o > 1 ? i.filter(r ? (a) => r(a) % o === 0 : (a) => i.count(0, a) % o === 0) : i)), i;
}
const xe = G(() => {
}, (t, e) => {
  t.setTime(+t + e);
}, (t, e) => e - t);
xe.every = (t) => (t = Math.floor(t), !isFinite(t) || !(t > 0) ? null : t > 1 ? G((e) => {
  e.setTime(Math.floor(e / t) * t);
}, (e, n) => {
  e.setTime(+e + n * t);
}, (e, n) => (n - e) / t) : xe);
xe.range;
const dt = 1e3, rt = dt * 60, gt = rt * 60, pt = gt * 24, fn = pt * 7, Xn = pt * 30, Ie = pt * 365, Ct = G((t) => {
  t.setTime(t - t.getMilliseconds());
}, (t, e) => {
  t.setTime(+t + e * dt);
}, (t, e) => (e - t) / dt, (t) => t.getUTCSeconds());
Ct.range;
const hn = G((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * dt);
}, (t, e) => {
  t.setTime(+t + e * rt);
}, (t, e) => (e - t) / rt, (t) => t.getMinutes());
hn.range;
const us = G((t) => {
  t.setUTCSeconds(0, 0);
}, (t, e) => {
  t.setTime(+t + e * rt);
}, (t, e) => (e - t) / rt, (t) => t.getUTCMinutes());
us.range;
const dn = G((t) => {
  t.setTime(t - t.getMilliseconds() - t.getSeconds() * dt - t.getMinutes() * rt);
}, (t, e) => {
  t.setTime(+t + e * gt);
}, (t, e) => (e - t) / gt, (t) => t.getHours());
dn.range;
const cs = G((t) => {
  t.setUTCMinutes(0, 0, 0);
}, (t, e) => {
  t.setTime(+t + e * gt);
}, (t, e) => (e - t) / gt, (t) => t.getUTCHours());
cs.range;
const jt = G(
  (t) => t.setHours(0, 0, 0, 0),
  (t, e) => t.setDate(t.getDate() + e),
  (t, e) => (e - t - (e.getTimezoneOffset() - t.getTimezoneOffset()) * rt) / pt,
  (t) => t.getDate() - 1
);
jt.range;
const gn = G((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / pt, (t) => t.getUTCDate() - 1);
gn.range;
const ls = G((t) => {
  t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCDate(t.getUTCDate() + e);
}, (t, e) => (e - t) / pt, (t) => Math.floor(t / pt));
ls.range;
function $t(t) {
  return G((e) => {
    e.setDate(e.getDate() - (e.getDay() + 7 - t) % 7), e.setHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setDate(e.getDate() + n * 7);
  }, (e, n) => (n - e - (n.getTimezoneOffset() - e.getTimezoneOffset()) * rt) / fn);
}
const Ae = $t(0), ve = $t(1), fs = $t(2), hs = $t(3), Yt = $t(4), ds = $t(5), gs = $t(6);
Ae.range;
ve.range;
fs.range;
hs.range;
Yt.range;
ds.range;
gs.range;
function kt(t) {
  return G((e) => {
    e.setUTCDate(e.getUTCDate() - (e.getUTCDay() + 7 - t) % 7), e.setUTCHours(0, 0, 0, 0);
  }, (e, n) => {
    e.setUTCDate(e.getUTCDate() + n * 7);
  }, (e, n) => (n - e) / fn);
}
const Yr = kt(0), _e = kt(1), ms = kt(2), ps = kt(3), Et = kt(4), ys = kt(5), ws = kt(6);
Yr.range;
_e.range;
ms.range;
ps.range;
Et.range;
ys.range;
ws.range;
const mn = G((t) => {
  t.setDate(1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setMonth(t.getMonth() + e);
}, (t, e) => e.getMonth() - t.getMonth() + (e.getFullYear() - t.getFullYear()) * 12, (t) => t.getMonth());
mn.range;
const xs = G((t) => {
  t.setUTCDate(1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCMonth(t.getUTCMonth() + e);
}, (t, e) => e.getUTCMonth() - t.getUTCMonth() + (e.getUTCFullYear() - t.getUTCFullYear()) * 12, (t) => t.getUTCMonth());
xs.range;
const yt = G((t) => {
  t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, e) => {
  t.setFullYear(t.getFullYear() + e);
}, (t, e) => e.getFullYear() - t.getFullYear(), (t) => t.getFullYear());
yt.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : G((e) => {
  e.setFullYear(Math.floor(e.getFullYear() / t) * t), e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, n) => {
  e.setFullYear(e.getFullYear() + n * t);
});
yt.range;
const Mt = G((t) => {
  t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, e) => {
  t.setUTCFullYear(t.getUTCFullYear() + e);
}, (t, e) => e.getUTCFullYear() - t.getUTCFullYear(), (t) => t.getUTCFullYear());
Mt.every = (t) => !isFinite(t = Math.floor(t)) || !(t > 0) ? null : G((e) => {
  e.setUTCFullYear(Math.floor(e.getUTCFullYear() / t) * t), e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, n) => {
  e.setUTCFullYear(e.getUTCFullYear() + n * t);
});
Mt.range;
function vs(t, e, n, r, i, o) {
  const a = [
    [Ct, 1, dt],
    [Ct, 5, 5 * dt],
    [Ct, 15, 15 * dt],
    [Ct, 30, 30 * dt],
    [o, 1, rt],
    [o, 5, 5 * rt],
    [o, 15, 15 * rt],
    [o, 30, 30 * rt],
    [i, 1, gt],
    [i, 3, 3 * gt],
    [i, 6, 6 * gt],
    [i, 12, 12 * gt],
    [r, 1, pt],
    [r, 2, 2 * pt],
    [n, 1, fn],
    [e, 1, Xn],
    [e, 3, 3 * Xn],
    [t, 1, Ie]
  ];
  function u(s, l, f) {
    const h = l < s;
    h && ([s, l] = [l, s]);
    const d = f && typeof f.range == "function" ? f : c(s, l, f), k = d ? d.range(s, +l + 1) : [];
    return h ? k.reverse() : k;
  }
  function c(s, l, f) {
    const h = Math.abs(l - s) / f, d = tn(([, , Y]) => Y).right(a, h);
    if (d === a.length) return t.every(We(s / Ie, l / Ie, f));
    if (d === 0) return xe.every(Math.max(We(s, l, f), 1));
    const [k, E] = a[h / a[d - 1][2] < a[d][2] / h ? d - 1 : d];
    return k.every(E);
  }
  return [u, c];
}
const [_s, Ms] = vs(yt, mn, Ae, jt, dn, hn);
function Re(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(-1, t.m, t.d, t.H, t.M, t.S, t.L);
    return e.setFullYear(t.y), e;
  }
  return new Date(t.y, t.m, t.d, t.H, t.M, t.S, t.L);
}
function Le(t) {
  if (0 <= t.y && t.y < 100) {
    var e = new Date(Date.UTC(-1, t.m, t.d, t.H, t.M, t.S, t.L));
    return e.setUTCFullYear(t.y), e;
  }
  return new Date(Date.UTC(t.y, t.m, t.d, t.H, t.M, t.S, t.L));
}
function Ot(t, e, n) {
  return { y: t, m: e, d: n, H: 0, M: 0, S: 0, L: 0 };
}
function bs(t) {
  var e = t.dateTime, n = t.date, r = t.time, i = t.periods, o = t.days, a = t.shortDays, u = t.months, c = t.shortMonths, s = It(i), l = Rt(i), f = It(o), h = Rt(o), d = It(a), k = Rt(a), E = It(u), Y = Rt(u), L = It(c), A = Rt(c), S = {
    a: D,
    A: $,
    b: F,
    B: O,
    c: null,
    d: jn,
    e: jn,
    f: Bs,
    g: nu,
    G: iu,
    H: zs,
    I: qs,
    j: Vs,
    L: Er,
    m: Xs,
    M: Zs,
    p: W,
    q: V,
    Q: nr,
    s: rr,
    S: Gs,
    u: Js,
    U: Qs,
    V: Ks,
    w: js,
    W: tu,
    x: null,
    X: null,
    y: eu,
    Y: ru,
    Z: ou,
    "%": er
  }, p = {
    a: X,
    A: Z,
    b: K,
    B: st,
    c: null,
    d: tr,
    e: tr,
    f: cu,
    g: xu,
    G: _u,
    H: au,
    I: su,
    j: uu,
    L: Or,
    m: lu,
    M: fu,
    p: Q,
    q: ut,
    Q: nr,
    s: rr,
    S: hu,
    u: du,
    U: gu,
    V: mu,
    w: pu,
    W: yu,
    x: null,
    X: null,
    y: wu,
    Y: vu,
    Z: Mu,
    "%": er
  }, b = {
    a: C,
    A: m,
    b: H,
    B: P,
    c: T,
    d: Qn,
    e: Qn,
    f: Rs,
    g: Jn,
    G: Gn,
    H: Kn,
    I: Kn,
    j: Es,
    L: Is,
    m: Ys,
    M: Hs,
    p: N,
    q: Us,
    Q: Ps,
    s: Ws,
    S: Os,
    u: Cs,
    U: As,
    V: Ds,
    w: Ss,
    W: Ns,
    x: _,
    X: M,
    y: Jn,
    Y: Gn,
    Z: Fs,
    "%": Ls
  };
  S.x = g(n, S), S.X = g(r, S), S.c = g(e, S), p.x = g(n, p), p.X = g(r, p), p.c = g(e, p);
  function g(v, U) {
    return function(I) {
      var x = [], B = -1, q = 0, et = v.length, nt, wt, bn;
      for (I instanceof Date || (I = /* @__PURE__ */ new Date(+I)); ++B < et; )
        v.charCodeAt(B) === 37 && (x.push(v.slice(q, B)), (wt = Zn[nt = v.charAt(++B)]) != null ? nt = v.charAt(++B) : wt = nt === "e" ? " " : "0", (bn = U[nt]) && (nt = bn(I, wt)), x.push(nt), q = B + 1);
      return x.push(v.slice(q, B)), x.join("");
    };
  }
  function y(v, U) {
    return function(I) {
      var x = Ot(1900, void 0, 1), B = w(x, v, I += "", 0), q, et;
      if (B != I.length) return null;
      if ("Q" in x) return new Date(x.Q);
      if ("s" in x) return new Date(x.s * 1e3 + ("L" in x ? x.L : 0));
      if (U && !("Z" in x) && (x.Z = 0), "p" in x && (x.H = x.H % 12 + x.p * 12), x.m === void 0 && (x.m = "q" in x ? x.q : 0), "V" in x) {
        if (x.V < 1 || x.V > 53) return null;
        "w" in x || (x.w = 1), "Z" in x ? (q = Le(Ot(x.y, 0, 1)), et = q.getUTCDay(), q = et > 4 || et === 0 ? _e.ceil(q) : _e(q), q = gn.offset(q, (x.V - 1) * 7), x.y = q.getUTCFullYear(), x.m = q.getUTCMonth(), x.d = q.getUTCDate() + (x.w + 6) % 7) : (q = Re(Ot(x.y, 0, 1)), et = q.getDay(), q = et > 4 || et === 0 ? ve.ceil(q) : ve(q), q = jt.offset(q, (x.V - 1) * 7), x.y = q.getFullYear(), x.m = q.getMonth(), x.d = q.getDate() + (x.w + 6) % 7);
      } else ("W" in x || "U" in x) && ("w" in x || (x.w = "u" in x ? x.u % 7 : "W" in x ? 1 : 0), et = "Z" in x ? Le(Ot(x.y, 0, 1)).getUTCDay() : Re(Ot(x.y, 0, 1)).getDay(), x.m = 0, x.d = "W" in x ? (x.w + 6) % 7 + x.W * 7 - (et + 5) % 7 : x.w + x.U * 7 - (et + 6) % 7);
      return "Z" in x ? (x.H += x.Z / 100 | 0, x.M += x.Z % 100, Le(x)) : Re(x);
    };
  }
  function w(v, U, I, x) {
    for (var B = 0, q = U.length, et = I.length, nt, wt; B < q; ) {
      if (x >= et) return -1;
      if (nt = U.charCodeAt(B++), nt === 37) {
        if (nt = U.charAt(B++), wt = b[nt in Zn ? U.charAt(B++) : nt], !wt || (x = wt(v, I, x)) < 0) return -1;
      } else if (nt != I.charCodeAt(x++))
        return -1;
    }
    return x;
  }
  function N(v, U, I) {
    var x = s.exec(U.slice(I));
    return x ? (v.p = l.get(x[0].toLowerCase()), I + x[0].length) : -1;
  }
  function C(v, U, I) {
    var x = d.exec(U.slice(I));
    return x ? (v.w = k.get(x[0].toLowerCase()), I + x[0].length) : -1;
  }
  function m(v, U, I) {
    var x = f.exec(U.slice(I));
    return x ? (v.w = h.get(x[0].toLowerCase()), I + x[0].length) : -1;
  }
  function H(v, U, I) {
    var x = L.exec(U.slice(I));
    return x ? (v.m = A.get(x[0].toLowerCase()), I + x[0].length) : -1;
  }
  function P(v, U, I) {
    var x = E.exec(U.slice(I));
    return x ? (v.m = Y.get(x[0].toLowerCase()), I + x[0].length) : -1;
  }
  function T(v, U, I) {
    return w(v, e, U, I);
  }
  function _(v, U, I) {
    return w(v, n, U, I);
  }
  function M(v, U, I) {
    return w(v, r, U, I);
  }
  function D(v) {
    return a[v.getDay()];
  }
  function $(v) {
    return o[v.getDay()];
  }
  function F(v) {
    return c[v.getMonth()];
  }
  function O(v) {
    return u[v.getMonth()];
  }
  function W(v) {
    return i[+(v.getHours() >= 12)];
  }
  function V(v) {
    return 1 + ~~(v.getMonth() / 3);
  }
  function X(v) {
    return a[v.getUTCDay()];
  }
  function Z(v) {
    return o[v.getUTCDay()];
  }
  function K(v) {
    return c[v.getUTCMonth()];
  }
  function st(v) {
    return u[v.getUTCMonth()];
  }
  function Q(v) {
    return i[+(v.getUTCHours() >= 12)];
  }
  function ut(v) {
    return 1 + ~~(v.getUTCMonth() / 3);
  }
  return {
    format: function(v) {
      var U = g(v += "", S);
      return U.toString = function() {
        return v;
      }, U;
    },
    parse: function(v) {
      var U = y(v += "", !1);
      return U.toString = function() {
        return v;
      }, U;
    },
    utcFormat: function(v) {
      var U = g(v += "", p);
      return U.toString = function() {
        return v;
      }, U;
    },
    utcParse: function(v) {
      var U = y(v += "", !0);
      return U.toString = function() {
        return v;
      }, U;
    }
  };
}
var Zn = { "-": "", _: " ", 0: "0" }, J = /^\s*\d+/, $s = /^%/, ks = /[\\^$*+?|[\]().{}]/g;
function z(t, e, n) {
  var r = t < 0 ? "-" : "", i = (r ? -t : t) + "", o = i.length;
  return r + (o < n ? new Array(n - o + 1).join(e) + i : i);
}
function Ts(t) {
  return t.replace(ks, "\\$&");
}
function It(t) {
  return new RegExp("^(?:" + t.map(Ts).join("|") + ")", "i");
}
function Rt(t) {
  return new Map(t.map((e, n) => [e.toLowerCase(), n]));
}
function Ss(t, e, n) {
  var r = J.exec(e.slice(n, n + 1));
  return r ? (t.w = +r[0], n + r[0].length) : -1;
}
function Cs(t, e, n) {
  var r = J.exec(e.slice(n, n + 1));
  return r ? (t.u = +r[0], n + r[0].length) : -1;
}
function As(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.U = +r[0], n + r[0].length) : -1;
}
function Ds(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.V = +r[0], n + r[0].length) : -1;
}
function Ns(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.W = +r[0], n + r[0].length) : -1;
}
function Gn(t, e, n) {
  var r = J.exec(e.slice(n, n + 4));
  return r ? (t.y = +r[0], n + r[0].length) : -1;
}
function Jn(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.y = +r[0] + (+r[0] > 68 ? 1900 : 2e3), n + r[0].length) : -1;
}
function Fs(t, e, n) {
  var r = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(e.slice(n, n + 6));
  return r ? (t.Z = r[1] ? 0 : -(r[2] + (r[3] || "00")), n + r[0].length) : -1;
}
function Us(t, e, n) {
  var r = J.exec(e.slice(n, n + 1));
  return r ? (t.q = r[0] * 3 - 3, n + r[0].length) : -1;
}
function Ys(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.m = r[0] - 1, n + r[0].length) : -1;
}
function Qn(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.d = +r[0], n + r[0].length) : -1;
}
function Es(t, e, n) {
  var r = J.exec(e.slice(n, n + 3));
  return r ? (t.m = 0, t.d = +r[0], n + r[0].length) : -1;
}
function Kn(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.H = +r[0], n + r[0].length) : -1;
}
function Hs(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.M = +r[0], n + r[0].length) : -1;
}
function Os(t, e, n) {
  var r = J.exec(e.slice(n, n + 2));
  return r ? (t.S = +r[0], n + r[0].length) : -1;
}
function Is(t, e, n) {
  var r = J.exec(e.slice(n, n + 3));
  return r ? (t.L = +r[0], n + r[0].length) : -1;
}
function Rs(t, e, n) {
  var r = J.exec(e.slice(n, n + 6));
  return r ? (t.L = Math.floor(r[0] / 1e3), n + r[0].length) : -1;
}
function Ls(t, e, n) {
  var r = $s.exec(e.slice(n, n + 1));
  return r ? n + r[0].length : -1;
}
function Ps(t, e, n) {
  var r = J.exec(e.slice(n));
  return r ? (t.Q = +r[0], n + r[0].length) : -1;
}
function Ws(t, e, n) {
  var r = J.exec(e.slice(n));
  return r ? (t.s = +r[0], n + r[0].length) : -1;
}
function jn(t, e) {
  return z(t.getDate(), e, 2);
}
function zs(t, e) {
  return z(t.getHours(), e, 2);
}
function qs(t, e) {
  return z(t.getHours() % 12 || 12, e, 2);
}
function Vs(t, e) {
  return z(1 + jt.count(yt(t), t), e, 3);
}
function Er(t, e) {
  return z(t.getMilliseconds(), e, 3);
}
function Bs(t, e) {
  return Er(t, e) + "000";
}
function Xs(t, e) {
  return z(t.getMonth() + 1, e, 2);
}
function Zs(t, e) {
  return z(t.getMinutes(), e, 2);
}
function Gs(t, e) {
  return z(t.getSeconds(), e, 2);
}
function Js(t) {
  var e = t.getDay();
  return e === 0 ? 7 : e;
}
function Qs(t, e) {
  return z(Ae.count(yt(t) - 1, t), e, 2);
}
function Hr(t) {
  var e = t.getDay();
  return e >= 4 || e === 0 ? Yt(t) : Yt.ceil(t);
}
function Ks(t, e) {
  return t = Hr(t), z(Yt.count(yt(t), t) + (yt(t).getDay() === 4), e, 2);
}
function js(t) {
  return t.getDay();
}
function tu(t, e) {
  return z(ve.count(yt(t) - 1, t), e, 2);
}
function eu(t, e) {
  return z(t.getFullYear() % 100, e, 2);
}
function nu(t, e) {
  return t = Hr(t), z(t.getFullYear() % 100, e, 2);
}
function ru(t, e) {
  return z(t.getFullYear() % 1e4, e, 4);
}
function iu(t, e) {
  var n = t.getDay();
  return t = n >= 4 || n === 0 ? Yt(t) : Yt.ceil(t), z(t.getFullYear() % 1e4, e, 4);
}
function ou(t) {
  var e = t.getTimezoneOffset();
  return (e > 0 ? "-" : (e *= -1, "+")) + z(e / 60 | 0, "0", 2) + z(e % 60, "0", 2);
}
function tr(t, e) {
  return z(t.getUTCDate(), e, 2);
}
function au(t, e) {
  return z(t.getUTCHours(), e, 2);
}
function su(t, e) {
  return z(t.getUTCHours() % 12 || 12, e, 2);
}
function uu(t, e) {
  return z(1 + gn.count(Mt(t), t), e, 3);
}
function Or(t, e) {
  return z(t.getUTCMilliseconds(), e, 3);
}
function cu(t, e) {
  return Or(t, e) + "000";
}
function lu(t, e) {
  return z(t.getUTCMonth() + 1, e, 2);
}
function fu(t, e) {
  return z(t.getUTCMinutes(), e, 2);
}
function hu(t, e) {
  return z(t.getUTCSeconds(), e, 2);
}
function du(t) {
  var e = t.getUTCDay();
  return e === 0 ? 7 : e;
}
function gu(t, e) {
  return z(Yr.count(Mt(t) - 1, t), e, 2);
}
function Ir(t) {
  var e = t.getUTCDay();
  return e >= 4 || e === 0 ? Et(t) : Et.ceil(t);
}
function mu(t, e) {
  return t = Ir(t), z(Et.count(Mt(t), t) + (Mt(t).getUTCDay() === 4), e, 2);
}
function pu(t) {
  return t.getUTCDay();
}
function yu(t, e) {
  return z(_e.count(Mt(t) - 1, t), e, 2);
}
function wu(t, e) {
  return z(t.getUTCFullYear() % 100, e, 2);
}
function xu(t, e) {
  return t = Ir(t), z(t.getUTCFullYear() % 100, e, 2);
}
function vu(t, e) {
  return z(t.getUTCFullYear() % 1e4, e, 4);
}
function _u(t, e) {
  var n = t.getUTCDay();
  return t = n >= 4 || n === 0 ? Et(t) : Et.ceil(t), z(t.getUTCFullYear() % 1e4, e, 4);
}
function Mu() {
  return "+0000";
}
function er() {
  return "%";
}
function nr(t) {
  return +t;
}
function rr(t) {
  return Math.floor(+t / 1e3);
}
var Tt, pn, Rr, Lr;
bu({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function bu(t) {
  return Tt = bs(t), pn = Tt.format, Tt.parse, Rr = Tt.utcFormat, Lr = Tt.utcParse, Tt;
}
var Pr = "%Y-%m-%dT%H:%M:%S.%LZ";
function $u(t) {
  return t.toISOString();
}
Date.prototype.toISOString || Rr(Pr);
function ku(t) {
  var e = new Date(t);
  return isNaN(e) ? null : e;
}
var Tu = +/* @__PURE__ */ new Date("2000-01-01T00:00:00.000Z") ? ku : Lr(Pr);
function Su(t) {
  return new Date(t);
}
function Cu(t) {
  return t instanceof Date ? +t : +/* @__PURE__ */ new Date(+t);
}
function Wr(t, e, n, r, i, o, a, u, c, s) {
  var l = Dr(), f = l.invert, h = l.domain, d = s(".%L"), k = s(":%S"), E = s("%I:%M"), Y = s("%I %p"), L = s("%a %d"), A = s("%b %d"), S = s("%B"), p = s("%Y");
  function b(g) {
    return (c(g) < g ? d : u(g) < g ? k : a(g) < g ? E : o(g) < g ? Y : r(g) < g ? i(g) < g ? L : A : n(g) < g ? S : p)(g);
  }
  return l.invert = function(g) {
    return new Date(f(g));
  }, l.domain = function(g) {
    return arguments.length ? h(Array.from(g, Cu)) : h().map(Su);
  }, l.ticks = function(g) {
    var y = h();
    return t(y[0], y[y.length - 1], g ?? 10);
  }, l.tickFormat = function(g, y) {
    return y == null ? b : s(y);
  }, l.nice = function(g) {
    var y = h();
    return (!g || typeof g.range != "function") && (g = e(y[0], y[y.length - 1], g ?? 10)), g ? h(ss(y, g)) : l;
  }, l.copy = function() {
    return Ar(l, Wr(t, e, n, r, i, o, a, u, c, s));
  }, l;
}
function Au() {
  return Ce.apply(Wr(_s, Ms, yt, mn, Ae, jt, dn, hn, Ct, pn).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
var Ht = 0, qt = 0, Lt = 0, zr = 1e3, Me, Vt, be = 0, bt = 0, De = 0, Jt = typeof performance == "object" && performance.now ? performance : Date, qr = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(t) {
  setTimeout(t, 17);
};
function yn() {
  return bt || (qr(Du), bt = Jt.now() + De);
}
function Du() {
  bt = 0;
}
function $e() {
  this._call = this._time = this._next = null;
}
$e.prototype = Vr.prototype = {
  constructor: $e,
  restart: function(t, e, n) {
    if (typeof t != "function") throw new TypeError("callback is not a function");
    n = (n == null ? yn() : +n) + (e == null ? 0 : +e), !this._next && Vt !== this && (Vt ? Vt._next = this : Me = this, Vt = this), this._call = t, this._time = n, Je();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Je());
  }
};
function Vr(t, e, n) {
  var r = new $e();
  return r.restart(t, e, n), r;
}
function Nu() {
  yn(), ++Ht;
  for (var t = Me, e; t; )
    (e = bt - t._time) >= 0 && t._call.call(void 0, e), t = t._next;
  --Ht;
}
function ir() {
  bt = (be = Jt.now()) + De, Ht = qt = 0;
  try {
    Nu();
  } finally {
    Ht = 0, Uu(), bt = 0;
  }
}
function Fu() {
  var t = Jt.now(), e = t - be;
  e > zr && (De -= e, be = t);
}
function Uu() {
  for (var t, e = Me, n, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), t = e, e = e._next) : (n = e._next, e._next = null, e = t ? t._next = n : Me = n);
  Vt = t, Je(r);
}
function Je(t) {
  if (!Ht) {
    qt && (qt = clearTimeout(qt));
    var e = t - bt;
    e > 24 ? (t < 1 / 0 && (qt = setTimeout(ir, t - Jt.now() - De)), Lt && (Lt = clearInterval(Lt))) : (Lt || (be = Jt.now(), Lt = setInterval(Fu, zr)), Ht = 1, qr(ir));
  }
}
function or(t, e, n) {
  var r = new $e();
  return e = e == null ? 0 : +e, r.restart((i) => {
    r.stop(), t(i + e);
  }, e, n), r;
}
var Yu = rn("start", "end", "cancel", "interrupt"), Eu = [], Br = 0, Qe = 1, Ke = 2, le = 3, ar = 4, je = 5, fe = 6;
function Ne(t, e, n, r, i, o) {
  var a = t.__transition;
  if (!a) t.__transition = {};
  else if (n in a) return;
  Hu(t, n, {
    name: e,
    index: r,
    // For context during callback.
    group: i,
    // For context during callback.
    on: Yu,
    tween: Eu,
    time: o.time,
    delay: o.delay,
    duration: o.duration,
    ease: o.ease,
    timer: null,
    state: Br
  });
}
function wn(t, e) {
  var n = at(t, e);
  if (n.state > Br) throw new Error("too late; already scheduled");
  return n;
}
function ft(t, e) {
  var n = at(t, e);
  if (n.state > le) throw new Error("too late; already running");
  return n;
}
function at(t, e) {
  var n = t.__transition;
  if (!n || !(n = n[e])) throw new Error("transition not found");
  return n;
}
function Hu(t, e, n) {
  var r = t.__transition, i;
  r[e] = n, n.timer = Vr(o, 0, n.time);
  function o(s) {
    n.state = Qe, n.timer.restart(a, n.delay, n.time), n.delay <= s && a(s - n.delay);
  }
  function a(s) {
    var l, f, h, d;
    if (n.state !== Qe) return c();
    for (l in r)
      if (d = r[l], d.name === n.name) {
        if (d.state === le) return or(a);
        d.state === ar ? (d.state = fe, d.timer.stop(), d.on.call("interrupt", t, t.__data__, d.index, d.group), delete r[l]) : +l < e && (d.state = fe, d.timer.stop(), d.on.call("cancel", t, t.__data__, d.index, d.group), delete r[l]);
      }
    if (or(function() {
      n.state === le && (n.state = ar, n.timer.restart(u, n.delay, n.time), u(s));
    }), n.state = Ke, n.on.call("start", t, t.__data__, n.index, n.group), n.state === Ke) {
      for (n.state = le, i = new Array(h = n.tween.length), l = 0, f = -1; l < h; ++l)
        (d = n.tween[l].value.call(t, t.__data__, n.index, n.group)) && (i[++f] = d);
      i.length = f + 1;
    }
  }
  function u(s) {
    for (var l = s < n.duration ? n.ease.call(null, s / n.duration) : (n.timer.restart(c), n.state = je, 1), f = -1, h = i.length; ++f < h; )
      i[f].call(t, l);
    n.state === je && (n.on.call("end", t, t.__data__, n.index, n.group), c());
  }
  function c() {
    n.state = fe, n.timer.stop(), delete r[e];
    for (var s in r) return;
    delete t.__transition;
  }
}
function Ou(t, e) {
  var n = t.__transition, r, i, o = !0, a;
  if (n) {
    e = e == null ? null : e + "";
    for (a in n) {
      if ((r = n[a]).name !== e) {
        o = !1;
        continue;
      }
      i = r.state > Ke && r.state < je, r.state = fe, r.timer.stop(), r.on.call(i ? "interrupt" : "cancel", t, t.__data__, r.index, r.group), delete n[a];
    }
    o && delete t.__transition;
  }
}
function Iu(t) {
  return this.each(function() {
    Ou(this, t);
  });
}
function Ru(t, e) {
  var n, r;
  return function() {
    var i = ft(this, t), o = i.tween;
    if (o !== n) {
      r = n = o;
      for (var a = 0, u = r.length; a < u; ++a)
        if (r[a].name === e) {
          r = r.slice(), r.splice(a, 1);
          break;
        }
    }
    i.tween = r;
  };
}
function Lu(t, e, n) {
  var r, i;
  if (typeof n != "function") throw new Error();
  return function() {
    var o = ft(this, t), a = o.tween;
    if (a !== r) {
      i = (r = a).slice();
      for (var u = { name: e, value: n }, c = 0, s = i.length; c < s; ++c)
        if (i[c].name === e) {
          i[c] = u;
          break;
        }
      c === s && i.push(u);
    }
    o.tween = i;
  };
}
function Pu(t, e) {
  var n = this._id;
  if (t += "", arguments.length < 2) {
    for (var r = at(this.node(), n).tween, i = 0, o = r.length, a; i < o; ++i)
      if ((a = r[i]).name === t)
        return a.value;
    return null;
  }
  return this.each((e == null ? Ru : Lu)(n, t, e));
}
function xn(t, e, n) {
  var r = t._id;
  return t.each(function() {
    var i = ft(this, r);
    (i.value || (i.value = {}))[e] = n.apply(this, arguments);
  }), function(i) {
    return at(i, r).value[e];
  };
}
function Xr(t, e) {
  var n;
  return (typeof e == "number" ? it : e instanceof _t ? pe : (n = _t(e)) ? (e = n, pe) : Tr)(t, e);
}
function Wu(t) {
  return function() {
    this.removeAttribute(t);
  };
}
function zu(t) {
  return function() {
    this.removeAttributeNS(t.space, t.local);
  };
}
function qu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttribute(t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Vu(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = this.getAttributeNS(t.space, t.local);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function Bu(t, e, n) {
  var r, i, o;
  return function() {
    var a, u = n(this), c;
    return u == null ? void this.removeAttribute(t) : (a = this.getAttribute(t), c = u + "", a === c ? null : a === r && c === i ? o : (i = c, o = e(r = a, u)));
  };
}
function Xu(t, e, n) {
  var r, i, o;
  return function() {
    var a, u = n(this), c;
    return u == null ? void this.removeAttributeNS(t.space, t.local) : (a = this.getAttributeNS(t.space, t.local), c = u + "", a === c ? null : a === r && c === i ? o : (i = c, o = e(r = a, u)));
  };
}
function Zu(t, e) {
  var n = Se(t), r = n === "transform" ? La : Xr;
  return this.attrTween(t, typeof e == "function" ? (n.local ? Xu : Bu)(n, r, xn(this, "attr." + t, e)) : e == null ? (n.local ? zu : Wu)(n) : (n.local ? Vu : qu)(n, r, e));
}
function Gu(t, e) {
  return function(n) {
    this.setAttribute(t, e.call(this, n));
  };
}
function Ju(t, e) {
  return function(n) {
    this.setAttributeNS(t.space, t.local, e.call(this, n));
  };
}
function Qu(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Ju(t, o)), n;
  }
  return i._value = e, i;
}
function Ku(t, e) {
  var n, r;
  function i() {
    var o = e.apply(this, arguments);
    return o !== r && (n = (r = o) && Gu(t, o)), n;
  }
  return i._value = e, i;
}
function ju(t, e) {
  var n = "attr." + t;
  if (arguments.length < 2) return (n = this.tween(n)) && n._value;
  if (e == null) return this.tween(n, null);
  if (typeof e != "function") throw new Error();
  var r = Se(t);
  return this.tween(n, (r.local ? Qu : Ku)(r, e));
}
function tc(t, e) {
  return function() {
    wn(this, t).delay = +e.apply(this, arguments);
  };
}
function ec(t, e) {
  return e = +e, function() {
    wn(this, t).delay = e;
  };
}
function nc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? tc : ec)(e, t)) : at(this.node(), e).delay;
}
function rc(t, e) {
  return function() {
    ft(this, t).duration = +e.apply(this, arguments);
  };
}
function ic(t, e) {
  return e = +e, function() {
    ft(this, t).duration = e;
  };
}
function oc(t) {
  var e = this._id;
  return arguments.length ? this.each((typeof t == "function" ? rc : ic)(e, t)) : at(this.node(), e).duration;
}
function ac(t, e) {
  if (typeof e != "function") throw new Error();
  return function() {
    ft(this, t).ease = e;
  };
}
function sc(t) {
  var e = this._id;
  return arguments.length ? this.each(ac(e, t)) : at(this.node(), e).ease;
}
function uc(t, e) {
  return function() {
    var n = e.apply(this, arguments);
    if (typeof n != "function") throw new Error();
    ft(this, t).ease = n;
  };
}
function cc(t) {
  if (typeof t != "function") throw new Error();
  return this.each(uc(this._id, t));
}
function lc(t) {
  typeof t != "function" && (t = mr(t));
  for (var e = this._groups, n = e.length, r = new Array(n), i = 0; i < n; ++i)
    for (var o = e[i], a = o.length, u = r[i] = [], c, s = 0; s < a; ++s)
      (c = o[s]) && t.call(c, c.__data__, s, o) && u.push(c);
  return new lt(r, this._parents, this._name, this._id);
}
function fc(t) {
  if (t._id !== this._id) throw new Error();
  for (var e = this._groups, n = t._groups, r = e.length, i = n.length, o = Math.min(r, i), a = new Array(r), u = 0; u < o; ++u)
    for (var c = e[u], s = n[u], l = c.length, f = a[u] = new Array(l), h, d = 0; d < l; ++d)
      (h = c[d] || s[d]) && (f[d] = h);
  for (; u < r; ++u)
    a[u] = e[u];
  return new lt(a, this._parents, this._name, this._id);
}
function hc(t) {
  return (t + "").trim().split(/^|\s+/).every(function(e) {
    var n = e.indexOf(".");
    return n >= 0 && (e = e.slice(0, n)), !e || e === "start";
  });
}
function dc(t, e, n) {
  var r, i, o = hc(e) ? wn : ft;
  return function() {
    var a = o(this, t), u = a.on;
    u !== r && (i = (r = u).copy()).on(e, n), a.on = i;
  };
}
function gc(t, e) {
  var n = this._id;
  return arguments.length < 2 ? at(this.node(), n).on.on(t) : this.each(dc(n, t, e));
}
function mc(t) {
  return function() {
    var e = this.parentNode;
    for (var n in this.__transition) if (+n !== t) return;
    e && e.removeChild(this);
  };
}
function pc() {
  return this.on("end.remove", mc(this._id));
}
function yc(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = on(t));
  for (var r = this._groups, i = r.length, o = new Array(i), a = 0; a < i; ++a)
    for (var u = r[a], c = u.length, s = o[a] = new Array(c), l, f, h = 0; h < c; ++h)
      (l = u[h]) && (f = t.call(l, l.__data__, h, u)) && ("__data__" in l && (f.__data__ = l.__data__), s[h] = f, Ne(s[h], e, n, h, s, at(l, n)));
  return new lt(o, this._parents, e, n);
}
function wc(t) {
  var e = this._name, n = this._id;
  typeof t != "function" && (t = gr(t));
  for (var r = this._groups, i = r.length, o = [], a = [], u = 0; u < i; ++u)
    for (var c = r[u], s = c.length, l, f = 0; f < s; ++f)
      if (l = c[f]) {
        for (var h = t.call(l, l.__data__, f, c), d, k = at(l, n), E = 0, Y = h.length; E < Y; ++E)
          (d = h[E]) && Ne(d, e, n, E, h, k);
        o.push(h), a.push(l);
      }
  return new lt(o, a, e, n);
}
var xc = Kt.prototype.constructor;
function vc() {
  return new xc(this._groups, this._parents);
}
function _c(t, e) {
  var n, r, i;
  return function() {
    var o = Ft(this, t), a = (this.style.removeProperty(t), Ft(this, t));
    return o === a ? null : o === n && a === r ? i : i = e(n = o, r = a);
  };
}
function Zr(t) {
  return function() {
    this.style.removeProperty(t);
  };
}
function Mc(t, e, n) {
  var r, i = n + "", o;
  return function() {
    var a = Ft(this, t);
    return a === i ? null : a === r ? o : o = e(r = a, n);
  };
}
function bc(t, e, n) {
  var r, i, o;
  return function() {
    var a = Ft(this, t), u = n(this), c = u + "";
    return u == null && (c = u = (this.style.removeProperty(t), Ft(this, t))), a === c ? null : a === r && c === i ? o : (i = c, o = e(r = a, u));
  };
}
function $c(t, e) {
  var n, r, i, o = "style." + e, a = "end." + o, u;
  return function() {
    var c = ft(this, t), s = c.on, l = c.value[o] == null ? u || (u = Zr(e)) : void 0;
    (s !== n || i !== l) && (r = (n = s).copy()).on(a, i = l), c.on = r;
  };
}
function kc(t, e, n) {
  var r = (t += "") == "transform" ? Ra : Xr;
  return e == null ? this.styleTween(t, _c(t, r)).on("end.style." + t, Zr(t)) : typeof e == "function" ? this.styleTween(t, bc(t, r, xn(this, "style." + t, e))).each($c(this._id, t)) : this.styleTween(t, Mc(t, r, e), n).on("end.style." + t, null);
}
function Tc(t, e, n) {
  return function(r) {
    this.style.setProperty(t, e.call(this, r), n);
  };
}
function Sc(t, e, n) {
  var r, i;
  function o() {
    var a = e.apply(this, arguments);
    return a !== i && (r = (i = a) && Tc(t, a, n)), r;
  }
  return o._value = e, o;
}
function Cc(t, e, n) {
  var r = "style." + (t += "");
  if (arguments.length < 2) return (r = this.tween(r)) && r._value;
  if (e == null) return this.tween(r, null);
  if (typeof e != "function") throw new Error();
  return this.tween(r, Sc(t, e, n ?? ""));
}
function Ac(t) {
  return function() {
    this.textContent = t;
  };
}
function Dc(t) {
  return function() {
    var e = t(this);
    this.textContent = e ?? "";
  };
}
function Nc(t) {
  return this.tween("text", typeof t == "function" ? Dc(xn(this, "text", t)) : Ac(t == null ? "" : t + ""));
}
function Fc(t) {
  return function(e) {
    this.textContent = t.call(this, e);
  };
}
function Uc(t) {
  var e, n;
  function r() {
    var i = t.apply(this, arguments);
    return i !== n && (e = (n = i) && Fc(i)), e;
  }
  return r._value = t, r;
}
function Yc(t) {
  var e = "text";
  if (arguments.length < 1) return (e = this.tween(e)) && e._value;
  if (t == null) return this.tween(e, null);
  if (typeof t != "function") throw new Error();
  return this.tween(e, Uc(t));
}
function Ec() {
  for (var t = this._name, e = this._id, n = Gr(), r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, c, s = 0; s < u; ++s)
      if (c = a[s]) {
        var l = at(c, e);
        Ne(c, t, n, s, a, {
          time: l.time + l.delay + l.duration,
          delay: 0,
          duration: l.duration,
          ease: l.ease
        });
      }
  return new lt(r, this._parents, t, n);
}
function Hc() {
  var t, e, n = this, r = n._id, i = n.size();
  return new Promise(function(o, a) {
    var u = { value: a }, c = { value: function() {
      --i === 0 && o();
    } };
    n.each(function() {
      var s = ft(this, r), l = s.on;
      l !== t && (e = (t = l).copy(), e._.cancel.push(u), e._.interrupt.push(u), e._.end.push(c)), s.on = e;
    }), i === 0 && o();
  });
}
var Oc = 0;
function lt(t, e, n, r) {
  this._groups = t, this._parents = e, this._name = n, this._id = r;
}
function Gr() {
  return ++Oc;
}
var ht = Kt.prototype;
lt.prototype = {
  constructor: lt,
  select: yc,
  selectAll: wc,
  selectChild: ht.selectChild,
  selectChildren: ht.selectChildren,
  filter: lc,
  merge: fc,
  selection: vc,
  transition: Ec,
  call: ht.call,
  nodes: ht.nodes,
  node: ht.node,
  size: ht.size,
  empty: ht.empty,
  each: ht.each,
  on: gc,
  attr: Zu,
  attrTween: ju,
  style: kc,
  styleTween: Cc,
  text: Nc,
  textTween: Yc,
  remove: pc,
  tween: Pu,
  delay: nc,
  duration: oc,
  ease: sc,
  easeVarying: cc,
  end: Hc,
  [Symbol.iterator]: ht[Symbol.iterator]
};
function Ic(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}
var Rc = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: Ic
};
function Lc(t, e) {
  for (var n; !(n = t.__transition) || !(n = n[e]); )
    if (!(t = t.parentNode))
      throw new Error(`transition ${e} not found`);
  return n;
}
function Pc(t) {
  var e, n;
  t instanceof lt ? (e = t._id, t = t._name) : (e = Gr(), (n = Rc).time = yn(), t = t == null ? null : t + "");
  for (var r = this._groups, i = r.length, o = 0; o < i; ++o)
    for (var a = r[o], u = a.length, c, s = 0; s < u; ++s)
      (c = a[s]) && Ne(c, t, e, s, a, n || Lc(c, e));
  return new lt(r, this._parents, t, e);
}
Kt.prototype.interrupt = Iu;
Kt.prototype.transition = Pc;
var Wc = [null];
function cl(t, e) {
  var n = t.__transition, r, i;
  if (n) {
    e = e == null ? null : e + "";
    for (i in n)
      if ((r = n[i]).state > Qe && r.name === e)
        return new lt([[t]], Wc, e, +i);
  }
  return null;
}
const zc = "div.tooltip {        position: absolute;        text-align: center;        padding: 10px 20px 10px 10px; /* Extra padding on the right for the X button */        background: white;        border: 1px solid #AAA;        border-radius: 2px;        pointer-events: auto;        min-width: 150px; /* Minimum width to accommodate shorter text */        white-space: nowrap; /* Prevent text wrapping */      }      div.tooltip .close-btn {        position: absolute;        top: 5px;        right: 5px;        padding: 2px 5px;        cursor: pointer;        font-weight: bold;        color: #333;        font-size: 14px;      }      div.tooltip .close-btn:hover {        color: red;      }";
function Jr(t) {
  R("head").selectAll("#tooltip").data([1]).enter().append("style").attr("id", "tooltip").text(zc);
  let e;
  function n(o) {
    e && e.remove(), e = R("body").append("div").attr("class", "tooltip"), e.html(`<span class="close-btn">×</span>${t.apply(null, arguments)}`).style("opacity", 0.85).style("top", o.pageY - 60 + "px");
    const a = e.node().getBoundingClientRect().width;
    e.style("left", o.pageX - a / 2 + "px"), e.select(".close-btn").on("click", r), document.addEventListener("click", i);
  }
  function r() {
    e && (e.transition().duration(100).style("opacity", 0).remove(), e = null, document.removeEventListener("click", i));
  }
  function i(o) {
    const a = e && e.node().contains(o.target), u = o.target.tagName === "rect" && o.target.parentNode.classList.contains("task");
    !a && !u && r();
  }
  return { show: n, hide: r };
}
function qc(t) {
  return cr(t.nodes().map((e) => e.getComputedTextLength()));
}
function Vc(t) {
  return function(e) {
    return e.length > t ? e.slice(0, t - 1) + "…" : e;
  };
}
const Bt = 1, Bc = 2;
function Qr(t, e) {
  let n = ["#FFF", "#FFF"], r = Nt(n), i = 5, o, a = "#AAA", u = 40, c = 3e3, s;
  function l(f) {
    let h = e.domain(), d = Jr((b) => b), k = Nt(n), E = Nt(n.reverse()), Y = Vc(u), L = f.selectAll(".row").data(h, e).order(), A = L.enter().append("g").attr("class", "row"), S = L.exit(), p = L.select("text");
    L = L.merge(A).attr("transform", (b) => "translate(0," + e(b) + ")"), S.remove(), A.append("rect").attr("y", 0.5).attr("width", c).attr("height", e.bandwidth()).attr("stroke", a).attr("stroke-width", 0.75).attr("fill", k), A.append("path").attr("stroke", E), p = p.merge(
      A.append("text").attr("y", e.bandwidth() / 2).attr("dy", "0.32em").on("mouseover", function(b, g) {
        R(this).text() != g && d.show(g);
      }).on("mouseout", d.hide)
    ).text(Y), s === void 0 && (s = qc(p) + 2 * i, s = t === Bt ? c - s : s), o = t === Bt ? [0, s] : [s, c], p.attr("text-anchor", t === Bt ? "start" : "end").attr("dx", t === Bt ? i : -i).attr("x", s), f.selectAll("g.y.axis > path").data([1]).join("path").attr("stroke", a).attr("stroke-width", 1.75).attr("d", "M" + (s + 0.5) + ",0.5V" + e.range()[1]);
  }
  return l.draw_ticks = function(f, h) {
    f.selectAll(".row").select("path").attr("d", h.map((d) => "M" + d + ",1v" + (e.bandwidth() - 1)).join(""));
  }, l.scale = function(f) {
    return arguments.length ? (e = f, l) : e;
  }, l.width = function(f) {
    return arguments.length ? (c = f, l) : c;
  }, l.colors = function(f) {
    return arguments.length ? (n = f, l) : n;
  }, l.padding = function(f) {
    return arguments.length ? (i = f, l) : i;
  }, l.range = function(f) {
    return arguments.length ? (o = f, l) : o;
  }, l.trim = function(f) {
    return arguments.length ? (u = f, l) : u;
  }, l.offset = function(f) {
    return arguments.length ? (s = f, l) : s;
  }, l.colorscale = function(f) {
    return arguments.length ? (r = f, l) : r;
  }, l;
}
function Xc(t) {
  return Qr(Bc, t);
}
function Zc(t) {
  return Qr(Bt, t);
}
var vn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function _n(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Kr = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(vn, function() {
    var n = 1e3, r = 6e4, i = 36e5, o = "millisecond", a = "second", u = "minute", c = "hour", s = "day", l = "week", f = "month", h = "quarter", d = "year", k = "date", E = "Invalid Date", Y = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, L = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, A = { name: "en", weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"), months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"), ordinal: function(T) {
      var _ = ["th", "st", "nd", "rd"], M = T % 100;
      return "[" + T + (_[(M - 20) % 10] || _[M] || _[0]) + "]";
    } }, S = function(T, _, M) {
      var D = String(T);
      return !D || D.length >= _ ? T : "" + Array(_ + 1 - D.length).join(M) + T;
    }, p = { s: S, z: function(T) {
      var _ = -T.utcOffset(), M = Math.abs(_), D = Math.floor(M / 60), $ = M % 60;
      return (_ <= 0 ? "+" : "-") + S(D, 2, "0") + ":" + S($, 2, "0");
    }, m: function T(_, M) {
      if (_.date() < M.date()) return -T(M, _);
      var D = 12 * (M.year() - _.year()) + (M.month() - _.month()), $ = _.clone().add(D, f), F = M - $ < 0, O = _.clone().add(D + (F ? -1 : 1), f);
      return +(-(D + (M - $) / (F ? $ - O : O - $)) || 0);
    }, a: function(T) {
      return T < 0 ? Math.ceil(T) || 0 : Math.floor(T);
    }, p: function(T) {
      return { M: f, y: d, w: l, d: s, D: k, h: c, m: u, s: a, ms: o, Q: h }[T] || String(T || "").toLowerCase().replace(/s$/, "");
    }, u: function(T) {
      return T === void 0;
    } }, b = "en", g = {};
    g[b] = A;
    var y = "$isDayjsObject", w = function(T) {
      return T instanceof H || !(!T || !T[y]);
    }, N = function T(_, M, D) {
      var $;
      if (!_) return b;
      if (typeof _ == "string") {
        var F = _.toLowerCase();
        g[F] && ($ = F), M && (g[F] = M, $ = F);
        var O = _.split("-");
        if (!$ && O.length > 1) return T(O[0]);
      } else {
        var W = _.name;
        g[W] = _, $ = W;
      }
      return !D && $ && (b = $), $ || !D && b;
    }, C = function(T, _) {
      if (w(T)) return T.clone();
      var M = typeof _ == "object" ? _ : {};
      return M.date = T, M.args = arguments, new H(M);
    }, m = p;
    m.l = N, m.i = w, m.w = function(T, _) {
      return C(T, { locale: _.$L, utc: _.$u, x: _.$x, $offset: _.$offset });
    };
    var H = function() {
      function T(M) {
        this.$L = N(M.locale, null, !0), this.parse(M), this.$x = this.$x || M.x || {}, this[y] = !0;
      }
      var _ = T.prototype;
      return _.parse = function(M) {
        this.$d = function(D) {
          var $ = D.date, F = D.utc;
          if ($ === null) return /* @__PURE__ */ new Date(NaN);
          if (m.u($)) return /* @__PURE__ */ new Date();
          if ($ instanceof Date) return new Date($);
          if (typeof $ == "string" && !/Z$/i.test($)) {
            var O = $.match(Y);
            if (O) {
              var W = O[2] - 1 || 0, V = (O[7] || "0").substring(0, 3);
              return F ? new Date(Date.UTC(O[1], W, O[3] || 1, O[4] || 0, O[5] || 0, O[6] || 0, V)) : new Date(O[1], W, O[3] || 1, O[4] || 0, O[5] || 0, O[6] || 0, V);
            }
          }
          return new Date($);
        }(M), this.init();
      }, _.init = function() {
        var M = this.$d;
        this.$y = M.getFullYear(), this.$M = M.getMonth(), this.$D = M.getDate(), this.$W = M.getDay(), this.$H = M.getHours(), this.$m = M.getMinutes(), this.$s = M.getSeconds(), this.$ms = M.getMilliseconds();
      }, _.$utils = function() {
        return m;
      }, _.isValid = function() {
        return this.$d.toString() !== E;
      }, _.isSame = function(M, D) {
        var $ = C(M);
        return this.startOf(D) <= $ && $ <= this.endOf(D);
      }, _.isAfter = function(M, D) {
        return C(M) < this.startOf(D);
      }, _.isBefore = function(M, D) {
        return this.endOf(D) < C(M);
      }, _.$g = function(M, D, $) {
        return m.u(M) ? this[D] : this.set($, M);
      }, _.unix = function() {
        return Math.floor(this.valueOf() / 1e3);
      }, _.valueOf = function() {
        return this.$d.getTime();
      }, _.startOf = function(M, D) {
        var $ = this, F = !!m.u(D) || D, O = m.p(M), W = function(v, U) {
          var I = m.w($.$u ? Date.UTC($.$y, U, v) : new Date($.$y, U, v), $);
          return F ? I : I.endOf(s);
        }, V = function(v, U) {
          return m.w($.toDate()[v].apply($.toDate("s"), (F ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(U)), $);
        }, X = this.$W, Z = this.$M, K = this.$D, st = "set" + (this.$u ? "UTC" : "");
        switch (O) {
          case d:
            return F ? W(1, 0) : W(31, 11);
          case f:
            return F ? W(1, Z) : W(0, Z + 1);
          case l:
            var Q = this.$locale().weekStart || 0, ut = (X < Q ? X + 7 : X) - Q;
            return W(F ? K - ut : K + (6 - ut), Z);
          case s:
          case k:
            return V(st + "Hours", 0);
          case c:
            return V(st + "Minutes", 1);
          case u:
            return V(st + "Seconds", 2);
          case a:
            return V(st + "Milliseconds", 3);
          default:
            return this.clone();
        }
      }, _.endOf = function(M) {
        return this.startOf(M, !1);
      }, _.$set = function(M, D) {
        var $, F = m.p(M), O = "set" + (this.$u ? "UTC" : ""), W = ($ = {}, $[s] = O + "Date", $[k] = O + "Date", $[f] = O + "Month", $[d] = O + "FullYear", $[c] = O + "Hours", $[u] = O + "Minutes", $[a] = O + "Seconds", $[o] = O + "Milliseconds", $)[F], V = F === s ? this.$D + (D - this.$W) : D;
        if (F === f || F === d) {
          var X = this.clone().set(k, 1);
          X.$d[W](V), X.init(), this.$d = X.set(k, Math.min(this.$D, X.daysInMonth())).$d;
        } else W && this.$d[W](V);
        return this.init(), this;
      }, _.set = function(M, D) {
        return this.clone().$set(M, D);
      }, _.get = function(M) {
        return this[m.p(M)]();
      }, _.add = function(M, D) {
        var $, F = this;
        M = Number(M);
        var O = m.p(D), W = function(Z) {
          var K = C(F);
          return m.w(K.date(K.date() + Math.round(Z * M)), F);
        };
        if (O === f) return this.set(f, this.$M + M);
        if (O === d) return this.set(d, this.$y + M);
        if (O === s) return W(1);
        if (O === l) return W(7);
        var V = ($ = {}, $[u] = r, $[c] = i, $[a] = n, $)[O] || 1, X = this.$d.getTime() + M * V;
        return m.w(X, this);
      }, _.subtract = function(M, D) {
        return this.add(-1 * M, D);
      }, _.format = function(M) {
        var D = this, $ = this.$locale();
        if (!this.isValid()) return $.invalidDate || E;
        var F = M || "YYYY-MM-DDTHH:mm:ssZ", O = m.z(this), W = this.$H, V = this.$m, X = this.$M, Z = $.weekdays, K = $.months, st = $.meridiem, Q = function(U, I, x, B) {
          return U && (U[I] || U(D, F)) || x[I].slice(0, B);
        }, ut = function(U) {
          return m.s(W % 12 || 12, U, "0");
        }, v = st || function(U, I, x) {
          var B = U < 12 ? "AM" : "PM";
          return x ? B.toLowerCase() : B;
        };
        return F.replace(L, function(U, I) {
          return I || function(x) {
            switch (x) {
              case "YY":
                return String(D.$y).slice(-2);
              case "YYYY":
                return m.s(D.$y, 4, "0");
              case "M":
                return X + 1;
              case "MM":
                return m.s(X + 1, 2, "0");
              case "MMM":
                return Q($.monthsShort, X, K, 3);
              case "MMMM":
                return Q(K, X);
              case "D":
                return D.$D;
              case "DD":
                return m.s(D.$D, 2, "0");
              case "d":
                return String(D.$W);
              case "dd":
                return Q($.weekdaysMin, D.$W, Z, 2);
              case "ddd":
                return Q($.weekdaysShort, D.$W, Z, 3);
              case "dddd":
                return Z[D.$W];
              case "H":
                return String(W);
              case "HH":
                return m.s(W, 2, "0");
              case "h":
                return ut(1);
              case "hh":
                return ut(2);
              case "a":
                return v(W, V, !0);
              case "A":
                return v(W, V, !1);
              case "m":
                return String(V);
              case "mm":
                return m.s(V, 2, "0");
              case "s":
                return String(D.$s);
              case "ss":
                return m.s(D.$s, 2, "0");
              case "SSS":
                return m.s(D.$ms, 3, "0");
              case "Z":
                return O;
            }
            return null;
          }(U) || O.replace(":", "");
        });
      }, _.utcOffset = function() {
        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
      }, _.diff = function(M, D, $) {
        var F, O = this, W = m.p(D), V = C(M), X = (V.utcOffset() - this.utcOffset()) * r, Z = this - V, K = function() {
          return m.m(O, V);
        };
        switch (W) {
          case d:
            F = K() / 12;
            break;
          case f:
            F = K();
            break;
          case h:
            F = K() / 3;
            break;
          case l:
            F = (Z - X) / 6048e5;
            break;
          case s:
            F = (Z - X) / 864e5;
            break;
          case c:
            F = Z / i;
            break;
          case u:
            F = Z / r;
            break;
          case a:
            F = Z / n;
            break;
          default:
            F = Z;
        }
        return $ ? F : m.a(F);
      }, _.daysInMonth = function() {
        return this.endOf(f).$D;
      }, _.$locale = function() {
        return g[this.$L];
      }, _.locale = function(M, D) {
        if (!M) return this.$L;
        var $ = this.clone(), F = N(M, D, !0);
        return F && ($.$L = F), $;
      }, _.clone = function() {
        return m.w(this.$d, this);
      }, _.toDate = function() {
        return new Date(this.valueOf());
      }, _.toJSON = function() {
        return this.isValid() ? this.toISOString() : null;
      }, _.toISOString = function() {
        return this.$d.toISOString();
      }, _.toString = function() {
        return this.$d.toUTCString();
      }, T;
    }(), P = H.prototype;
    return C.prototype = P, [["$ms", o], ["$s", a], ["$m", u], ["$H", c], ["$W", s], ["$M", f], ["$y", d], ["$D", k]].forEach(function(T) {
      P[T[1]] = function(_) {
        return this.$g(_, T[0], T[1]);
      };
    }), C.extend = function(T, _) {
      return T.$i || (T(_, H, C), T.$i = !0), C;
    }, C.locale = N, C.isDayjs = w, C.unix = function(T) {
      return C(1e3 * T);
    }, C.en = g[b], C.Ls = g, C.p = {}, C;
  });
})(Kr);
var Gc = Kr.exports;
const Mn = /* @__PURE__ */ _n(Gc);
var jr = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(vn, function() {
    var n, r, i = 1e3, o = 6e4, a = 36e5, u = 864e5, c = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, s = 31536e6, l = 2628e6, f = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/, h = { years: s, months: l, days: u, hours: a, minutes: o, seconds: i, milliseconds: 1, weeks: 6048e5 }, d = function(g) {
      return g instanceof p;
    }, k = function(g, y, w) {
      return new p(g, w, y.$l);
    }, E = function(g) {
      return r.p(g) + "s";
    }, Y = function(g) {
      return g < 0;
    }, L = function(g) {
      return Y(g) ? Math.ceil(g) : Math.floor(g);
    }, A = function(g) {
      return Math.abs(g);
    }, S = function(g, y) {
      return g ? Y(g) ? { negative: !0, format: "" + A(g) + y } : { negative: !1, format: "" + g + y } : { negative: !1, format: "" };
    }, p = function() {
      function g(w, N, C) {
        var m = this;
        if (this.$d = {}, this.$l = C, w === void 0 && (this.$ms = 0, this.parseFromMilliseconds()), N) return k(w * h[E(N)], this);
        if (typeof w == "number") return this.$ms = w, this.parseFromMilliseconds(), this;
        if (typeof w == "object") return Object.keys(w).forEach(function(T) {
          m.$d[E(T)] = w[T];
        }), this.calMilliseconds(), this;
        if (typeof w == "string") {
          var H = w.match(f);
          if (H) {
            var P = H.slice(2).map(function(T) {
              return T != null ? Number(T) : 0;
            });
            return this.$d.years = P[0], this.$d.months = P[1], this.$d.weeks = P[2], this.$d.days = P[3], this.$d.hours = P[4], this.$d.minutes = P[5], this.$d.seconds = P[6], this.calMilliseconds(), this;
          }
        }
        return this;
      }
      var y = g.prototype;
      return y.calMilliseconds = function() {
        var w = this;
        this.$ms = Object.keys(this.$d).reduce(function(N, C) {
          return N + (w.$d[C] || 0) * h[C];
        }, 0);
      }, y.parseFromMilliseconds = function() {
        var w = this.$ms;
        this.$d.years = L(w / s), w %= s, this.$d.months = L(w / l), w %= l, this.$d.days = L(w / u), w %= u, this.$d.hours = L(w / a), w %= a, this.$d.minutes = L(w / o), w %= o, this.$d.seconds = L(w / i), w %= i, this.$d.milliseconds = w;
      }, y.toISOString = function() {
        var w = S(this.$d.years, "Y"), N = S(this.$d.months, "M"), C = +this.$d.days || 0;
        this.$d.weeks && (C += 7 * this.$d.weeks);
        var m = S(C, "D"), H = S(this.$d.hours, "H"), P = S(this.$d.minutes, "M"), T = this.$d.seconds || 0;
        this.$d.milliseconds && (T += this.$d.milliseconds / 1e3, T = Math.round(1e3 * T) / 1e3);
        var _ = S(T, "S"), M = w.negative || N.negative || m.negative || H.negative || P.negative || _.negative, D = H.format || P.format || _.format ? "T" : "", $ = (M ? "-" : "") + "P" + w.format + N.format + m.format + D + H.format + P.format + _.format;
        return $ === "P" || $ === "-P" ? "P0D" : $;
      }, y.toJSON = function() {
        return this.toISOString();
      }, y.format = function(w) {
        var N = w || "YYYY-MM-DDTHH:mm:ss", C = { Y: this.$d.years, YY: r.s(this.$d.years, 2, "0"), YYYY: r.s(this.$d.years, 4, "0"), M: this.$d.months, MM: r.s(this.$d.months, 2, "0"), D: this.$d.days, DD: r.s(this.$d.days, 2, "0"), H: this.$d.hours, HH: r.s(this.$d.hours, 2, "0"), m: this.$d.minutes, mm: r.s(this.$d.minutes, 2, "0"), s: this.$d.seconds, ss: r.s(this.$d.seconds, 2, "0"), SSS: r.s(this.$d.milliseconds, 3, "0") };
        return N.replace(c, function(m, H) {
          return H || String(C[m]);
        });
      }, y.as = function(w) {
        return this.$ms / h[E(w)];
      }, y.get = function(w) {
        var N = this.$ms, C = E(w);
        return C === "milliseconds" ? N %= 1e3 : N = C === "weeks" ? L(N / h[C]) : this.$d[C], N || 0;
      }, y.add = function(w, N, C) {
        var m;
        return m = N ? w * h[E(N)] : d(w) ? w.$ms : k(w, this).$ms, k(this.$ms + m * (C ? -1 : 1), this);
      }, y.subtract = function(w, N) {
        return this.add(w, N, !0);
      }, y.locale = function(w) {
        var N = this.clone();
        return N.$l = w, N;
      }, y.clone = function() {
        return k(this.$ms, this);
      }, y.humanize = function(w) {
        return n().add(this.$ms, "ms").locale(this.$l).fromNow(!w);
      }, y.valueOf = function() {
        return this.asMilliseconds();
      }, y.milliseconds = function() {
        return this.get("milliseconds");
      }, y.asMilliseconds = function() {
        return this.as("milliseconds");
      }, y.seconds = function() {
        return this.get("seconds");
      }, y.asSeconds = function() {
        return this.as("seconds");
      }, y.minutes = function() {
        return this.get("minutes");
      }, y.asMinutes = function() {
        return this.as("minutes");
      }, y.hours = function() {
        return this.get("hours");
      }, y.asHours = function() {
        return this.as("hours");
      }, y.days = function() {
        return this.get("days");
      }, y.asDays = function() {
        return this.as("days");
      }, y.weeks = function() {
        return this.get("weeks");
      }, y.asWeeks = function() {
        return this.as("weeks");
      }, y.months = function() {
        return this.get("months");
      }, y.asMonths = function() {
        return this.as("months");
      }, y.years = function() {
        return this.get("years");
      }, y.asYears = function() {
        return this.as("years");
      }, g;
    }(), b = function(g, y, w) {
      return g.add(y.years() * w, "y").add(y.months() * w, "M").add(y.days() * w, "d").add(y.hours() * w, "h").add(y.minutes() * w, "m").add(y.seconds() * w, "s").add(y.milliseconds() * w, "ms");
    };
    return function(g, y, w) {
      n = w, r = w().$utils(), w.duration = function(m, H) {
        var P = w.locale();
        return k(m, { $l: P }, H);
      }, w.isDuration = d;
      var N = y.prototype.add, C = y.prototype.subtract;
      y.prototype.add = function(m, H) {
        return d(m) ? b(this, m, 1) : N.bind(this)(m, H);
      }, y.prototype.subtract = function(m, H) {
        return d(m) ? b(this, m, -1) : C.bind(this)(m, H);
      };
    };
  });
})(jr);
var Jc = jr.exports;
const Qc = /* @__PURE__ */ _n(Jc);
var ti = { exports: {} };
(function(t, e) {
  (function(n, r) {
    t.exports = r();
  })(vn, function() {
    return function(n, r, i) {
      n = n || {};
      var o = r.prototype, a = { future: "in %s", past: "%s ago", s: "a few seconds", m: "a minute", mm: "%d minutes", h: "an hour", hh: "%d hours", d: "a day", dd: "%d days", M: "a month", MM: "%d months", y: "a year", yy: "%d years" };
      function u(s, l, f, h) {
        return o.fromToBase(s, l, f, h);
      }
      i.en.relativeTime = a, o.fromToBase = function(s, l, f, h, d) {
        for (var k, E, Y, L = f.$locale().relativeTime || a, A = n.thresholds || [{ l: "s", r: 44, d: "second" }, { l: "m", r: 89 }, { l: "mm", r: 44, d: "minute" }, { l: "h", r: 89 }, { l: "hh", r: 21, d: "hour" }, { l: "d", r: 35 }, { l: "dd", r: 25, d: "day" }, { l: "M", r: 45 }, { l: "MM", r: 10, d: "month" }, { l: "y", r: 17 }, { l: "yy", d: "year" }], S = A.length, p = 0; p < S; p += 1) {
          var b = A[p];
          b.d && (k = h ? i(s).diff(f, b.d, !0) : f.diff(s, b.d, !0));
          var g = (n.rounding || Math.round)(Math.abs(k));
          if (Y = k > 0, g <= b.r || !b.r) {
            g <= 1 && p > 0 && (b = A[p - 1]);
            var y = L[b.l];
            d && (g = d("" + g)), E = typeof y == "string" ? y.replace("%d", g) : y(g, l, b.l, Y);
            break;
          }
        }
        if (l) return E;
        var w = Y ? L.future : L.past;
        return typeof w == "function" ? w(E) : w.replace("%s", E);
      }, o.to = function(s, l) {
        return u(s, l, this, !0);
      }, o.from = function(s, l) {
        return u(s, l, this);
      };
      var c = function(s) {
        return s.$u ? i.utc() : i();
      };
      o.toNow = function(s) {
        return this.to(c(this), s);
      }, o.fromNow = function(s) {
        return this.from(c(this), s);
      };
    };
  });
})(ti);
var Kc = ti.exports;
const jc = /* @__PURE__ */ _n(Kc);
Mn.extend(Qc);
Mn.extend(jc);
function tl(t, e) {
  return Mn.duration(e - t).humanize();
}
function sr() {
  const t = Array.prototype.slice.call(arguments, 0);
  return function(e) {
    return t.reduce((n, r) => r(n), e);
  };
}
function oe(t) {
  return function(e) {
    return t === void 0 ? e : e[t];
  };
}
var ae = 0, Pt = 0;
const el = [
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
function nl(t) {
  const e = window.getComputedStyle(t, null).getPropertyValue("font-size");
  return parseFloat(e);
}
function ur(t) {
  const e = t.getFullYear(), n = String(t.getMonth() + 1).padStart(2, "0"), r = String(t.getDate()).padStart(2, "0");
  return `${e}${n}${r}`;
}
function Wt(t, e) {
  return "translate(" + t + "," + e + ")";
}
function rl() {
  document.querySelectorAll('g.task[class*=" --"]').forEach(function(e) {
    e.style.display = "none";
  });
}
function ke(t, e, n) {
  const i = R(t).attr("class");
  let o = !1;
  e.selectAll("g.row").each(function(A) {
    const p = R(this).attr("class");
    if (p == i)
      o = !0;
    else if (o) {
      let g = this.getAttribute("transform"), y = parseFloat(g.split("(")[1].split(",")[0].trim()), w = parseFloat(g.split(",")[1].split(")")[0].trim());
      this.setAttribute("transform", `translate(${y},${w + n})`);
      var b = p.split(" ")[1];
      document.querySelectorAll(`g.task.${b} rect`).forEach(function(m) {
        m.setAttribute("y", parseFloat(m.getAttribute("y")) + n);
      }), document.querySelectorAll(`g.task.${b} text`).forEach(function(m) {
        m.setAttribute("y", parseFloat(m.getAttribute("y")) + n);
      });
    }
  }), mt(".tick line").each(function() {
    const A = R(this), S = parseFloat(A.attr("y1"));
    isNaN(S) || A.attr("y1", S + n);
  });
  const a = document.querySelector('path[stroke-width="1.75"]');
  let c = a.getAttribute("d").match(/M([\d.-]+),([\d.-]+)V([\d.-]+)/), s = parseFloat(c[1]), l = parseFloat(c[2]), h = parseFloat(c[3]) + n;
  a.setAttribute("d", `M${s},${l}V${h}`);
  const d = R("g.x.axis.bottom-axis");
  let k = d.attr("transform"), E = parseFloat(k.split("(")[1].split(",")[0].trim()), L = parseFloat(k.split(",")[1].split(")")[0].trim()) + n;
  d.attr("transform", `translate(${E}, ${L})`);
}
function ei(t, e) {
  e.forEach(function(r) {
    document.querySelectorAll(`g.row.${r}`).forEach(function(o) {
      o.style.display = "block";
    });
  });
  const n = R(t).attr("class").split(" ")[1];
  mt(`g.task.${n}`).each(function(r) {
    var i = r[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
    if (i == n.replace(/--/g, ""))
      R(this).style("display", "none");
    else if (i != n.replace(/--/g, "")) {
      R(this).style("display", "block");
      var o = (e.indexOf(i) + 1) * 38;
      let a = R(this), u = a.attr("transform"), c = parseFloat(u.split("(")[1].split(",")[0].trim()), s = parseFloat(u.split(",")[1].split(")")[0].trim()), l = s + o;
      a.attr("transform", `translate(${c}, ${s})`).transition().duration(1e3).attr("transform", `translate(${c}, ${l})`).on("start", () => {
        mt(`g.task.${i}`).style("display", "none");
      }).on("end", () => {
        a.style("display", "none"), a.attr("transform", `translate(${c}, ${s})`), mt(`g.task.${i}`).style("display", "block");
      });
    }
  });
}
function ni(t, e) {
  return new Promise((n) => {
    const r = R(t).attr("class").split(" ")[1];
    mt(`g.task:not(.${r})`).each(function(i) {
      var o = i[1].replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
      if (e.includes(o)) {
        R(this).style("display", "block");
        var a = (e.indexOf(o) + 1) * 38;
        let u = R(this), c = u.attr("transform"), s = parseFloat(c.split("(")[1].split(",")[0].trim()), l = parseFloat(c.split(",")[1].split(")")[0].trim()), f = l - a;
        u.transition().duration(1e3).attr("transform", `translate(${s}, ${f})`).on("end", () => {
          mt(`g.${r}`).style("display", "block"), u.style("display", "none"), u.attr("transform", `translate(${s}, ${l})`), e.forEach(function(h) {
            document.querySelectorAll(`.${h}`).forEach(function(k) {
              k.style.display = "none";
            });
          }), n();
        });
      }
    });
  });
}
function Te(t, e) {
  const r = R(t).attr("class"), i = [];
  let o = !1, a = !1;
  return e.selectAll("g.row").each(function(u) {
    const s = R(this).attr("class");
    s == r ? o = !0 : o && s.split(" ")[2] == "timelineheader" ? a = !0 : o && !a && i.push(s.split(" ")[1]);
  }), i;
}
function il() {
  const t = document.getElementById("collapseAllButton");
  t.disabled = !0;
  let e = [];
  mt("g.row.timelineheader text").each(function() {
    if (R(this).text() === "-") {
      const r = this.parentNode, i = Te(r, R(r.parentNode)), o = i.length * 38;
      let a = ni(r, i).then(() => {
        ke(r, R(r.parentNode), -o), R(this).text("+").style("font-size", "20px");
      });
      e.push(a);
    }
  }), Promise.all(e).then(() => {
    t.disabled = !1;
  });
}
window.collapseAll = il;
function ol() {
  const t = document.getElementById("expandAllButton");
  t.disabled = !0;
  let e = [];
  mt("g.row.timelineheader text").each(function() {
    if (R(this).text() === "+") {
      const r = this.parentNode, i = Te(r, R(r.parentNode)), o = i.length * 38;
      let a = new Promise((u) => {
        ei(r, i), ke(r, R(r.parentNode), o), u();
      }).then(() => {
        R(this).text("-").style("font-size", "30px");
      });
      e.push(a);
    }
  }), Promise.all(e).then(() => {
    t.disabled = !1;
  });
}
window.expandAll = ol;
function ll(t) {
  let e = el, n = 5, r = 2, i = !1, o = !1, a, u, c = 0, s = oe(0), l = oe(1), f = oe(2), h = oe(3);
  console.log(t);
  function d(A, S) {
    const p = A.select("text"), b = A.select("rect"), g = b.attr("width") - 2 * n, y = l(S);
    p.text(y);
    let w = p.node().getComputedTextLength();
    if (w > g) {
      const N = g < 0 ? 0 : g / w, C = Math.floor(y.length * N);
      p.text(C > 2 ? y.slice(0, C - 2) + "…" : "");
    }
  }
  function k(A, S, p) {
    const b = A.select("text").node(), g = b.getBBox(), y = p.scale().domain().indexOf(s(S)), w = p.colorscale()(y), N = A.selectAll("rect.bckg").data([S]).join("rect").attr("class", "bckg").attr("fill", w).attr("x", g.x - n + r).attr("y", g.y - 2).attr("width", g.width + n - r).attr("height", g.height);
    A.node().insertBefore(N.node(), b);
  }
  function E(A, S) {
    A.each(function(p, b) {
      const g = R(this.parentNode);
      h(p) - f(p) ? d(g, p) : k(g, p, S);
    });
  }
  function Y(A) {
    const S = A.datum(), p = new Set(wi(S, s)), b = new Jr(L), g = Nt(e);
    a = a || [pi(S, f), cr(S, h)], o && (a = ui(a.concat(/* @__PURE__ */ new Date()))), A.each(function(y) {
      const w = u || this.getBoundingClientRect().width - 15, N = p.size * (nl(this) + 4 * n), C = $r().domain(p).range([0, N]), m = Au().domain(a), H = (i ? Zc : Xc)(C).width(w), P = R(this).selectAll("svg").data([1]).join("svg");
      P.attr("class", "timeline").attr("width", w).attr("height", N + 40);
      const T = P.append("g").attr("transform", "translate(0,20)"), _ = T.append("g").attr("class", "y axis").call(H);
      let $ = document.querySelector('path[stroke-width="1.75"]').getAttribute("d").match(/M([\d.-]+),([\d.-]+)V([\d.-]+)/), F = parseFloat($[1]);
      _.selectAll("text").on("mouseover", function() {
        R(this).style("text-decoration", "underline");
      }).on("mouseout", function() {
        R(this).style("text-decoration", "none");
      }).attr("text-anchor", function(v) {
        return v.startsWith(" •") ? "middle" : "end";
      }).attr("x", function(v) {
        return v.startsWith(" •") ? F / 2 : F - 0.5;
      }).style("cursor", "pointer").style("font-weight", function(v) {
        return v.startsWith(" •") ? "bold" : "normal";
      }).style("background", "none").on("click", function(v, U) {
        const x = U.replace(/ • /g, "").replace("Topic, ", "").replace(" ", "%20"), B = `https://www.primarysourcecoop.org/publications/${t}/search#q%3D%2Bsubject%3A%22${x}%22`;
        window.open(B, "_blank");
      }), _.selectAll("g.row").each(function(v) {
        const U = R(this).datum();
        R(this).classed(R(this).datum().replace(/•/g, "").replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, ""), !0), U.startsWith(" •") && R(this).classed("timelineheader", !0).append("text").attr("x", F - 10).attr("y", 25).text("-").style("text-anchor", "end").style("cursor", "pointer").style("font-size", "30px").attr("fill", "black").style("-ms-user-select", "none").style("-webkit-user-select", "none").style("user-select", "none");
      }), _.selectAll("g.row.timelineheader text").on("click", function(v, U) {
        const I = R(this).text();
        if (I === "+") {
          ae -= 1, Pt += 1, console.log("Collapsed: ", ae), console.log("Expanded: ", Pt);
          let x = Te(this.parentNode, _), B = x.length * 38;
          ei(this.parentNode, x), ke(this.parentNode, _, B), R(this).text() === "+" ? R(this).text("-").style("font-size", "30px") : R(this).text("+");
        } else if (I === "-") {
          ae += 1, Pt -= 1, console.log("Collapsed: ", ae), console.log("Expanded: ", Pt);
          let x = Te(this.parentNode, _), B = x.length * 38;
          ni(this.parentNode, x).then(() => {
            ke(this.parentNode, _, -B);
          }), R(this).text() === "-" ? R(this).text("+").style("font-size", "20px") : R(this).text("-");
        } else {
          const B = U.replace(/ • /g, "").replace("Topic, ", "").replace(" ", "%20"), q = `https://www.primarysourcecoop.org/publications/${t}/search#q%3D%2Bsubject%3A%22${B}%22`;
          window.open(q, "_blank");
        }
      }), Pt = mt("text").filter(function() {
        return this.textContent.startsWith(" •");
      }).size();
      let W = H.range();
      m.range([W[0] + n, W[1] - n]).clamp(!0);
      const V = Sn(m), X = T.append("g").attr("class", "x axis").attr("transform", Wt(0, 0)).call(V);
      X.selectAll(".tick text").attr("dy", "-1.5em"), X.selectAll(".tick line").attr("y2", "-5").attr("y1", N);
      const Z = Sn(m);
      P.append("g").attr("class", "x axis bottom-axis").attr("transform", Wt(0, N + 20)).call(Z).selectAll(".tick line").attr("y2", "5"), _.on("offset", () => {
        W = H.range(), m.range([W[0] + n, W[1] - n]).clamp(!0), V.ticks(Math.min((W[1] - W[0]) / 70, 10)), X.call(V), Q.attr("transform", (v) => Wt(m(f(v)), C(s(v)))).selectAll("rect").attr("width", (v) => m(h(v)) - m(f(v)) || r).call((v) => E(v, H)), _.call(H.draw_ticks, m.ticks().map(m));
      }), X.select(".domain").remove(), X.selectAll(".tick line").attr("stroke", "#AAA");
      const st = m.ticks().map(m);
      _.call(H.draw_ticks, st);
      let Q = T.selectAll("g.task").data(y);
      Q.exit().remove();
      const ut = Q.enter().append("g").classed("task", !0);
      ut.each(function(v) {
        const U = s(v).replace(/•/g, "").replace(/ /g, "-").replace(/[^a-zA-Z0-9-]/g, "");
        R(this).classed(U, !0);
      }).append("rect").style("opacity", 1).attr("y", n).style("cursor", "pointer").attr("height", C.bandwidth() - 2 * n).on("click", b.show).style("fill", sr(l, g)), Q = Q.merge(ut), Q.attr("transform", (v) => Wt(W[0], C(s(v)))).selectAll("rect").attr("width", 0), Q.transition().duration(c).attr("transform", (v) => Wt(m(f(v)), C(s(v)))).selectAll("rect").attr("width", (v) => m(h(v)) - m(f(v)) || r), o && T.append("path").attr("stroke", "red").attr("d", "M" + m(/* @__PURE__ */ new Date()) + ",0.5V" + N);
    }), rl();
  }
  return Y.dates = function(A) {
    return arguments.length ? (a = A, Y) : a;
  }, Y.width = function(A) {
    return arguments.length ? (u = A, Y) : u;
  }, Y.today = function(A) {
    return arguments.length ? (o = A, Y) : o;
  }, Y.colors = function(A) {
    return arguments.length ? (e = A, Y) : e;
  }, Y.padding = function(A) {
    return arguments.length ? (n = A, Y) : n;
  }, Y.milestone_width = function(A) {
    return arguments.length ? (r = A, Y) : r;
  }, Y.reversed = function(A) {
    return arguments.length ? (i = A, Y) : i;
  }, Y.duration = function(A) {
    return arguments.length ? (c = A, Y) : c;
  }, Y;
  function L(A, S) {
    const p = sr(Tu, pn("%Y")), b = `<b>${l(S)}</b><hr style="margin: 2px 0 2px 0">${p(f(S))}`, g = h(S) - f(S) ? ` - ${p(h(S))}, ${tl(f(S), h(S))}` : "";
    let w = String(S[1]).replace(/ /g, "%20").replace("Topic,%20", "");
    const N = ur(S[2]), C = ur(S[3]), H = `<br><a href="${`https://www.primarysourcecoop.org/publications/${t}/search#q%3D%2Bsubject%3A%22${w}%22%20%2Bdate_when%3A%5B${N}%20TO%20${C}%5D%7Crows=20%7Cstart=0%7Chl=true%7Chl.fl=text_merge%7Csort=date_when%20asc%7Cff=person_keyword;subject%7Cfl=id%20index%20title%20filename%20resource_group_name%20date_when%20date_to%20author%20recipient%20person_keyword%20subject%20doc_beginning`}" target="_blank">${S[4]} Docs</a>`;
    return `${b}${g}${H}`;
  }
}
export {
  cl as active,
  Sn as axisBottom,
  sl as axisLeft,
  al as axisRight,
  _t as color,
  ul as drag,
  tl as durationFormat,
  ui as extent,
  Tu as isoParse,
  wi as map,
  cr as max,
  pi as min,
  $r as scaleBand,
  as as scaleLinear,
  Nt as scaleOrdinal,
  Au as scaleTime,
  R as select,
  mt as selectAll,
  pn as timeFormat,
  ll as timeline,
  Xc as timelineAxisLeft,
  Zc as timelineAxisRight,
  Jr as tooltip
};
