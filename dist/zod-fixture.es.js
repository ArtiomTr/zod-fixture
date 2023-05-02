const zt = () => ({
  condition: ({ type: t }) => t === "array",
  generator: ({ length: t = 3, create: e }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    return Array.from({ length: t }, () => e());
  }
});
const Ut = (t = 1, e = 500) => {
  if (t > e)
    throw new Error(`min ${t} can't be greater max ${e}`);
  return {
    condition: ({ type: n, checks: r = {} }) => n === "bigint" && r.min === void 0 && r.max === void 0,
    generator: () => ft(t, e)
  };
}, Ne = () => ({
  condition: ({ type: t, checks: e = {} }) => t === "bigint" && (e.min !== void 0 || e.max !== void 0),
  generator: ({ checks: t = {} }) => {
    const e = t.min, n = t.max;
    if (e > n)
      throw new Error(`min ${e} can't be greater max ${n}`);
    const r = n ?? e + 500, a = e ?? r - 500;
    return ft(a, r);
  }
});
function ft(t, e) {
  return BigInt(Math.floor(Math.random() * (e - t + 1) + t));
}
const jt = () => {
  let t = !1;
  return {
    condition: ({ type: e }) => e === "boolean",
    generator: () => (t = !t, t)
  };
}, Zt = 1, Q = 500, Ht = (t = Zt, e = Q) => {
  if (t > e)
    throw new Error(`min ${t} can't be greater max ${e}`);
  return {
    condition: ({ type: n, checks: r = {} }) => n === "number" && r.min === void 0 && r.max === void 0,
    generator: () => Z(t, e)
  };
}, Nt = () => ({
  condition: ({ type: t, checks: e = {} }) => t === "number" && (e.min !== void 0 || e.max !== void 0),
  generator: ({ checks: t = {} }) => {
    const e = t.min, n = t.max;
    if (e > n)
      throw new Error(`min ${e} can't be greater max ${n}`);
    const r = n ?? e + Q, a = e ?? r - Q;
    return Z(a, r);
  }
});
function Z(t, e) {
  return Math.floor(Math.random() * (e - t + 1) + t);
}
const M = /* @__PURE__ */ new Date(), Rt = new Date(
  M.getUTCFullYear() - 2,
  M.getUTCMonth(),
  M.getUTCDate()
).getTime(), Vt = new Date(
  M.getUTCFullYear() + 2,
  M.getUTCMonth(),
  M.getUTCDate()
).getTime(), Dt = 31536e6, at = Dt * 2, Ft = (t = Rt, e = Vt) => {
  if (t > e)
    throw new Error(`min ${t} can't be greater max ${e}`);
  return {
    condition: ({ type: n, checks: r = {} }) => n === "date" && r.min === void 0 && r.max === void 0,
    generator: () => new Date(Z(t, e))
  };
}, Wt = () => ({
  condition: ({ type: t, checks: e = {} }) => t === "date" && (e.min !== void 0 || e.max !== void 0),
  generator: ({ checks: t = {} }) => {
    const e = t.min, n = t.max;
    if (e > n)
      throw new Error(`min ${e} can't be greater max ${n}`);
    const r = n ?? e + at, a = e ?? r - at;
    return new Date(Z(a, r));
  }
}), Pt = () => ({
  condition: ({ type: t }) => t === "object",
  generator: qt
});
function qt({
  shape: t
}) {
  return Object.entries(t).reduce((e, [n, r]) => ({
    ...e,
    [n]: r.create()
  }), {});
}
const Xt = ["null", "any", "unknown", "never"], Kt = () => ({
  condition: ({ type: t }) => Xt.includes(t),
  generator: () => null
});
var ut = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Yt(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var C = {}, p = {}, b = {};
Object.defineProperty(b, "__esModule", { value: !0 });
b.output = b.exists = b.hash = b.bytes = b.bool = b.number = void 0;
function D(t) {
  if (!Number.isSafeInteger(t) || t < 0)
    throw new Error(`Wrong positive integer: ${t}`);
}
b.number = D;
function ht(t) {
  if (typeof t != "boolean")
    throw new Error(`Expected boolean, not ${t}`);
}
b.bool = ht;
function rt(t, ...e) {
  if (!(t instanceof Uint8Array))
    throw new TypeError("Expected Uint8Array");
  if (e.length > 0 && !e.includes(t.length))
    throw new TypeError(`Expected Uint8Array of length ${e}, not of length=${t.length}`);
}
b.bytes = rt;
function gt(t) {
  if (typeof t != "function" || typeof t.create != "function")
    throw new Error("Hash should be wrapped by utils.wrapConstructor");
  D(t.outputLen), D(t.blockLen);
}
b.hash = gt;
function pt(t, e = !0) {
  if (t.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (e && t.finished)
    throw new Error("Hash#digest() has already been called");
}
b.exists = pt;
function yt(t, e) {
  rt(t);
  const n = e.outputLen;
  if (t.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
b.output = yt;
const Gt = {
  number: D,
  bool: ht,
  bytes: rt,
  hash: gt,
  exists: pt,
  output: yt
};
b.default = Gt;
var mt = {};
(function(t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.add = t.toBig = t.split = t.fromBig = void 0;
  const e = BigInt(2 ** 32 - 1), n = BigInt(32);
  function r(s, d = !1) {
    return d ? { h: Number(s & e), l: Number(s >> n & e) } : { h: Number(s >> n & e) | 0, l: Number(s & e) | 0 };
  }
  t.fromBig = r;
  function a(s, d = !1) {
    let c = new Uint32Array(s.length), _ = new Uint32Array(s.length);
    for (let x = 0; x < s.length; x++) {
      const { h: J, l: At } = r(s[x], d);
      [c[x], _[x]] = [J, At];
    }
    return [c, _];
  }
  t.split = a;
  const h = (s, d) => BigInt(s >>> 0) << n | BigInt(d >>> 0);
  t.toBig = h;
  const o = (s, d, c) => s >>> c, u = (s, d, c) => s << 32 - c | d >>> c, l = (s, d, c) => s >>> c | d << 32 - c, g = (s, d, c) => s << 32 - c | d >>> c, w = (s, d, c) => s << 64 - c | d >>> c - 32, $ = (s, d, c) => s >>> c - 32 | d << 64 - c, E = (s, d) => d, B = (s, d) => s, q = (s, d, c) => s << c | d >>> 32 - c, X = (s, d, c) => d << c | s >>> 32 - c, K = (s, d, c) => d << c - 32 | s >>> 64 - c, Y = (s, d, c) => s << c - 32 | d >>> 64 - c;
  function R(s, d, c, _) {
    const x = (d >>> 0) + (_ >>> 0);
    return { h: s + c + (x / 2 ** 32 | 0) | 0, l: x | 0 };
  }
  t.add = R;
  const G = (s, d, c) => (s >>> 0) + (d >>> 0) + (c >>> 0), i = (s, d, c, _) => d + c + _ + (s / 2 ** 32 | 0) | 0, f = (s, d, c, _) => (s >>> 0) + (d >>> 0) + (c >>> 0) + (_ >>> 0), y = (s, d, c, _, x) => d + c + _ + x + (s / 2 ** 32 | 0) | 0, m = (s, d, c, _, x) => (s >>> 0) + (d >>> 0) + (c >>> 0) + (_ >>> 0) + (x >>> 0), v = (s, d, c, _, x, J) => d + c + _ + x + J + (s / 2 ** 32 | 0) | 0, L = {
    fromBig: r,
    split: a,
    toBig: t.toBig,
    shrSH: o,
    shrSL: u,
    rotrSH: l,
    rotrSL: g,
    rotrBH: w,
    rotrBL: $,
    rotr32H: E,
    rotr32L: B,
    rotlSH: q,
    rotlSL: X,
    rotlBH: K,
    rotlBL: Y,
    add: R,
    add3L: G,
    add3H: i,
    add4L: f,
    add4H: y,
    add5H: v,
    add5L: m
  };
  t.default = L;
})(mt);
var wt = {}, P = {};
Object.defineProperty(P, "__esModule", { value: !0 });
P.crypto = void 0;
P.crypto = typeof globalThis == "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
(function(t) {
  /*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
  Object.defineProperty(t, "__esModule", { value: !0 }), t.randomBytes = t.wrapConstructorWithOpts = t.wrapConstructor = t.checkOpts = t.Hash = t.concatBytes = t.toBytes = t.utf8ToBytes = t.asyncLoop = t.nextTick = t.hexToBytes = t.bytesToHex = t.isLE = t.rotr = t.createView = t.u32 = t.u8 = void 0;
  const e = P, n = (i) => new Uint8Array(i.buffer, i.byteOffset, i.byteLength);
  t.u8 = n;
  const r = (i) => new Uint32Array(i.buffer, i.byteOffset, Math.floor(i.byteLength / 4));
  t.u32 = r;
  const a = (i) => new DataView(i.buffer, i.byteOffset, i.byteLength);
  t.createView = a;
  const h = (i, f) => i << 32 - f | i >>> f;
  if (t.rotr = h, t.isLE = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, !t.isLE)
    throw new Error("Non little-endian hardware is not supported");
  const o = Array.from({ length: 256 }, (i, f) => f.toString(16).padStart(2, "0"));
  function u(i) {
    if (!(i instanceof Uint8Array))
      throw new Error("Uint8Array expected");
    let f = "";
    for (let y = 0; y < i.length; y++)
      f += o[i[y]];
    return f;
  }
  t.bytesToHex = u;
  function l(i) {
    if (typeof i != "string")
      throw new TypeError("hexToBytes: expected string, got " + typeof i);
    if (i.length % 2)
      throw new Error("hexToBytes: received invalid unpadded hex");
    const f = new Uint8Array(i.length / 2);
    for (let y = 0; y < f.length; y++) {
      const m = y * 2, v = i.slice(m, m + 2), L = Number.parseInt(v, 16);
      if (Number.isNaN(L) || L < 0)
        throw new Error("Invalid byte sequence");
      f[y] = L;
    }
    return f;
  }
  t.hexToBytes = l;
  const g = async () => {
  };
  t.nextTick = g;
  async function w(i, f, y) {
    let m = Date.now();
    for (let v = 0; v < i; v++) {
      y(v);
      const L = Date.now() - m;
      L >= 0 && L < f || (await (0, t.nextTick)(), m += L);
    }
  }
  t.asyncLoop = w;
  function $(i) {
    if (typeof i != "string")
      throw new TypeError(`utf8ToBytes expected string, got ${typeof i}`);
    return new TextEncoder().encode(i);
  }
  t.utf8ToBytes = $;
  function E(i) {
    if (typeof i == "string" && (i = $(i)), !(i instanceof Uint8Array))
      throw new TypeError(`Expected input type is Uint8Array (got ${typeof i})`);
    return i;
  }
  t.toBytes = E;
  function B(...i) {
    if (!i.every((m) => m instanceof Uint8Array))
      throw new Error("Uint8Array list expected");
    if (i.length === 1)
      return i[0];
    const f = i.reduce((m, v) => m + v.length, 0), y = new Uint8Array(f);
    for (let m = 0, v = 0; m < i.length; m++) {
      const L = i[m];
      y.set(L, v), v += L.length;
    }
    return y;
  }
  t.concatBytes = B;
  class q {
    // Safe version that clones internal state
    clone() {
      return this._cloneInto();
    }
  }
  t.Hash = q;
  const X = (i) => Object.prototype.toString.call(i) === "[object Object]" && i.constructor === Object;
  function K(i, f) {
    if (f !== void 0 && (typeof f != "object" || !X(f)))
      throw new TypeError("Options should be object or undefined");
    return Object.assign(i, f);
  }
  t.checkOpts = K;
  function Y(i) {
    const f = (m) => i().update(E(m)).digest(), y = i();
    return f.outputLen = y.outputLen, f.blockLen = y.blockLen, f.create = () => i(), f;
  }
  t.wrapConstructor = Y;
  function R(i) {
    const f = (m, v) => i(v).update(E(m)).digest(), y = i({});
    return f.outputLen = y.outputLen, f.blockLen = y.blockLen, f.create = (m) => i(m), f;
  }
  t.wrapConstructorWithOpts = R;
  function G(i = 32) {
    if (e.crypto && typeof e.crypto.getRandomValues == "function")
      return e.crypto.getRandomValues(new Uint8Array(i));
    throw new Error("crypto.getRandomValues must be defined");
  }
  t.randomBytes = G;
})(wt);
Object.defineProperty(p, "__esModule", { value: !0 });
p.shake256 = p.shake128 = p.keccak_512 = p.keccak_384 = p.keccak_256 = p.keccak_224 = p.sha3_512 = p.sha3_384 = p.sha3_256 = p.sha3_224 = p.Keccak = p.keccakP = void 0;
const S = b, j = mt, z = wt, [bt, vt, _t] = [[], [], []], Jt = BigInt(0), I = BigInt(1), Qt = BigInt(2), te = BigInt(7), ee = BigInt(256), ne = BigInt(113);
for (let t = 0, e = I, n = 1, r = 0; t < 24; t++) {
  [n, r] = [r, (2 * n + 3 * r) % 5], bt.push(2 * (5 * r + n)), vt.push((t + 1) * (t + 2) / 2 % 64);
  let a = Jt;
  for (let h = 0; h < 7; h++)
    e = (e << I ^ (e >> te) * ne) % ee, e & Qt && (a ^= I << (I << BigInt(h)) - I);
  _t.push(a);
}
const [re, oe] = j.default.split(_t, !0), st = (t, e, n) => n > 32 ? j.default.rotlBH(t, e, n) : j.default.rotlSH(t, e, n), ct = (t, e, n) => n > 32 ? j.default.rotlBL(t, e, n) : j.default.rotlSL(t, e, n);
function xt(t, e = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - e; r < 24; r++) {
    for (let o = 0; o < 10; o++)
      n[o] = t[o] ^ t[o + 10] ^ t[o + 20] ^ t[o + 30] ^ t[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const u = (o + 8) % 10, l = (o + 2) % 10, g = n[l], w = n[l + 1], $ = st(g, w, 1) ^ n[u], E = ct(g, w, 1) ^ n[u + 1];
      for (let B = 0; B < 50; B += 10)
        t[o + B] ^= $, t[o + B + 1] ^= E;
    }
    let a = t[2], h = t[3];
    for (let o = 0; o < 24; o++) {
      const u = vt[o], l = st(a, h, u), g = ct(a, h, u), w = bt[o];
      a = t[w], h = t[w + 1], t[w] = l, t[w + 1] = g;
    }
    for (let o = 0; o < 50; o += 10) {
      for (let u = 0; u < 10; u++)
        n[u] = t[o + u];
      for (let u = 0; u < 10; u++)
        t[o + u] ^= ~n[(u + 2) % 10] & n[(u + 4) % 10];
    }
    t[0] ^= re[r], t[1] ^= oe[r];
  }
  n.fill(0);
}
p.keccakP = xt;
class H extends z.Hash {
  // NOTE: we accept arguments in bytes instead of bits here.
  constructor(e, n, r, a = !1, h = 24) {
    if (super(), this.blockLen = e, this.suffix = n, this.outputLen = r, this.enableXOF = a, this.rounds = h, this.pos = 0, this.posOut = 0, this.finished = !1, this.destroyed = !1, S.default.number(r), 0 >= this.blockLen || this.blockLen >= 200)
      throw new Error("Sha3 supports only keccak-f1600 function");
    this.state = new Uint8Array(200), this.state32 = (0, z.u32)(this.state);
  }
  keccak() {
    xt(this.state32, this.rounds), this.posOut = 0, this.pos = 0;
  }
  update(e) {
    S.default.exists(this);
    const { blockLen: n, state: r } = this;
    e = (0, z.toBytes)(e);
    const a = e.length;
    for (let h = 0; h < a; ) {
      const o = Math.min(n - this.pos, a - h);
      for (let u = 0; u < o; u++)
        r[this.pos++] ^= e[h++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished)
      return;
    this.finished = !0;
    const { state: e, suffix: n, pos: r, blockLen: a } = this;
    e[r] ^= n, n & 128 && r === a - 1 && this.keccak(), e[a - 1] ^= 128, this.keccak();
  }
  writeInto(e) {
    S.default.exists(this, !1), S.default.bytes(e), this.finish();
    const n = this.state, { blockLen: r } = this;
    for (let a = 0, h = e.length; a < h; ) {
      this.posOut >= r && this.keccak();
      const o = Math.min(r - this.posOut, h - a);
      e.set(n.subarray(this.posOut, this.posOut + o), a), this.posOut += o, a += o;
    }
    return e;
  }
  xofInto(e) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(e);
  }
  xof(e) {
    return S.default.number(e), this.xofInto(new Uint8Array(e));
  }
  digestInto(e) {
    if (S.default.output(e, this), this.finished)
      throw new Error("digest() was already called");
    return this.writeInto(e), this.destroy(), e;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    this.destroyed = !0, this.state.fill(0);
  }
  _cloneInto(e) {
    const { blockLen: n, suffix: r, outputLen: a, rounds: h, enableXOF: o } = this;
    return e || (e = new H(n, r, a, o, h)), e.state32.set(this.state32), e.pos = this.pos, e.posOut = this.posOut, e.finished = this.finished, e.rounds = h, e.suffix = r, e.outputLen = a, e.enableXOF = o, e.destroyed = this.destroyed, e;
  }
}
p.Keccak = H;
const O = (t, e, n) => (0, z.wrapConstructor)(() => new H(e, t, n));
p.sha3_224 = O(6, 144, 224 / 8);
p.sha3_256 = O(6, 136, 256 / 8);
p.sha3_384 = O(6, 104, 384 / 8);
p.sha3_512 = O(6, 72, 512 / 8);
p.keccak_224 = O(1, 144, 224 / 8);
p.keccak_256 = O(1, 136, 256 / 8);
p.keccak_384 = O(1, 104, 384 / 8);
p.keccak_512 = O(1, 72, 512 / 8);
const Tt = (t, e, n) => (0, z.wrapConstructorWithOpts)((r = {}) => new H(e, t, r.dkLen === void 0 ? n : r.dkLen, !0));
p.shake128 = Tt(31, 168, 128 / 8);
p.shake256 = Tt(31, 136, 256 / 8);
const { sha3_512: ie } = p, Lt = 24, U = 32, tt = (t = 4, e = Math.random) => {
  let n = "";
  for (; n.length < t; )
    n = n + Math.floor(e() * 36).toString(36);
  return n;
};
function kt(t) {
  let e = 8n, n = 0n;
  for (const r of t.values()) {
    const a = BigInt(r);
    n = (n << e) + a;
  }
  return n;
}
const $t = (t = "") => kt(ie(t)).toString(36).slice(1), dt = Array.from(
  { length: 26 },
  (t, e) => String.fromCharCode(e + 97)
), ae = (t) => dt[Math.floor(t() * dt.length)], Bt = ({
  globalObj: t = typeof ut < "u" ? ut : typeof window < "u" ? window : {}
} = {}) => {
  const e = Object.keys(t).toString(), n = e.length ? e + tt(U) : tt(U);
  return $t(n).substring(0, U);
}, Ct = (t) => () => t++, ue = 476782367, Ot = ({
  // Fallback if the user does not pass in a CSPRNG. This should be OK
  // because we don't rely solely on the random number generator for entropy.
  // We also use the host fingerprint, current time, and a session counter.
  random: t = Math.random,
  counter: e = Ct(Math.floor(t() * ue)),
  length: n = Lt,
  fingerprint: r = Bt()
} = {}) => function() {
  const h = ae(t), o = Date.now().toString(36), u = e().toString(36), l = tt(n, t), g = `${o + l + u + r}`;
  return `${h + $t(g).substring(1, n)}`;
}, se = Ot(), ce = (t, { minLength: e = 2, maxLength: n = U } = {}) => {
  const r = t.length, a = /^[0-9a-z]+$/;
  try {
    if (typeof t == "string" && r >= e && r <= n && a.test(t))
      return !0;
  } finally {
  }
  return !1;
};
C.getConstants = () => ({ defaultLength: Lt, bigLength: U });
C.init = Ot;
C.createId = se;
C.bufToBigInt = kt;
C.createCounter = Ct;
C.createFingerprint = Bt;
C.isCuid = ce;
const { createId: de, init: Re, getConstants: Ve, isCuid: De } = C;
var le = de, Et = function(e, n) {
  var r = "000000000" + e;
  return r.substr(r.length - n);
}, fe = Et, he = typeof window == "object" ? window : self, ge = Object.keys(he).length, pe = navigator.mimeTypes ? navigator.mimeTypes.length : 0, ye = fe((pe + navigator.userAgent.length).toString(36) + ge.toString(36), 4), me = function() {
  return ye;
}, et, lt = typeof window < "u" && (window.crypto || window.msCrypto) || typeof self < "u" && self.crypto;
if (lt) {
  var we = Math.pow(2, 32) - 1;
  et = function() {
    return Math.abs(lt.getRandomValues(new Uint32Array(1))[0] / we);
  };
} else
  et = Math.random;
var be = et, F = me, St = Et, ve = be, A = 0, ot = 4, W = 36, Mt = Math.pow(W, ot);
function nt() {
  return St((ve() * Mt << 0).toString(W), ot);
}
function It() {
  return A = A < Mt ? A : 0, A++, A - 1;
}
function N() {
  var t = "c", e = (/* @__PURE__ */ new Date()).getTime().toString(W), n = St(It().toString(W), ot), r = F(), a = nt() + nt();
  return t + e + n + r + a;
}
N.slug = function() {
  var e = (/* @__PURE__ */ new Date()).getTime().toString(36), n = It().toString(36).slice(-4), r = F().slice(0, 1) + F().slice(-1), a = nt().slice(-2);
  return e.slice(-2) + n + r + a;
};
N.isCuid = function(e) {
  return typeof e != "string" ? !1 : !!e.startsWith("c");
};
N.isSlug = function(e) {
  if (typeof e != "string")
    return !1;
  var n = e.length;
  return n >= 7 && n <= 10;
};
N.fingerprint = F;
var _e = N;
const xe = /* @__PURE__ */ Yt(_e), Te = () => ({
  condition: ({ type: t }) => t === "string",
  generator: ({ propertName: t, checks: e = {} }) => e.uuid ? it() : e.cuid ? xe() : e.cuid2 ? le() : e.email ? `${V(t).slice(0, 8)}@fixture.com` : e.startsWith || e.endsWith ? [e.startsWith, V(t), e.endsWith].filter(Boolean).join("") : e.min !== void 0 || e.max !== void 0 ? Le(t, e.min, e.max) : V(t)
});
function Le(t, e, n) {
  if (e !== void 0 && e < 0)
    throw new Error(`minLength ${e} can't be less than 0`);
  let r = V(t);
  for (; r.length < (e ?? r.length); )
    r += `-${it()}`;
  return r.length > (n ?? r.length) && (r = r.substring(0, n)), r;
}
function V(t) {
  return `${t ? `${t}-` : ""}${it()}`;
}
function it() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const e = Math.random() * 16 | 0;
    return (t == "x" ? e : e & 3 | 8).toString(16);
  });
}
const ke = () => ({
  condition: ({ type: t }) => t === "undefined",
  generator: () => {
  }
}), $e = () => {
}, Be = () => ({
  condition: ({ type: t }) => t === "function" || t === "void",
  generator: () => $e
}), Ce = () => ({
  condition: ({ type: t }) => t === "enum",
  generator: ({ possibleValues: t }) => t[Math.floor(Math.random() * t.length)]
}), Oe = () => ({
  condition: ({ type: t }) => t === "literal",
  generator: ({ value: t }) => t
}), Ee = () => ({
  condition: ({ type: t }) => t === "NaN",
  generator: () => NaN
}), Se = () => ({
  condition: ({ type: t }) => t === "map",
  generator: ({
    length: t = 3,
    keyCreate: e,
    valueCreate: n
  }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    const r = /* @__PURE__ */ new Map();
    for (; r.size < t; )
      r.set(e(), n());
    return r;
  }
}), Me = () => ({
  condition: ({ type: t }) => t === "set",
  generator: ({ length: t = 3, create: e }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    const n = /* @__PURE__ */ new Set();
    for (; n.size < t; )
      n.add(e());
    return n;
  }
}), Ie = () => ({
  condition: ({ type: t }) => t === "tuple",
  generator: ({ create: t }) => t()
}), Ae = () => ({
  condition: ({ type: t }) => t === "record",
  generator: ({
    length: t = 3,
    keyCreate: e,
    valueCreate: n
  }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    return Array.from({ length: t }).reduce((r) => ({
      ...r,
      [e()]: n()
    }), {});
  }
}), ze = () => ({
  condition: ({ type: t }) => t === "union",
  generator: ({ create: t, possibleTypes: e }) => {
    const n = e[Math.floor(Math.random() * e.length)];
    return t(n);
  }
}), Ue = () => ({
  condition: ({ type: t }) => t === "effect",
  generator: je
});
function je({ effect: t, inner: e }) {
  return t.type === "transform" ? t.transform(e.create(), {
    addIssue: () => {
    },
    path: e.path
  }) : e.create();
}
function k(t, e) {
  const r = T(t).createValue(e), a = e.customizations.find((h) => h.condition(r));
  return a ? a.generator(r) : null;
}
function T(t) {
  if (t._def.innerType)
    return T(t._def.innerType);
  const e = (o, u) => [
    o,
    (l) => {
      const g = l.ignoreChecks ? {} : Ze(t), w = (u == null ? void 0 : u(l)) ?? {};
      return {
        propertName: l.path[0],
        type: o,
        checks: g,
        ...w
      };
    }
  ], r = {
    ZodString: () => e("string"),
    ZodNumber: () => e("number"),
    ZodBigInt: () => e("bigint"),
    ZodBoolean: () => e("boolean"),
    ZodObject: () => e("object", (o) => ({
      shape: Object.entries(t._def.shape()).reduce(
        (l, [g, w]) => {
          const $ = T(w);
          return {
            ...l,
            [g]: {
              type: $.type,
              create: () => k(w, {
                ...o,
                path: [g, ...o.path]
              })
            }
          };
        },
        {}
      )
    })),
    ZodDate: () => e("date"),
    ZodArray: () => e("array", (o) => {
      const { minLength: u, maxLength: l } = t._def;
      let g = o.defaultLength;
      if (u !== null && l !== null) {
        if (u.value > l.value)
          throw new Error(
            `min ${u} can't be greater max ${l}`
          );
        g = Z(u.value, l.value);
      } else
        u !== null ? g = u.value : l !== null && (g = l.value);
      return {
        length: g,
        create: () => k(t._def.type, o)
      };
    }),
    ZodSet: () => e("set", (o) => ({
      length: o.defaultLength,
      create: () => k(t._def.valueType, o)
    })),
    ZodMap: () => e("map", (o) => {
      const u = T(t._def.keyType), l = T(t._def.valueType);
      return {
        length: o.defaultLength,
        keyType: u.type,
        keyCreate: () => k(t._def.keyType, o),
        valueType: l.type,
        valueCreate: () => k(t._def.valueType, o)
      };
    }),
    ZodRecord: () => e("record", (o) => {
      const u = T(t._def.keyType), l = T(t._def.valueType);
      return {
        length: o.defaultLength,
        keyType: u.type,
        keyCreate: () => k(t._def.keyType, o),
        valueType: l.type,
        valueCreate: () => k(t._def.valueType, o)
      };
    }),
    ZodTuple: () => e("tuple", (o) => ({
      items: () => t._def.items.map(
        (u) => T(u).type
      ),
      create: () => t._def.items.map(
        (u) => k(u, o)
      )
    })),
    ZodEnum: () => e(
      "enum",
      () => ({
        possibleValues: t._def.values ?? []
      })
    ),
    ZodNativeEnum: () => e("enum", () => {
      const o = t._def.values;
      return {
        possibleValues: Object.keys(o ?? {}).filter((u) => Number.isNaN(Number(u))).map((u) => o[u])
      };
    }),
    ZodUnion: () => e("union", (o) => ({
      possibleTypes: t._def.options.map(
        (u) => T(u).type
      ),
      create: (u) => {
        const l = t._def.options.find(
          (g) => T(g).type === u
        );
        if (!l)
          throw new Error(`Option with type ${u} does not exist`);
        return k(l, o);
      }
    })),
    ZodDiscriminatedUnion: () => e("union", (o) => {
      const l = [...t._def.options.values()];
      return {
        possibleTypes: l.map(
          (g) => T(g).type
        ),
        create: (g) => {
          const w = l.find(
            ($) => T($).type === g
          );
          if (!w)
            throw new Error(`Option with type ${g} does not exist`);
          return k(w, o);
        }
      };
    }),
    ZodLiteral: () => e(
      "literal",
      () => ({ value: t._def.value })
    ),
    ZodNaN: () => e("NaN"),
    ZodNull: () => e("null"),
    ZodUndefined: () => e("undefined"),
    ZodVoid: () => e("void"),
    ZodFunction: () => e("function"),
    ZodAny: () => e("any"),
    ZodUnknown: () => e("unknown"),
    ZodNever: () => e("never"),
    ZodEffects: () => e("effect", (o) => {
      const u = T(t._def.schema).type;
      return {
        effect: t._def.effect,
        inner: {
          path: o.path,
          type: u,
          create: () => k(t._def.schema, o)
        }
      };
    })
  }[t._def.typeName];
  if (!r)
    throw new Error(`Missing type for ZodType "${t._def.typeName}"`);
  const [a, h] = r();
  return {
    type: a,
    createValue: h
  };
}
function Ze(t) {
  const e = [...t._def.checks || []];
  t._def.minLength && e.push({ kind: "min", value: t._def.minLength.value }), t._def.maxLength && e.push({ kind: "max", value: t._def.maxLength.value });
  const n = e.reduce(
    (r, a) => {
      switch (a.kind) {
        case "min":
          return {
            ...r,
            [a.kind]: a.value + (a.inclusive === !1 ? 1 : 0)
          };
        case "max":
          return {
            ...r,
            [a.kind]: a.value + (a.inclusive === !1 ? -1 : 0)
          };
        case "length":
          return {
            ...r,
            min: a.value,
            max: a.value
          };
        case "uuid":
        case "cuid":
        case "cuid2":
        case "email":
          return {
            ...r,
            [a.kind]: !0
          };
        case "startsWith":
        case "endsWith":
          return {
            ...r,
            [a.kind]: a.value
          };
        default:
          return r;
      }
    },
    {}
  );
  if (n.min !== void 0 && n.max !== void 0 && n.min > n.max)
    throw new Error(
      `min (${n.min}) can't be greater than max (${n.max})`
    );
  return n;
}
const He = [
  Te(),
  Ut(),
  Ht(),
  Nt(),
  jt(),
  Ft(),
  Wt(),
  Kt(),
  ke(),
  Be(),
  Ee(),
  Ce(),
  Oe(),
  zt(),
  Pt(),
  Ae(),
  Se(),
  Me(),
  Ie(),
  ze(),
  Ue()
];
function Fe(t, {
  ignoreChecks: e = !1,
  customizations: n = [],
  defaultLength: r = 3
} = {}) {
  return k(t, {
    path: [],
    ignoreChecks: e,
    defaultLength: r,
    customizations: [...n, ...He]
  });
}
export {
  zt as arrayWithLengthCustomization,
  Ut as bigIntRandomizeCustomization,
  ft as bigIntRandomizer,
  Ne as bigintRandomizeZodSchemaCustomization,
  jt as booleanSequenceCustomization,
  Fe as createFixture,
  Ft as dateRandomizeCustomization,
  Wt as dateRandomizeZodSchemaCustomization,
  Oe as literalValueCustomization,
  Se as mapCustomization,
  Ee as nanCustomization,
  Be as noopCustomization,
  Kt as nullCustomization,
  Ht as numberRandomizeCustomization,
  Nt as numberRandomizeZodSchemaCustomization,
  Z as numberRandomizer,
  Pt as objectCustomization,
  Ce as randomValueOfPossiblesCustomication,
  Ae as recordCustomization,
  Me as setCustomization,
  Te as stringCustomization,
  Ie as tupleCustomization,
  ke as undefinedCustomization,
  ze as unionRandomizeCustomization
};
