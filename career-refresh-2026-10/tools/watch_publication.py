"""Read-only verification of an already-requested push/deployment. Never publishes."""
from pathlib import Path
from datetime import datetime, timezone
import hashlib
import json
import os
import subprocess
import time
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parents[1]
REPO = Path(r"C:\Projects\blog")
TARGET = "8e5b24dd9a0bde2b9ef1eaa300eb93ca98ef22ef"
BASE = "https://www.kwanho.dev"
STATUS = ROOT / "reviews/publication-status.json"
PDF_HASH = hashlib.sha256((REPO / "public/CV.pdf").read_bytes()).hexdigest()


def get(path):
    request = urllib.request.Request(
        BASE + path,
        headers={"User-Agent": "kwanho-publication-verification", "Cache-Control": "no-cache"},
    )
    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            return response.status, response.read(), response.geturl()
    except urllib.error.HTTPError as error:
        return error.code, error.read(), error.geturl()


def write(state):
    state.update(target_commit=TARGET, observed_at=datetime.now(timezone.utc).isoformat(), mode="read-only")
    STATUS.write_text(json.dumps(state, ensure_ascii=False, indent=2), encoding="utf-8")


def main():
    deadline = time.monotonic() + 16 * 60 * 60
    previous = None
    while time.monotonic() < deadline:
        state = {"stage": "waiting-for-requested-push", "verified": False}
        try:
            # Read only. No push, fetch, reset, credential command or configuration change.
            result = subprocess.run(
                ["git", "ls-remote", "origin", "refs/heads/main"],
                cwd=REPO, capture_output=True, text=True, timeout=45,
                env={**os.environ, "GIT_TERMINAL_PROMPT": "0"},
            )
            if result.returncode != 0:
                state["stage"] = "remote-read-unavailable"
            else:
                remote = result.stdout.split()[0] if result.stdout.split() else None
                state["remote_head"] = remote
                if remote == TARGET:
                    state["stage"] = "waiting-for-deployment"
                    home_status, home, url = get("/")
                    about_status, about, _ = get("/about")
                    checks = {
                        "home_cinematic": home_status == 200 and b"cinema-intro" in home,
                        "contact_card": about_status == 200 and b"identity-object" in about,
                    }
                    if all(checks.values()):
                        api_status, api, _ = get("/api/travel")
                        data = json.loads(api) if api_status == 200 else {}
                        checks["public_atlas_read_only"] = api_status == 200 and data.get("editor") is None and len(data.get("places", [])) == 107
                        cv_status, cv, _ = get(f"/CV.pdf?v={TARGET[:8]}")
                        checks["correct_cv"] = cv_status == 200 and hashlib.sha256(cv).hexdigest() == PDF_HASH
                        contact_status, contact, _ = get("/contact.vcf")
                        checks["contact_download"] = contact_status == 200 and b"BEGIN:VCARD" in contact
                        gallery_status, _, _ = get("/photography")
                        checks["empty_gallery_unpublished"] = gallery_status == 404
                        state.update(checks=checks, url=url)
                        if all(checks.values()):
                            state.update(stage="deployment-verified", verified=True)
                            write(state)
                            print(json.dumps(state, indent=2), flush=True)
                            return 0
                    state["checks"] = checks
        except Exception as error:
            state["read_error"] = type(error).__name__
        write(state)
        marker = (state["stage"], state.get("remote_head"))
        if marker != previous:
            print(json.dumps(state, indent=2), flush=True)
            previous = marker
        time.sleep(120 if state["stage"] == "waiting-for-requested-push" else 60)
    write({"stage": "verification-window-ended", "verified": False})
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
