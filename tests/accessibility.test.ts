import { test } from "node:test";
import assert from "node:assert/strict";
import { themeDark } from "@digitalarkivet/mui-theme";
import { fieldBorderOpacity, portalColors } from "../src/theme/effects.ts";

const rgb = (hex: string) =>
  [1, 3, 5].map((n) => parseInt(hex.slice(n, n + 2), 16));
function luminance(color: number[]) {
  const linear = color.map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function contrast(a: number[], b: number[]) {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}
const accent = rgb(themeDark.palette.secondary.main);

test("portalens tekstfarger oppfyller 4,5:1 på de to grunnflatene", () => {
  for (const surface of [portalColors.background, portalColors.surface]) {
    for (const text of [
      themeDark.palette.text.primary,
      themeDark.palette.text.secondary,
      themeDark.palette.secondary.main,
    ]) {
      assert.ok(
        contrast(rgb(text), rgb(surface)) >= 4.5,
        `${text} på ${surface}`,
      );
    }
  }
  for (const surface of [
    themeDark.palette.secondary.main,
    portalColors.buttonHighlight,
  ]) {
    assert.ok(
      contrast(rgb(themeDark.palette.text.primaryInvert), rgb(surface)) >= 4.5,
    );
  }
});

test("chatfeltets transparente kant oppfyller 3:1 på grunnflatene", () => {
  for (const surface of [portalColors.background, portalColors.surface]) {
    const background = rgb(surface);
    const border = accent.map(
      (c, i) =>
        c * fieldBorderOpacity + background[i] * (1 - fieldBorderOpacity),
    );
    assert.ok(contrast(border, background) >= 3, `Feltkant på ${surface}`);
  }
});
