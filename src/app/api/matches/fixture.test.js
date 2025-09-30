import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { groupByLeague } from "./service";

describe("fixture grouping", () => {
  it("groups sample fixture into leagues", () => {
    const fixturePath = path.resolve(
      process.cwd(),
      "src/app/api/matches/sample-fixtures/matches-fixture.json",
    );
    const raw = fs.readFileSync(fixturePath, "utf8");
    const matches = JSON.parse(raw);
    const grouped = groupByLeague(matches);
    expect(Array.isArray(grouped)).toBe(true);
    expect(grouped.length).toBeGreaterThan(0);
    grouped.forEach((g) => {
      expect(g).toHaveProperty("league");
      expect(Array.isArray(g.matches)).toBe(true);
      expect(g.matches.length).toBeGreaterThan(0);
    });
  });
});
