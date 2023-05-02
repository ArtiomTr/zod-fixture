import { createId as z } from "@paralleldrive/cuid2";
import C from "cuid";
const $ = () => ({
  condition: ({ type: t }) => t === "array",
  generator: ({ length: t = 3, create: e }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    return Array.from({ length: t }, () => e());
  }
}), T = 1, v = 500, Z = (t = T, e = v) => {
  if (t > e)
    throw new Error(`min ${t} can't be greater max ${e}`);
  return {
    condition: ({ type: r, checks: n = {} }) => r === "bigint" && n.min === void 0 && n.max === void 0,
    generator: () => _(t, e)
  };
}, it = () => ({
  condition: ({ type: t, checks: e = {} }) => t === "bigint" && (e.min !== void 0 || e.max !== void 0),
  generator: ({ checks: t = {} }) => {
    const e = t.min, r = t.max;
    if (e > r)
      throw new Error(`min ${e} can't be greater max ${r}`);
    const n = r ?? e + v, a = e ?? n - v;
    return _(a, n);
  }
});
function _(t, e) {
  return BigInt(Math.floor(Math.random() * (e - t + 1) + t));
}
const M = () => {
  let t = !1;
  return {
    condition: ({ type: e }) => e === "boolean",
    generator: () => (t = !t, t)
  };
}, h = 1, x = 500, E = (t = h, e = x) => {
  if (t > e)
    throw new Error(`min ${t} can't be greater max ${e}`);
  return {
    condition: ({ type: r, checks: n = {} }) => r === "number" && n.min === void 0 && n.max === void 0,
    generator: () => c(t, e)
  };
}, N = () => ({
  condition: ({ type: t, checks: e = {} }) => t === "number" && (e.min !== void 0 || e.max !== void 0),
  generator: ({ checks: t = {} }) => {
    const e = t.min, r = t.max;
    if (e > r)
      throw new Error(`min ${e} can't be greater max ${r}`);
    const n = r ?? e + x, a = e ?? n - x;
    return c(a, n);
  }
});
function c(t, e) {
  return Math.floor(Math.random() * (e - t + 1) + t);
}
const m = /* @__PURE__ */ new Date(), R = new Date(
  m.getUTCFullYear() - 2,
  m.getUTCMonth(),
  m.getUTCDate()
).getTime(), S = new Date(
  m.getUTCFullYear() + 2,
  m.getUTCMonth(),
  m.getUTCDate()
).getTime(), L = 31536e6, b = L * 2, U = (t = R, e = S) => {
  if (t > e)
    throw new Error(`min ${t} can't be greater max ${e}`);
  return {
    condition: ({ type: r, checks: n = {} }) => r === "date" && n.min === void 0 && n.max === void 0,
    generator: () => new Date(c(t, e))
  };
}, j = () => ({
  condition: ({ type: t, checks: e = {} }) => t === "date" && (e.min !== void 0 || e.max !== void 0),
  generator: ({ checks: t = {} }) => {
    const e = t.min, r = t.max;
    if (e > r)
      throw new Error(`min ${e} can't be greater max ${r}`);
    const n = r ?? e + b, a = e ?? n - b;
    return new Date(c(a, n));
  }
}), D = () => ({
  condition: ({ type: t }) => t === "object",
  generator: O
});
function O({
  shape: t
}) {
  return Object.entries(t).reduce((e, [r, n]) => ({
    ...e,
    [r]: n.create()
  }), {});
}
const W = ["null", "any", "unknown", "never"], F = () => ({
  condition: ({ type: t }) => W.includes(t),
  generator: () => null
}), q = () => ({
  condition: ({ type: t }) => t === "string",
  generator: ({ propertName: t, checks: e = {} }) => e.uuid ? w() : e.cuid ? C() : e.cuid2 ? z() : e.email ? `${p(t).slice(0, 8)}@fixture.com` : e.startsWith || e.endsWith ? [e.startsWith, p(t), e.endsWith].filter(Boolean).join("") : e.min !== void 0 || e.max !== void 0 ? I(t, e.min, e.max) : p(t)
});
function I(t, e, r) {
  if (e !== void 0 && e < 0)
    throw new Error(`minLength ${e} can't be less than 0`);
  let n = p(t);
  for (; n.length < (e ?? n.length); )
    n += `-${w()}`;
  return n.length > (r ?? n.length) && (n = n.substring(0, r)), n;
}
function p(t) {
  return `${t ? `${t}-` : ""}${w()}`;
}
function w() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
    const e = Math.random() * 16 | 0;
    return (t == "x" ? e : e & 3 | 8).toString(16);
  });
}
const V = () => ({
  condition: ({ type: t }) => t === "undefined",
  generator: () => {
  }
}), A = () => {
}, B = () => ({
  condition: ({ type: t }) => t === "function" || t === "void",
  generator: () => A
}), Y = () => ({
  condition: ({ type: t }) => t === "enum",
  generator: ({ possibleValues: t }) => t[Math.floor(Math.random() * t.length)]
}), G = () => ({
  condition: ({ type: t }) => t === "literal",
  generator: ({ value: t }) => t
}), H = () => ({
  condition: ({ type: t }) => t === "NaN",
  generator: () => NaN
}), J = () => ({
  condition: ({ type: t }) => t === "map",
  generator: ({
    length: t = 3,
    keyCreate: e,
    valueCreate: r
  }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    const n = /* @__PURE__ */ new Map();
    for (; n.size < t; )
      n.set(e(), r());
    return n;
  }
}), K = () => ({
  condition: ({ type: t }) => t === "set",
  generator: ({ length: t = 3, create: e }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    const r = /* @__PURE__ */ new Set();
    for (; r.size < t; )
      r.add(e());
    return r;
  }
}), Q = () => ({
  condition: ({ type: t }) => t === "tuple",
  generator: ({ create: t }) => t()
}), X = () => ({
  condition: ({ type: t }) => t === "record",
  generator: ({
    length: t = 3,
    keyCreate: e,
    valueCreate: r
  }) => {
    if (t < 0)
      throw new Error(`length ${t} must be greater or equal to 0`);
    return Array.from({ length: t }).reduce((n) => ({
      ...n,
      [e()]: r()
    }), {});
  }
}), P = () => ({
  condition: ({ type: t }) => t === "union",
  generator: ({ create: t, possibleTypes: e }) => {
    const r = e[Math.floor(Math.random() * e.length)];
    return t(r);
  }
}), k = () => ({
  condition: ({ type: t }) => t === "effect",
  generator: tt
});
function tt({ effect: t, inner: e }) {
  return t.type === "transform" ? t.transform(e.create(), {
    addIssue: () => {
    },
    path: e.path
  }) : e.create();
}
function l(t, e) {
  const n = s(t).createValue(e), a = e.customizations.find((g) => g.condition(n));
  return a ? a.generator(n) : null;
}
function s(t) {
  if (t._def.innerType)
    return s(t._def.innerType);
  const e = (o, i) => [
    o,
    (u) => {
      const d = u.ignoreChecks ? {} : et(t), f = (i == null ? void 0 : i(u)) ?? {};
      return {
        propertName: u.path[0],
        type: o,
        checks: d,
        ...f
      };
    }
  ], n = {
    ZodString: () => e("string"),
    ZodNumber: () => e("number"),
    ZodBigInt: () => e("bigint"),
    ZodBoolean: () => e("boolean"),
    ZodObject: () => e("object", (o) => ({
      shape: Object.entries(t._def.shape()).reduce(
        (u, [d, f]) => {
          const y = s(f);
          return {
            ...u,
            [d]: {
              type: y.type,
              create: () => l(f, {
                ...o,
                path: [d, ...o.path]
              })
            }
          };
        },
        {}
      )
    })),
    ZodDate: () => e("date"),
    ZodArray: () => e("array", (o) => {
      const { minLength: i, maxLength: u } = t._def;
      let d = o.defaultLength;
      if (i !== null && u !== null) {
        if (i.value > u.value)
          throw new Error(
            `min ${i} can't be greater max ${u}`
          );
        d = c(i.value, u.value);
      } else
        i !== null ? d = i.value : u !== null && (d = u.value);
      return {
        length: d,
        create: () => l(t._def.type, o)
      };
    }),
    ZodSet: () => e("set", (o) => ({
      length: o.defaultLength,
      create: () => l(t._def.valueType, o)
    })),
    ZodMap: () => e("map", (o) => {
      const i = s(t._def.keyType), u = s(t._def.valueType);
      return {
        length: o.defaultLength,
        keyType: i.type,
        keyCreate: () => l(t._def.keyType, o),
        valueType: u.type,
        valueCreate: () => l(t._def.valueType, o)
      };
    }),
    ZodRecord: () => e("record", (o) => {
      const i = s(t._def.keyType), u = s(t._def.valueType);
      return {
        length: o.defaultLength,
        keyType: i.type,
        keyCreate: () => l(t._def.keyType, o),
        valueType: u.type,
        valueCreate: () => l(t._def.valueType, o)
      };
    }),
    ZodTuple: () => e("tuple", (o) => ({
      items: () => t._def.items.map(
        (i) => s(i).type
      ),
      create: () => t._def.items.map(
        (i) => l(i, o)
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
        possibleValues: Object.keys(o ?? {}).filter((i) => Number.isNaN(Number(i))).map((i) => o[i])
      };
    }),
    ZodUnion: () => e("union", (o) => ({
      possibleTypes: t._def.options.map(
        (i) => s(i).type
      ),
      create: (i) => {
        const u = t._def.options.find(
          (d) => s(d).type === i
        );
        if (!u)
          throw new Error(`Option with type ${i} does not exist`);
        return l(u, o);
      }
    })),
    ZodDiscriminatedUnion: () => e("union", (o) => {
      const u = [...t._def.options.values()];
      return {
        possibleTypes: u.map(
          (d) => s(d).type
        ),
        create: (d) => {
          const f = u.find(
            (y) => s(y).type === d
          );
          if (!f)
            throw new Error(`Option with type ${d} does not exist`);
          return l(f, o);
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
      const i = s(t._def.schema).type;
      return {
        effect: t._def.effect,
        inner: {
          path: o.path,
          type: i,
          create: () => l(t._def.schema, o)
        }
      };
    })
  }[t._def.typeName];
  if (!n)
    throw new Error(`Missing type for ZodType "${t._def.typeName}"`);
  const [a, g] = n();
  return {
    type: a,
    createValue: g
  };
}
function et(t) {
  const e = [...t._def.checks || []];
  t._def.minLength && e.push({ kind: "min", value: t._def.minLength.value }), t._def.maxLength && e.push({ kind: "max", value: t._def.maxLength.value });
  const r = e.reduce(
    (n, a) => {
      switch (a.kind) {
        case "min":
          return {
            ...n,
            [a.kind]: a.value + (a.inclusive === !1 ? 1 : 0)
          };
        case "max":
          return {
            ...n,
            [a.kind]: a.value + (a.inclusive === !1 ? -1 : 0)
          };
        case "length":
          return {
            ...n,
            min: a.value,
            max: a.value
          };
        case "uuid":
        case "cuid":
        case "cuid2":
        case "email":
          return {
            ...n,
            [a.kind]: !0
          };
        case "startsWith":
        case "endsWith":
          return {
            ...n,
            [a.kind]: a.value
          };
        default:
          return n;
      }
    },
    {}
  );
  if (r.min !== void 0 && r.max !== void 0 && r.min > r.max)
    throw new Error(
      `min (${r.min}) can't be greater than max (${r.max})`
    );
  return r;
}
const nt = [
  q(),
  Z(),
  E(),
  N(),
  M(),
  U(),
  j(),
  F(),
  V(),
  B(),
  H(),
  Y(),
  G(),
  $(),
  D(),
  X(),
  J(),
  K(),
  Q(),
  P(),
  k()
];
function at(t, {
  ignoreChecks: e = !1,
  customizations: r = [],
  defaultLength: n = 3
} = {}) {
  return l(t, {
    path: [],
    ignoreChecks: e,
    defaultLength: n,
    customizations: [...r, ...nt]
  });
}
export {
  $ as arrayWithLengthCustomization,
  Z as bigIntRandomizeCustomization,
  _ as bigIntRandomizer,
  it as bigintRandomizeZodSchemaCustomization,
  M as booleanSequenceCustomization,
  at as createFixture,
  U as dateRandomizeCustomization,
  j as dateRandomizeZodSchemaCustomization,
  G as literalValueCustomization,
  J as mapCustomization,
  H as nanCustomization,
  B as noopCustomization,
  F as nullCustomization,
  E as numberRandomizeCustomization,
  N as numberRandomizeZodSchemaCustomization,
  c as numberRandomizer,
  D as objectCustomization,
  Y as randomValueOfPossiblesCustomication,
  X as recordCustomization,
  K as setCustomization,
  q as stringCustomization,
  Q as tupleCustomization,
  V as undefinedCustomization,
  P as unionRandomizeCustomization
};
