import { getImageSource, getDayName } from "../utils";

describe("getImageSource", () => {
  it("returns the correct image source for sunny condition", () => {
    const result = getImageSource("sunny");
    expect(result).toBe(require("../../assets/images/sun.png"));
  });

  it("returns the correct image source for rain condition", () => {
    const result = getImageSource("rain");
    expect(result).toBe(require("../../assets/images/heavyrain.png"));
  });

  it("returns the correct image source for cloudy condition", () => {
    const result = getImageSource("cloudy");
    expect(result).toBe(require("../../assets/images/cloud.png"));
  });

  it("returns the correct image source for partly cloudy", () => {
    const result = getImageSource("partly cloudy");
    expect(result).toBe(require("../../assets/images/partlycloudy.png"));
  });

  it("returns the default image source for moderate rain", () => {
    const result = getImageSource("moderate rain");
    expect(result).toBe(require("../../assets/images/heavyrain.png"));
  });

  it("returns the default image source for mist", () => {
    const result = getImageSource("mist");
    expect(result).toBe(require("../../assets/images/mist.png"));
  });
  it("returns the default image source for overcast", () => {
    const result = getImageSource("overcast");
    expect(result).toBe(require("../../assets/images/moderaterain.png"));
  });
  it("returns the default image source for fog", () => {
    const result = getImageSource("fog");
    expect(result).toBe(require("../../assets/images/cloud.png"));
  });
  it("returns the default image source for patchy rain nearby", () => {
    const result = getImageSource("patchy rain nearby");
    expect(result).toBe(require("../../assets/images/partlycloudy.png"));
  });
  it("returns the default image source for unknown condition", () => {
    const result = getImageSource("unknown");
    expect(result).toBe(require("../../assets/images/sun.png"));
  });
});

describe("getDayName", () => {
  it("returns the correct day name for a given date string", () => {
    const result = getDayName("2023-10-01");
    expect(result).toBe("Sunday");
  });

  it("returns the correct day name for another date string", () => {
    const result = getDayName("2023-10-02");
    expect(result).toBe("Monday");
  });
});
