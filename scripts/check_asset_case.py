#!/usr/bin/env python3

from __future__ import annotations

import os
import re
import sys
from dataclasses import dataclass
from pathlib import Path


ASSET_EXTENSIONS = (
    "png",
    "jpg",
    "jpeg",
    "svg",
    "webp",
    "gif",
    "mp4",
    "glb",
    "gltf",
    "otf",
    "ttf",
    "woff",
    "woff2",
    "eot",
)


ASSET_RE = re.compile(
    rf"""(?x)
    (?:
      ["']            # string start
      (?P<path>\/[^"']+?\.(?:{"|".join(ASSET_EXTENSIONS)}))
      ["']            # string end
    )
    """
)


@dataclass(frozen=True)
class Ref:
    file: Path
    path: str
    line: int


def iter_code_files(root: Path) -> list[Path]:
    exts = {".ts", ".tsx", ".js", ".jsx", ".css"}
    out: list[Path] = []
    for base in ("app", "components"):
        base_dir = root / base
        if not base_dir.exists():
            continue
        for p in base_dir.rglob("*"):
            if p.is_file() and p.suffix in exts:
                out.append(p)
    return out


def find_refs(root: Path) -> list[Ref]:
    refs: list[Ref] = []
    for f in iter_code_files(root):
        try:
            text = f.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            text = f.read_text(encoding="utf-8", errors="ignore")
        for m in ASSET_RE.finditer(text):
            path = m.group("path")
            line = text.count("\n", 0, m.start()) + 1
            refs.append(Ref(file=f, path=path, line=line))
    return refs


def exact_case_path_exists(public_root: Path, url_path: str) -> tuple[bool, str | None]:
    rel = url_path.lstrip("/")
    rel = rel.split("?", 1)[0].split("#", 1)[0]
    parts = [p for p in rel.split("/") if p]
    cur = public_root
    fixed_parts: list[str] = []

    for part in parts:
        if not cur.is_dir():
            return False, None
        entries = {p.name: p for p in cur.iterdir()}
        if part in entries:
            fixed_parts.append(part)
            cur = entries[part]
            continue

        lower = part.lower()
        matches = [name for name in entries.keys() if name.lower() == lower]
        if matches:
            fixed = matches[0]
            fixed_parts.append(fixed)
            cur = entries[fixed]
            continue

        return False, None

    if cur.exists():
        corrected = "/" + "/".join(fixed_parts)
        return corrected == url_path.split("?", 1)[0].split("#", 1)[0], corrected
    return False, None


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    public_root = repo_root / "public"
    if not public_root.exists():
        print("missing public/ directory", file=sys.stderr)
        return 1

    refs = find_refs(repo_root)
    mismatches: list[tuple[Ref, str]] = []
    missing: list[Ref] = []

    for ref in refs:
        ok, corrected = exact_case_path_exists(public_root, ref.path)
        if corrected is None:
            missing.append(ref)
        elif not ok:
            mismatches.append((ref, corrected))

    if not missing and not mismatches:
        return 0

    if missing:
        print("Missing assets (path not found under public/):", file=sys.stderr)
        for ref in missing[:50]:
            print(f"- {ref.file}:{ref.line} -> {ref.path}", file=sys.stderr)
        if len(missing) > 50:
            print(f"... and {len(missing) - 50} more", file=sys.stderr)

    if mismatches:
        print("Case mismatches (works on macOS, breaks on Linux):", file=sys.stderr)
        for ref, corrected in mismatches[:50]:
            print(f"- {ref.file}:{ref.line} -> {ref.path} (should be {corrected})", file=sys.stderr)
        if len(mismatches) > 50:
            print(f"... and {len(mismatches) - 50} more", file=sys.stderr)

    return 1


if __name__ == "__main__":
    raise SystemExit(main())

