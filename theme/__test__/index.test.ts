import { theme } from "../index";

describe("theme", () => {
  describe("bgWhite", () => {
    it("returns the correct RGBA value for 0 opacity", () => {
      const result = theme.bgWhite(0);
      expect(result).toBe("rgba(255, 255, 255, 0)");
    });

    it("returns the correct RGBA value for 0.5 opacity", () => {
      const result = theme.bgWhite(0.5);
      expect(result).toBe("rgba(255, 255, 255, 0.5)");
    });

    it("returns the correct RGBA value for 1 opacity", () => {
      const result = theme.bgWhite(1);
      expect(result).toBe("rgba(255, 255, 255, 1)");
    });
  });
});
