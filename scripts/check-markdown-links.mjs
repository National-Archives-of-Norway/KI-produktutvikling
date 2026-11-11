import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, resolve, relative, isAbsolute } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Kun rot-Markdown og direkte docs/*.md; daterte bevis leses ikke rekursivt.
export async function markdownFiles(root) {
  const files = [];
  for (const dir of [root, join(root, "docs")]) {
    for (const entry of await readdir(dir, { withFileTypes: true }))
      if (entry.isFile() && /\.md$/i.test(entry.name))
        files.push(join(dir, entry.name));
  }
  return files.sort();
}

function destination(text, start) {
  let i = start;
  while (/\s/.test(text[i] ?? "") && i < text.length) i++;
  if (text[i] === "<") {
    const end = text.indexOf(">", i + 1);
    return end < 0 ? "" : text.slice(i + 1, end);
  }
  const begin = i;
  let depth = 0;
  for (; i < text.length; i++) {
    const char = text[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === "(") depth++;
    if (char === ")") {
      if (!depth) break;
      depth--;
    }
    if (/\s/.test(char) && !depth) break;
  }
  return text.slice(begin, i);
}

export function markdownTargets(text) {
  // Ikke behandle kodeeksempler, kommentarer eller inline-kode som lenker.
  const prose = text
    .replace(/^ {0,3}(`{3,}|~{3,})[^\n]*\n[\s\S]*?^ {0,3}\1\s*$/gm, "")
    .replace(/<!--[^]*?-->/g, "")
    .replace(/(`+)[\s\S]*?\1/g, "");
  const targets = [];
  for (const match of prose.matchAll(/(?<!\\)\]\(/g))
    targets.push(destination(prose, match.index + 2));
  // Referanselenker, også bilder og definisjoner som brukes flere steder.
  for (const match of prose.matchAll(/^ {0,3}\[(?!\^)[^\]\n]+\]:\s*/gm))
    targets.push(destination(prose, match.index + match[0].length));
  return targets.filter(Boolean);
}

export async function checkMarkdownLinks(root) {
  const files = await markdownFiles(root);
  const errors = [];
  let checked = 0;
  for (const file of files) {
    for (const target of markdownTargets(await readFile(file, "utf8"))) {
      // Nettadresser, portalruter og fragmenter er ikke relative filreferanser.
      if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(target)) continue;
      const local = target.split(/[?#]/, 1)[0];
      if (!local) continue;
      checked++;
      let path;
      try {
        path = resolve(
          dirname(file),
          decodeURIComponent(local.replace(/\\([\\ ()[\]])/g, "$1")),
        );
      } catch {
        errors.push(`${relative(root, file)}: ugyldig lenke ${target}`);
        continue;
      }
      const fromRoot = relative(root, path);
      if (
        fromRoot === ".." ||
        fromRoot.startsWith("../") ||
        isAbsolute(fromRoot)
      ) {
        errors.push(
          `${relative(root, file)}: lenke utenfor prosjektet: ${target}`,
        );
        continue;
      }
      try {
        await stat(path);
      } catch {
        errors.push(`${relative(root, file)}: mangler ${target}`);
      }
    }
  }
  return { files: files.length, checked, errors };
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  const root = fileURLToPath(new URL("..", import.meta.url));
  const result = await checkMarkdownLinks(root);
  if (result.errors.length) {
    console.error(result.errors.join("\n"));
    process.exitCode = 1;
  } else
    console.log(
      `Markdown-lenker: ${result.checked} filmål i ${result.files} dokumenter finnes.`,
    );
}
