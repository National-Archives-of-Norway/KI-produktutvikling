// Pure parsers: source changes must fail visibly rather than silently invent prices.
export function clean(text) {
  return text
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
export function money(text) {
  const m = clean(text).match(
    /^\$([\d,]+(?:\.\d+)?)(?:\s*\/\s*MTok)?(?:\s*\d+)?$/,
  );
  if (!m) throw new Error("Ukjent prisformat");
  const value = Number(m[1].replaceAll(",", ""));
  if (!Number.isFinite(value) || value < 0 || value > 100000)
    throw new Error("Ugyldig pris");
  return value;
}
function optionalMoney(s) {
  return !s || /^(?:-|—|Not applicable)$/i.test(s.trim()) ? null : money(s);
}
export function tables(markdown) {
  return [...markdown.matchAll(/(?:^\|.*\|\r?\n)+/gm)]
    .map(([block]) =>
      block
        .trim()
        .split(/\r?\n/)
        .map((line) =>
          line
            .slice(1, -1)
            .split("|")
            .map((x) => x.trim()),
        ),
    )
    .filter(
      (rows) => rows.length > 2 && rows[1].every((c) => /^:?-+:?$/.test(c)),
    )
    .map((rows) => ({ headers: rows[0], rows: rows.slice(2) }));
}
function need(table, names) {
  if (!table || names.some((n) => !table.headers.includes(n)))
    throw new Error("Pristabellens kolonner er endret");
  return table.rows.map((cells) =>
    Object.fromEntries(table.headers.map((h, i) => [h, cells[i] ?? ""])),
  );
}
function unique(rows, key = "name") {
  if (!rows.length || new Set(rows.map((r) => r[key])).size !== rows.length)
    throw new Error("Tom eller tvetydig pristabell");
  return rows;
}
export function copilotPlans(text) {
  const rows = need(
    tables(text).find(
      (t) => t.headers.includes("Pricing") && t.headers.includes("Plan"),
    ),
    ["Plan", "Pricing"],
  );
  const names = [
    "Copilot Pro",
    "Copilot Pro+",
    "Copilot Max",
    "Copilot Business",
    "Copilot Enterprise",
  ];
  return unique(
    names.map((name) => {
      const row = rows.find((r) => r.Plan === name);
      if (!row) throw new Error("En valgt Copilot-plan mangler");
      const m = clean(row.Pricing).match(
        /^\$([\d.]+) USD per (?:granted seat per )?month/,
      );
      if (!m) throw new Error("Abonnementsvilkår er endret");
      return {
        name,
        monthly: money("$" + m[1]),
        annualMonthly: null,
        unit: "bruker/måned",
        note:
          clean(row.Pricing) +
          ". " +
          clean(row["GitHub AI Credits"] ?? "") +
          " AI Credits. Kontroller fullstendige vilkår hos GitHub.",
      };
    }),
  );
}
export function claudePlans(html) {
  // Explicit semantic attributes, not the position of a currency figure in HTML.
  const amount = (id) => {
    const all = [
      ...html.matchAll(
        new RegExp(`<[^>]+data-plan="${id}"[^>]*>([^<]+)<`, "g"),
      ),
    ];
    const monthlyFields = all.filter(
      (m) => !m[0].includes('data-plan-field="amount_total"'),
    );
    if (monthlyFields.length !== 1)
      throw new Error("Claude-planens prisfelt mangler eller er tvetydig");
    return money(monthlyFields[0][1]);
  };
  return [
    {
      name: "Claude Pro",
      monthly: amount("pro_monthly"),
      annualMonthly: amount("pro_annual"),
      unit: "bruker/måned",
      note: "Årspris er leverandørens oppgitte månedsbeløp ved årsbetaling; avrunding kan forekomme. Bruksgrenser gjelder. Se kilden for årsbeløp og funksjoner.",
    },
    {
      name: "Claude Max",
      monthly: amount("max_5x_monthly"),
      annualMonthly: null,
      unit: "bruker/måned",
      note: "Bruksgrenser gjelder. Se leverandørens vilkår for inkludert bruk og eventuelle API-kreditter.",
    },
    {
      name: "Claude Ultra",
      monthly: amount("max_20x_monthly"),
      annualMonthly: null,
      unit: "bruker/måned",
      note: "Bruksgrenser gjelder. Se leverandørens vilkår for inkludert bruk og eventuelle API-kreditter.",
    },
    {
      name: "Claude Team – Standard",
      monthly: amount("team_monthly_per_seat"),
      annualMonthly: amount("team_annual_per_seat"),
      unit: "sete/måned",
      note: "Årsbetaling gjelder for årsprisen. Se kilden for minstekrav til antall seter og inkludert bruk.",
    },
    {
      name: "Claude Team – Premium",
      monthly: amount("team_premium_monthly_per_seat"),
      annualMonthly: amount("team_premium_annual_per_seat"),
      unit: "sete/måned",
      note: "Årsbetaling gjelder for årsprisen. Se kilden for minstekrav til antall seter og inkludert bruk.",
    },
  ];
}
export function codexPlans(text) {
  const cards = [
    ...text.matchAll(/<PricingCard\s([\s\S]*?)>([\s\S]*?)<\/PricingCard>/g),
  ].map((m) => ({ attrs: m[1], body: m[2] }));
  return ["Plus", "Pro", "Business"].map((name) => {
    const found = cards.filter((c) => c.attrs.includes(`name="${name}"`));
    if (found.length !== 1)
      throw new Error("Codex-plan mangler eller er tvetydig");
    const { attrs } = found[0];
    const price = attrs.match(/\bprice="([^"]+)"/);
    if (
      !price ||
      (!attrs.includes("/month") && !attrs.includes("/ user / month"))
    )
      throw new Error("Codex-planens intervall er endret");
    let monthly = money(price[1]),
      annualMonthly = null;
    const footnote = attrs.match(/footnoteLabel="([^"]+)"/)?.[1] ?? "";
    if (name === "Business") {
      const match = footnote.match(
        /billed annually\. \$(\d+(?:\.\d+)?) per user per month when billed monthly/,
      );
      if (!match) throw new Error("Business sine faktureringsvilkår er endret");
      annualMonthly = monthly;
      monthly = money("$" + match[1]);
    }
    return {
      name: `ChatGPT ${name} / Codex`,
      monthly,
      annualMonthly,
      unit: "bruker/måned",
      note:
        (attrs.includes('priceEyebrow="From"') ? "Fra-pris. " : "") +
        clean(footnote) +
        " Inkludert bruk og kreditter følger abonnementet; API-priser kan ikke brukes til å beregne abonnementskvoten.",
    };
  });
}
export function copilotTokens(text) {
  const wanted = [
    "GPT-5.3-Codex",
    "GPT-6.1 Sol",
    "Claude Sonnet 5.5",
    "Claude Opus 5.5",
  ];
  const rows = tables(text)
    .filter(
      (t) =>
        t.headers.includes("Cached input") &&
        t.headers.includes("Tier") &&
        t.headers.includes("Cache write"),
    )
    .flatMap((t) =>
      need(t, [
        "Model",
        "Tier",
        "Threshold (input tokens)",
        "Input",
        "Output",
        "Cached input",
        "Cache write",
      ]),
    )
    .filter((r) => wanted.includes(r.Model));
  if (wanted.some((n) => !rows.some((r) => r.Model === n)))
    throw new Error("En valgt Copilot-modell mangler");
  return unique(
    rows.map((r) => ({
      name: r.Model + " · " + r.Tier,
      context:
        r["Threshold (input tokens)"] === "Not applicable"
          ? "Standard"
          : r["Threshold (input tokens)"],
      input: money(r.Input),
      output: money(r.Output),
      cached: money(r["Cached input"]),
      write: optionalMoney(r["Cache write"]),
      writeLong: null,
      note: "GitHub Copilot-sats, ikke et direkte modell-API. Se kilden for kredittberegning og tilgang.",
    })),
  );
}
export function claudeTokens(text) {
  const rows = need(
    tables(text).find((t) => t.headers.includes("Base input tokens")),
    [
      "Model",
      "Base input tokens",
      "5m cache writes",
      "1h cache writes",
      "Cache hits and refreshes",
      "Output tokens",
    ],
  );
  const wanted = ["Claude Opus 5.5", "Claude Sonnet 5.5", "Claude Haiku 4.5"];
  return wanted.map((name) => {
    const r = rows.find((r) => r.Model === name);
    if (!r) throw new Error("En valgt Claude-modell mangler");
    return {
      name,
      context: "Standard",
      input: money(r["Base input tokens"]),
      output: money(r["Output tokens"]),
      cached: money(r["Cache hits and refreshes"]),
      write: money(r["5m cache writes"]),
      writeLong: money(r["1h cache writes"]),
      note: "Direkte Claude API. Cache-skriving gjelder henholdsvis 5 minutter og 1 time. Region-, verktøy- og andre tillegg kan gjelde; se kilden.",
    };
  });
}
export function codexTokens(text) {
  // Scope to Standard; never pick a matching row from Batch, Flex or Fast.
  const start = text.indexOf("### Standard pricing data");
  if (start < 0) throw new Error("Standard API-priser mangler");
  const section = text.slice(start).split(/\n###? /)[0];
  const rows = need(tables(section)[0], [
    "Model",
    "Short context input",
    "Short context output",
    "Short context cached input",
    "Short context 30m write",
    "Short context 12h write",
    "Long context input",
    "Long context output",
    "Long context cached input",
    "Long context 30m write",
    "Long context 12h write",
  ]);
  const result = ["gpt-6.1-sol", "gpt-6-luna"].flatMap((name) => {
    const r = rows.find((r) => r.Model === name);
    if (!r) throw new Error("En valgt OpenAI-modell mangler");
    return ["Short", "Long"].map((tier) => ({
      name: name + " · " + tier,
      context:
        tier === "Short"
          ? "Kort kontekst (se terskel i kilden)"
          : "Lang kontekst (se terskel i kilden)",
      input: money(r[tier + " context input"]),
      output: money(r[tier + " context output"]),
      cached: money(r[tier + " context cached input"]),
      write: optionalMoney(r[tier + " context 30m write"]),
      writeLong: optionalMoney(r[tier + " context 12h write"]),
      note: "OpenAI API · Standard hastighet. Cache-skriving gjelder henholdsvis 30 minutter og 12 timer. Andre hastigheter, regioner og verktøy kan ha andre satser.",
    }));
  });
  const specialized = text.indexOf("Specialized models");
  if (specialized < 0) throw new Error("Spesialiserte API-priser mangler");
  const t = tables(text.slice(specialized)).find((t) =>
    t.headers.includes("Category"),
  );
  const r = need(t, [
    "Category",
    "Model",
    "Input",
    "Output",
    "Cached input",
  ]).find((r) => r.Model === "gpt-5.3-codex" && r.Category === "Codex");
  if (!r) throw new Error("Codex API-raden mangler");
  result.push({
    name: r.Model,
    context: "Standard",
    input: money(r.Input),
    output: money(r.Output),
    cached: money(r["Cached input"]),
    write: null,
    writeLong: null,
    note: "OpenAI API · Standard hastighet. Ikke en abonnementspris.",
  });
  return unique(result);
}
export const parsers = {
  copilotPlans,
  claudePlans,
  codexPlans,
  copilotTokens,
  claudeTokens,
  codexTokens,
};
