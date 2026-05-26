import { expect, test } from "@playwright/test";

// Cross-browser end-to-end tests for the /admin/advanced page.
// Runs against Chromium, Firefox, and WebKit (see playwright.config.ts).
// These tests double as a WCAG 2.2 AA smoke test (skip link, focus order,
// aria-current, role=radiogroup, role=switch, polite live regions).

test.describe("admin advanced features page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/admin/advanced");
    await expect(
      page.getByRole("heading", { level: 1, name: "Advanced Features" }),
    ).toBeVisible();
  });

  test("renders 8 feature cards by default", async ({ page }) => {
    const grid = page.getByTestId("features-grid");
    await expect(grid).toBeVisible();
    await expect(grid.locator("article")).toHaveCount(8);
    await expect(page.getByTestId("features-count")).toHaveText(
      /Showing 8 of 8 features/,
    );
  });

  test("filters by category and announces count via live region", async ({
    page,
  }) => {
    await page.getByTestId("filter-security").click();
    const grid = page.getByTestId("features-grid");
    await expect(grid.locator("article")).toHaveCount(3);
    await expect(page.getByTestId("features-count")).toHaveText(
      /Showing 3 of 8 features/,
    );

    await page.getByTestId("filter-observability").click();
    await expect(grid.locator("article")).toHaveCount(2);

    await page.getByTestId("filter-all").click();
    await expect(grid.locator("article")).toHaveCount(8);
  });

  test("inline tools — cache purge runs and announces success", async ({
    page,
  }) => {
    const tool = page.getByTestId("tool-cache-purge");
    await tool.getByTestId("cache-purge-input").fill("products, collections");
    await tool.getByTestId("cache-purge-submit").click();
    await expect(tool.getByTestId("tool-result")).toContainText("Purged 2");
  });

  test("inline tools — flag toggle is keyboard accessible", async ({
    page,
  }) => {
    const tool = page.getByTestId("tool-flag-toggle");
    const switchEl = tool.getByTestId("flag-toggle-switch");

    await expect(switchEl).toHaveAttribute("aria-checked", "true");
    await switchEl.focus();
    await page.keyboard.press("Space");
    await expect(switchEl).toHaveAttribute("aria-checked", "false");
    await expect(tool.getByTestId("flag-toggle-state")).toContainText("OFF");
  });

  test("inline tools — webhook replay validates required input", async ({
    page,
  }) => {
    const tool = page.getByTestId("tool-webhook-replay");
    await tool.getByTestId("webhook-replay-submit").click();
    await expect(tool.getByTestId("tool-result")).toContainText("required");

    await tool.getByTestId("webhook-replay-id").fill("wh_01HQABC");
    await tool.getByTestId("webhook-replay-env").selectOption("production");
    await tool.getByTestId("webhook-replay-submit").click();
    await expect(tool.getByTestId("tool-result")).toContainText(
      "Replayed webhook wh_01HQABC \u2192 production",
    );
  });
});

test.describe("admin a11y primitives", () => {
  test("skip link becomes visible on focus and moves focus to main", async ({
    page,
  }) => {
    await page.goto("/admin/advanced");
    await page.keyboard.press("Tab");
    const skip = page.getByTestId("skip-link");
    await expect(skip).toBeFocused();
    await skip.press("Enter");
    await expect(page.locator("#admin-main")).toBeFocused();
  });

  test("sidebar marks the active route with aria-current=page", async ({
    page,
  }) => {
    await page.goto("/admin/advanced");
    const link = page.getByTestId("nav-advanced");
    await expect(link).toHaveAttribute("aria-current", "page");

    const overview = page.getByTestId("nav-overview");
    await expect(overview).not.toHaveAttribute("aria-current", "page");
  });

  test("filter group exposes role=radiogroup and toggles aria-checked", async ({
    page,
  }) => {
    await page.goto("/admin/advanced");
    const group = page.getByRole("radiogroup");
    await expect(group).toBeVisible();

    const all = page.getByTestId("filter-all");
    const security = page.getByTestId("filter-security");
    await expect(all).toHaveAttribute("aria-checked", "true");
    await security.click();
    await expect(security).toHaveAttribute("aria-checked", "true");
    await expect(all).toHaveAttribute("aria-checked", "false");
  });

  test("filter radiogroup supports arrow-key navigation (WCAG ARIA radio pattern)", async ({
    page,
  }) => {
    await page.goto("/admin/advanced");

    const all = page.getByTestId("filter-all");
    const platform = page.getByTestId("filter-platform");
    const commerce = page.getByTestId("filter-commerce");

    await all.focus();
    await expect(all).toHaveAttribute("aria-checked", "true");
    await expect(all).toHaveAttribute("tabindex", "0");
    await expect(platform).toHaveAttribute("tabindex", "-1");

    await page.keyboard.press("ArrowRight");
    await expect(platform).toBeFocused();
    await expect(platform).toHaveAttribute("aria-checked", "true");
    await expect(all).toHaveAttribute("aria-checked", "false");

    await page.keyboard.press("ArrowRight");
    await expect(commerce).toBeFocused();
    await expect(commerce).toHaveAttribute("aria-checked", "true");

    await page.keyboard.press("ArrowLeft");
    await expect(platform).toBeFocused();
    await expect(platform).toHaveAttribute("aria-checked", "true");

    await page.keyboard.press("End");
    const last = page.getByTestId("filter-developer");
    await expect(last).toBeFocused();
    await expect(last).toHaveAttribute("aria-checked", "true");

    await page.keyboard.press("Home");
    await expect(all).toBeFocused();
    await expect(all).toHaveAttribute("aria-checked", "true");
  });
});
