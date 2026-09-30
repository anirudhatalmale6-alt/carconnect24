#!/usr/bin/env python3
"""
Stamp a content hash onto every local CSS/JS reference in the HTML pages.

WHY THIS EXISTS
---------------
nginx serves .css/.js with `expires 7d` (Cache-Control: max-age=604800).
That is good for speed, but it means a returning visitor keeps the OLD
stylesheet while receiving the NEW html. On 30 Sep 2026 that shipped a
completely unstyled stock banner to the client's phone, while every
cold-cache test I ran looked perfect.

Referencing `/styles.css?v=<sha1 of the file>` fixes it for good:
the URL changes exactly when the file changes, so browsers refetch
only when they must, and there is no version number to remember to bump.

RUN THIS BEFORE EVERY COMMIT THAT TOUCHES CSS OR JS:
    python3 tools/stamp-assets.py
"""
import hashlib
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
ASSETS = ["styles.css", "i18n.js", "site.js", "app.js", "admin.js"]


def digest(name: str) -> str | None:
    f = PUBLIC / name
    if not f.exists():
        return None
    return hashlib.sha1(f.read_bytes()).hexdigest()[:8]


def main() -> int:
    hashes = {a: digest(a) for a in ASSETS}
    missing = [a for a, h in hashes.items() if h is None]
    if missing:
        print("warning: not found, skipping: %s" % ", ".join(missing))

    changed = 0
    for page in sorted(PUBLIC.glob("*.html")):
        src = page.read_text()
        out = src
        for asset, h in hashes.items():
            if h is None:
                continue
            # matches /asset  or  /asset?v=oldhash , in href="" or src=""
            out = re.sub(
                r'(["\'])/%s(?:\?v=[0-9a-f]+)?\1' % re.escape(asset),
                r'\g<1>/%s?v=%s\g<1>' % (asset, h),
                out,
            )
        if out != src:
            page.write_text(out)
            changed += 1
            print("stamped %s" % page.name)

    print("\nhashes: " + ", ".join("%s=%s" % (a, h) for a, h in hashes.items() if h))
    print("%d page(s) updated" % changed)
    return 0


if __name__ == "__main__":
    sys.exit(main())
