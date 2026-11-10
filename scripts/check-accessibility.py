"""Grunnkontroll av eksportert HTML. Erstatter ikke manuell WCAG-testing."""

import argparse
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Document(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path = path
        self.elements = []
        self.titles = []
        self.in_title = False

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))
        if tag == "title":
            self.titles.append("")
            self.in_title = True

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, data):
        if self.in_title:
            self.titles[-1] += data


def check(root, base):
    errors = []
    files = sorted(root.rglob("*.html"))
    if not files:
        raise SystemExit("Ingen HTML-filer. Kjør pnpm build:pages først.")
    for path in files:
        doc = Document(path)
        doc.feed(path.read_text())
        elements = doc.elements
        ids = [attrs["id"] for _, attrs in elements if attrs.get("id")]
        labels = {attrs.get("for") for tag, attrs in elements if tag == "label"}
        issues = []
        if len(doc.titles) != 1 or not doc.titles[0].strip():
            issues.append("forventer én ikke-tom sidetittel")
        if not any(tag == "html" and attrs.get("lang") for tag, attrs in elements):
            issues.append("mangler sidespråk")
        if sum(tag == "h1" for tag, _ in elements) != 1:
            issues.append("forventer én hovedoverskrift")
        if sum(tag == "main" for tag, _ in elements) != 1:
            issues.append("forventer ett main-landemerke")
        issues += [f"duplisert id: {key}" for key, n in Counter(ids).items() if n > 1]
        for tag, attrs in elements:
            if tag == "label" and attrs.get("for") and attrs["for"] not in ids:
                issues.append("etikett peker til manglende felt")
            if tag in ("input", "textarea", "select") and attrs.get("type") not in (
                "hidden", "submit", "button", "reset"
            ) and attrs.get("aria-hidden") != "true":
                if not (attrs.get("aria-label") or attrs.get("aria-labelledby") or (attrs.get("id") and attrs["id"] in labels)):
                    issues.append(f"{tag} mangler eksplisitt etikett")
            if tag == "img" and "alt" not in attrs:
                issues.append("bilde mangler alt-attributt")
            for attribute in ("aria-labelledby", "aria-describedby"):
                for target in attrs.get(attribute, "").split():
                    if target not in ids:
                        issues.append(f"{attribute} peker til manglende id: {target}")
            if tag == "a" and attrs.get("href", "").startswith("/"):
                url = urlsplit(attrs["href"])
                if url.netloc:
                    continue
                if base and not (url.path == base or url.path.startswith(base + "/")):
                    issues.append(f"lenke mangler prosjektsti: {url.path}")
                    continue
                relative = unquote(url.path[len(base):]).lstrip("/")
                target = root / relative
                if not target.is_file() and not (target / "index.html").is_file():
                    issues.append(f"lokalt lenkemål mangler: {url.path}")
        errors.extend(f"{path}: {issue}" for issue in issues)
    if errors:
        raise SystemExit("\n".join(errors))
    print(f"Grunnkontroll bestått for {len(files)} HTML-filer. Ikke en full WCAG-test.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path("out"))
    parser.add_argument("--base-path", default="")
    args = parser.parse_args()
    check(args.root, args.base_path.rstrip("/"))
