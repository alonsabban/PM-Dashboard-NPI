# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A single product manager (the app's owner) using it personally, day to day. Not multi-tenant today, though the settings screen is built to let each user connect their own Asana/Aha personal access tokens, so a small PM team adopting it independently is plausible later.

## Product Purpose

A personal command center that pulls a PM's work across three separate tools (Asana, Aha!, Jira) into one place, so the PM has a single source of truth instead of tab-switching between systems all day. Success is fewer context switches and more trust that the dashboard reflects reality (edits here, e.g. NPI task status/due date, write straight back to Asana).

## Positioning

Not a project-management tool in its own right — it does not replace Asana/Aha/Jira, it sits on top of them as a unified read/light-edit surface plus a couple of PM-specific workflow shortcuts (creating a Master Feature directly in Aha or Jira, generating a "GINI Deck" from an NPI project). The mechanism a generic dashboard couldn't copy: it writes back to the source tools, not just displays a snapshot.

## Operating Context

- **Overview**: daily-glance triage — NPI tasks that are At Risk/Blocked, top prioritized ERs by score.
- **NPI Tasks**: tasks pulled from Asana, grouped by project; status and due date are editable inline and patch back to Asana; each project card can open a "Create GINI Deck" form (URL configured in Settings) pre-filled with the project name.
- **Prioritized ERs**: enhancement requests from Aha Portfolio, scored by a Snowflake prioritization model; sortable by score.
- **My Backlogs**: Master Features for the coming PI (Program Increment), split into "owned" vs "assisting," with a create-feature form that can target Aha! or Jira as the destination.
- **Settings**: one-time personal access token setup for Asana and Aha, plus the GINI Deck form URL. Currently a demo: tokens are stored locally and views run on sample data, ahead of the live Asana/Aha integrations being switched on.

## Capabilities and Constraints

- Two-service app: Vite/React client (`client/`) + Node server (`server/`) with `src/adapters`, `src/routes`, `src/data` — server currently serves sample/demo data, not live Asana/Aha calls.
- Domain terms that must keep their meaning (not necessarily their exact casing/wording): NPI, ER (enhancement request), PI (Program Increment), Master Feature, GINI Deck, Asana/Aha!/Jira as named integrations.
- Client-only redesign in scope; no server/API changes implied by a visual facelift.
- Undecided: whether/how this evolves into a real multi-user product; treat as out of scope for this round.

## Product Principles

1. One glance should answer "what needs me right now" — triage value (At Risk/Blocked, top ERs) is the reason to open this over the source tools.
2. Never make the dashboard feel like a second source of truth to reconcile — edits here are edits to Asana/Aha, and the UI should read as trustworthy enough to act on directly.
3. It's a tool used many times a day by one power user, not a showcase for occasional visitors — density, speed, and low friction beat marketing polish, though craft still shows in the details.
4. Respect the seams: this is an integration layer over three real external tools, not a replacement for any of them.
