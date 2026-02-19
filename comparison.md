
# Playwright vs Chromatic: Visual Testing Comparison

## Overview
This document compares two approaches for visual testing of Storybook components: **Playwright** and **Chromatic**. It summarizes pros, cons, and estimated monthly costs for each approach, based on the team's current Storybook setup and pipeline usage.

---

# 1. Playwright Visual Tests

## Pros
- **Free to use** (open-source). No licensing fees.
- **Lower cost for scaling** across multiple browsers or viewports.
- **Full CI control**, tests run against local Storybook instance in GitHub Actions.
- **Flexible**: can extend tests to interactions, accessibility checks, and custom flows.
- **Multi-browser support**: Chrome, WebKit (though WebKit ≠ real Safari), Firefox, and other browsers supported by Playwright.
- **We can benefit from a11y and interaction tests without using Chromatic**, in this approach, we run these tests in GitHub Actions, and if they fail, we can open Storybook locally to investigate the issue and fix the tests.

## Cons
- **Requires ongoing engineering time** for maintenance, failures, updates.
- **Slower than Chromatic** because Playwright must open each page and take a snapshot for every test. But in CI there are no limits on the number of workers we can configure, so tests will be fast in CI pipeline.
- **Higher learning curve** for engineers unfamiliar with Playwright.
- **Harder debugging comparing to Chromatic**: only snapshot comparisons are available, and DOM/CSS capture is limited to the current version of the component.
- **Local reproduction requires Docker**, because Playwright generates different snapshots on different operating systems (e.g., Linux vs macOS). Since GitHub Actions uses Linux, we need to run a Linux-based Docker container locally to work with the same snapshots.
- **Updating images is more inconvenient than in Chromatic**, with Playwright you must find the test for a specific browser/viewport and rerun it with --update-snapshots, while Chromatic allows accepting new snapshots with a single click in its UI.
- **Engineers-only workflow** is acceptable: but it makes it harder for UX/PO to review visual changes.
- **Playwright visual tests can be flaky** but this is not a major issue thanks to Playwright’s retry feature.

---

# 2. Chromatic Visual Tests

## Pros
- **Very easy setup** and minimal maintenance, we only need to ensure that Storybook stories are written correctly and compiled.
- **Extremely fast**: ~2000 snapshots in 2 minutes.
- **User-friendly dashboard** for engineers, designers, POs.
- Provides **DOM, styling, and asset diff** for high-quality debugging.
- Supports browsers **Chrome, Safari, Firefox**.
- **Historical comparison**: inspect both current and previous versions.
- Built-in **a11y scanning** (official Storybook package): [catches ~57% of issues](https://storybook.js.org/docs/writing-tests/accessibility-testing#install-the-addon).
- Excellent UI for reviewing **a11y and interaction test failures**.
- **Parallel cloud infrastructure**, no need to deal with CI pipeline complexity or Docker setup (unlike in Playwright approach).
- **Storybook stories can be connected to Figma**, it requires publishing the stories to Chromatic, so it only can happen with Chromatic.
- **Easier way to resolve conflicts** through UI, and accepting or rejecting snapshots (unlike in Playwright approach, where actual snapshots should be updated through Playwright arguments and commited in git).
  - Here is great video with demo of Chromatic main features https://youtu.be/zhrboql8UuU?si=74SCkTRgtjQsRl9O&t=124

## Cons
- **Not free**; snapshot limits and costs scale with usage.
  - Enterprise pricing may be more beneficial, but it requires management involvement.
- Requires **56 story fixes**, I tried to create a demo on our PDP app, but the 56 failed stories blocked the setup.


---

# 3. Cost Comparison (Monthly Estimates)
Assumptions:
- ~675 pipeline runs per month (based on the number of “Checks” pipelines triggered last month).
  - We should adjust pipeline configuration so that Chromatic triggers only when files in `/pdp` change, reducing the number of Chromatic runs.
- ~210 Storybook stories.
- 141,750 snapshots/month = 675 runs × 210 stories
- Tests run across **2 browsers** × **3 viewports (1024px, 720px, 320px)** = **6 combinations**.

## Chromatic Cost Estimate
- 85000 snapshots → [$399](https://www.chromatic.com/pricing) (Pro package)
- Remaining 56,750 snapshots → 56,750 × $0.008 = $454
- Total cost (1 browser × 1 viewport): $853/month
- With 6 combinations: $5,118/month

> Note: Story count may grow → higher costs. Cleaning up deprecated stories will reduce costs.

## Playwright Cost Estimate
- 24 tests = 2.5 minutes
- 141,750 tests → 56,700 minutes
- GitHub Actions Linux runner: [$0.006/min](https://docs.github.com/en/billing/reference/actions-runner-pricing)
- Total cost (1 browser × 1 viewport): 56,700 × $0.006 = $340.20/month
With 6 combinations: $2,041.20/month

> Does not include engineering time (maintenance/debugging).

---

# 4. Conclusion
## **When to choose Playwright**
Choose Playwright if:
- Cost is a major concern.
- Only engineers need to review visual diffs.
- You’re okay more manual maintenance of visual tests.

Playwright is **cheaper**, flexible, but more time-consuming for QA and developers.

## **When to choose Chromatic**
Choose Chromatic if:
- You want fast, reliable, cloud-powered visual testing.
- Designers/POs need to participate in reviews.
- You want easier review, debugging and maintenance of visual tests.

Chromatic is **faster, more powerful, easier to use**, but costs more.

---

# 5. Bonus
## **Other tests which need to be implemented despite decision of tool for visual tests**
- interaction tests, which is about interacting, clicking, typing, checking, unchecking of components which helps
- a11y tests, addon which can be simply attached to current storybook and help to reduce 57% of a11y issues
