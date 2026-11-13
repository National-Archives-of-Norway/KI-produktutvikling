import { test } from "node:test";
import assert from "node:assert/strict";
import { getSkillCatalogSource } from "../src/content/catalog.ts";
import { resources } from "../src/content/resources.ts";
import { isSources } from "../src/features/rag/contracts.ts";

test("skill-oversikten avledes av katalogen, inkludert eksempelstatus", () => {
  const source = getSkillCatalogSource();
  const skills = resources.filter((item) => item.type === "Skill");
  assert.equal(source.guide?.steps.length, skills.length);
  for (const item of skills) {
    assert.ok(source.text.includes(item.title));
    if (item.skill) assert.ok(source.text.includes(item.skill.name));
    else
      assert.match(
        source.guide!.steps.find((step) => step.includes(item.title))!,
        /eksempel uten registrert skill-pakke/,
      );
  }
  for (const item of resources.filter((item) => item.type !== "Skill"))
    assert.ok(!source.text.includes(item.title));
});

test("ny eller fjernet skill oppdaterer antall og oversikt uten manuell liste", () => {
  const added = {
    ...resources.find((item) => item.type === "Skill")!,
    slug: "syntetisk",
    title: "Syntetisk ressurs",
    skill: undefined,
  };
  const initial = getSkillCatalogSource();
  const next = getSkillCatalogSource([...resources, added]);
  assert.equal(next.guide!.steps.length, initial.guide!.steps.length + 1);
  assert.ok(next.text.includes(added.title));
  assert.notEqual(next.guide!.summary, initial.guide!.summary);
  assert.equal(getSkillCatalogSource([]).guide!.steps.length, 0);
  assert.match(getSkillCatalogSource([]).text, /0 Skill-ressurser/);
});

test("kataloganker tillates, ukjente ankre og eksterne adresser avvises", () => {
  const source = getSkillCatalogSource();
  assert.ok(isSources([source]));
  for (const href of ["/#hemmelig", "https://example.com/#ressurser"])
    assert.equal(isSources([{ ...source, href }]), false);
});
