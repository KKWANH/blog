# Public GitHub skill review

This was the initial representative review. The complete follow-up covers every public repository and is recorded in `full-audit/review-matrix.md` and `full-audit/catalogue.json`.

Observed 27 October 2026. Public profile: https://github.com/KKWANH?tab=repositories

Inventory: 74 public repositories. Fifteen selected trees were inspected and pinned; representative code/README files and sampled commit authors were reviewed. Raw files were not executed. Repository language percentages, forks and account ownership were not treated as proof of professional proficiency.

## Added project contexts

| Context | Source/evidence | Appropriate skill scope |
| --- | --- | --- |
| ft_containers | `40d52a8`; README and vector/Tree/iterator headers; sampled commits by KKWANH | C++ templates, vector/stack, AVL-backed map and iterators. 42 project, not a claim of standard-library maintenance. |
| webserv | `fbceda5`; named team including kkim; KKWANH commits; C++ socket, HTTP and kqueue code | HTTP/socket team-project practice. The GitHub “PHP” headline is misleading for the relevant C++ source. No PHP skill was inferred from it. |
| 42_minishell | `988e62f`; execution/redirection/signal source, kimkwanho headers | C and Unix process/pipe/signal practice. |
| 42Philosopher | `4b44ab6`; pthread mutex code, kimkwanho headers and KKWANH commit sample | Threads/mutexes in C coursework. No newly executed correctness/deadlock test claim. |
| DES_Instrument-Cluster | `b3556e7`; Qt/QML code, D-Bus receiver and KKWANH commits | Qt/QML and D-Bus work in a SEA:ME team prototype. CAN remains project context from the team's description. No current hardware validation claim. |
| 42inception | `eb3f2e6`; Compose service configuration and image definitions | Docker Compose, NGINX and Linux project setup. Not a broad production-operations claim. |
| libasm | `0ab36cc`; authored assembly comments, string routines and Darwin syscall code | x86-64 assembly exercises. |
| Figma / UI design | Current user statement: some design ability and Figma familiarity | Basic UI design / working familiarity. No employer-specific Figma use or professional designer title inferred. |

## Deliberately bounded

- `ai-assistant` is Ariadne. The user's explicit AI-directed/configured contribution remains authoritative; RAG or its implementation stack is not restored as personal expertise.
- MarioThread credits upstream work and has mixed authorship. Qt evidence uses the clearer instrument-cluster context instead of claiming the racing game was built from scratch.
- QuantumPang2's README says the menu was added and functionality remained planned; the inspected scripts are a small scene/menu scaffold. This does not establish broad Unity/C# competence.
- Raw Python code requests for several Django/ML files returned HTTP 403. Those inaccessible files were not used to promote framework/ML proficiency; no access restriction was bypassed.
- Resource/reference forks, empty repositories and generated/vendor-heavy trees were not converted into a long skills list.

## Artifact map

- `repositories.json`: inventory metadata.
- `*-tree.json`: pinned tree listings and refs.
- `*-commit-sample.json`: sampled authorship, not exhaustive contribution attribution.
- Per-repository folders: selected readable public files.
- `selected-file-observations.json`: inspected line ranges/matches and failed reads.
- `new-skill-artwork.json`: Figma/Qt/NGINX SVG sources.

Website project evidence links pin the inspected source revisions. This review does not claim that those historical repositories were freshly built or run.
