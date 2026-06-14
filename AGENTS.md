<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# TasteBoard Collaboration Playbook

## Project Context
- TasteBoard is a Next.js 16 App Router application.
- The current stack includes React 19, Tailwind CSS 4, and `shadcn/ui`.
- The active MVP product scope is documented in `docs/requirements.md`.

## Source Of Truth
- Use `docs/requirements.md` for product behavior, page scope, data rules, and MVP expectations.
- Use `docs/deployment.md` for release-readiness and deployment validation steps.
- Use `node_modules/next/dist/docs/` for Next.js APIs, framework patterns, routing behavior, rendering behavior, and other framework decisions.
- Use the current chat task as the highest-priority instruction for the active session when it intentionally overrides repo docs.
- Treat `README.md` as setup and deployment orientation documentation, not as the product source of truth.

## Working Agreement
- Explore first before making assumptions.
- Plan before coding for new features, architecture changes, ambiguous tasks, or scope changes.
- Only implement when the user explicitly requests implementation.
- When the user asks to review, check, or inspect work, default to identifying bugs, regressions, risks, and missing tests.
- Do not move from review into code changes unless the user asks for fixes or implementation.

## Git Authority
- Commit only after explicit user approval.
- Push only after explicit user approval.
- Do not assume permission to publish changes just because local checks pass.
- Summarize what is being committed before creating a commit when the task includes publishing work.

## Validation
- Run relevant checks before calling work complete.
- Distinguish real code issues from sandbox, network, environment, or external-service artifacts.
- Use `pnpm lint`, `pnpm test`, and `pnpm build` as the default baseline validation for app changes when relevant.
- If a check cannot be run, say so clearly and explain why.
- When working on release or deployment readiness, verify docs stay aligned with the current implemented app rather than aspirational backlog items.

## Safety And Editing Constraints
- Preserve existing user changes unless the user explicitly asks to replace or revert them.
- Avoid destructive operations such as `git reset --hard`, `git checkout --`, or file deletion unless explicitly requested.
- Prefer small, reviewable changes over large speculative rewrites.
- Keep implementation aligned with `docs/requirements.md` unless the user intentionally changes scope.
- Do not introduce unsupported product behavior that conflicts with the current requirements document.

## Communication
- Be concise, direct, and factual.
- Share short progress updates while exploring or doing substantial work.
- Explain blockers, assumptions, and tradeoffs clearly.
- When checks fail, report the failure mode and whether it reflects a product bug or an environment limitation.
