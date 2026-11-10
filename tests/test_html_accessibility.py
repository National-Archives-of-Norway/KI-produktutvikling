"""Regresjon: feilsider må ikke få tom eller duplisert sidetittel i eksporten."""
import contextlib
import importlib.util
import io
from pathlib import Path
from tempfile import TemporaryDirectory
import unittest

spec = importlib.util.spec_from_file_location(
    "html_check", Path(__file__).resolve().parents[1] / "scripts/check-accessibility.py"
)
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class ExportTitles(unittest.TestCase):
    def check_title(self, titles):
        with TemporaryDirectory() as folder:
            root = Path(folder)
            (root / "404.html").write_text(
                '<html lang="nb"><head>' + titles
                + '</head><body><main><h1>Fant ikke siden</h1></main></body></html>'
            )
            with contextlib.redirect_stdout(io.StringIO()):
                module.check(root, "")

    def test_single_descriptive_title_is_accepted(self):
        self.check_title("<title>Fant ikke siden | KI-Produktutvikling</title>")

    def test_duplicate_fallback_titles_are_rejected(self):
        with self.assertRaisesRegex(SystemExit, "én ikke-tom sidetittel"):
            self.check_title("<title>KI-Produktutvikling</title><title>404</title>")

    def test_missing_or_blank_titles_are_rejected(self):
        for title in ["", "<title> </title>"]:
            with self.subTest(title=title), self.assertRaisesRegex(
                SystemExit, "én ikke-tom sidetittel"
            ):
                self.check_title(title)


if __name__ == "__main__":
    unittest.main()
