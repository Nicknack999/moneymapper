import { test, expect } from "@playwright/test";

const salaries = [
  30000,
  40000,
  45000,
  55000,
  70000
];

const plans = [
  ["Plan 1", "plan1"],
  ["Plan 2", "plan2"],
  ["Plan 5", "plan5"],
  ["PG", "pg"]
];

test.describe(
  "Student loan salary matrix",
  () => {
    for (const salary of salaries) {
      test(
        `Salary matrix £${salary}`,
        async ({ page }) => {
          console.log(
            `\n===== SALARY £${salary} =====`
          );

          for (const [
            label,
            value
          ] of plans) {
            await page.goto(
              "http://localhost:5173"
            );

            // --------------------
            // Select plan
            // --------------------
            await page
              .locator("select")
              .selectOption(value);

            // --------------------
            // Fill inputs
            // --------------------
            const inputs =
              page.locator(
                'input[type="number"]'
              );

            await inputs
              .nth(0)
              .fill(String(salary));

            await inputs
              .nth(1)
              .fill("50000");

            await inputs
              .nth(2)
              .fill("30");

            await inputs
              .nth(3)
              .fill("100");

            // --------------------
            // Run tool
            // --------------------
            await page
              .getByRole("button", {
                name: /see my/i
              })
              .click();

            await page.waitForTimeout(
              3000
            );

            const body =
              (await page
                .locator("body")
                .textContent()) || "";

            // --------------------
            // API error
            // --------------------
            if (
              /couldn't run your comparison right now/i.test(
                body
              )
            ) {
              console.log(
                `Salary £${salary} | ${label}: API Error`
              );
              continue;
            }

            // --------------------
            // OUTLOOK
            // --------------------
            let zone =
              "Unknown";

            if (
              /Write-off looks likely/i.test(
                body
              )
            ) {
              zone =
                "Write-off Likely";
            } else if (
              /Finely balanced right now/i.test(
                body
              )
            ) {
              zone =
                "Balanced";
            } else if (
              /Full repayment looks likely/i.test(
                body
              )
            ) {
              zone =
                "Repayment Likely";
            }

            // --------------------
            // THRESHOLD CARD
            // --------------------
            let threshold =
              "Not found";

            const headings =
              page.locator("h3");

            const count =
              await headings.count();

            for (
              let i = 0;
              i < count;
              i++
            ) {
              const heading =
                (await headings
                  .nth(i)
                  .textContent()) || "";

              if (
                /What income may shift the outcome|What salary could change this|What income could change this/i.test(
                  heading
                )
              ) {
                const cardText =
                  (await headings
                    .nth(i)
                    .locator("..")
                    .textContent()) || "";

                console.log(
                  `RAW THRESHOLD CARD (${label} £${salary}): ${cardText}`
                );

                const moneyMatch =
                  cardText.match(
                    /Around £[\d,]+/i
                  );

                if (
                  moneyMatch
                ) {
                  threshold =
                    moneyMatch[0];
                } else if (
                  /already be above/i.test(
                    cardText
                  )
                ) {
                  threshold =
                    "Already above range";
                } else if (
                  /already be around/i.test(
                    cardText
                  )
                ) {
                  threshold =
                    "Already around range";
                } else if (
                  /already be in/i.test(
                    cardText
                  )
                ) {
                  threshold =
                    "Already in range";
                } else if (
                  /very high sustained income/i.test(
                    cardText
                  )
                ) {
                  threshold =
                    "Very high income needed";
                }

                break;
              }
            }

            console.log(
              `Salary £${salary} | ${label}: ${zone} | Threshold: ${threshold}`
            );

            expect(
              body.length
            ).toBeGreaterThan(
              0
            );
          }
        }
      );
    }
  }
);