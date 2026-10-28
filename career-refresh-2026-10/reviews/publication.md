# Publication status

**Current release, 27 October:** `3f85a90d4d7907c923e4517a4d751bd1fec03605` was pushed to `main` on the user's explicit request. Remote readback matches; Vercel deployment succeeded and the live site passed the recorded checks at 11:06:32 UTC. See `profile-release-outcomes.md` and `profile-release-live-readback.json`. Public owner sign-in remains unconfigured and fails closed.

**Earlier release:** `8e5b24d` completed and was verified at 08:33:32 UTC. The following record preserves its earlier authentication wait and is historical.

Prepared local commit:

- Repository: `C:/Projects/blog`
- Branch: `main`
- Commit: `8e5b24dd9a0bde2b9ef1eaa300eb93ca98ef22ef`
- Tree: `823ba5d989a0267f01d3d94e65946c29554b5650`
- Subject: `Rebuild portfolio around cinematic motion and an accurate C++ profile`
- Author identity matches recent commits in this personal repository; no global identity or credentials were changed.
- Working tree was clean after the commit.

The user requested publication after completion. One push was started:

```text
git push origin 8e5b24dd9a0bde2b9ef1eaa300eb93ca98ef22ef:refs/heads/main
```

At the last direct observation, Git Credential Manager displayed **Connect to GitHub** and the operation was still waiting. Remote `main` remained `f8ada6a5490e015e4919ac92b7bb731ccbb2d921`. Do not report this as published.

The existing push can continue after the owner authenticates in that window. No second push, alternate API publication or credential modification was attempted.

`tools/watch_publication.py` only reads the remote ref and public website. It can record completion in `publication-status.json` after the already-running push/deployment succeeds; it cannot publish or authenticate. Its verification window is sixteen hours while the session/machine remain running.

See `publication-status.json` for the latest observation. Local build/browser verification is separate from actual deployment verification.
