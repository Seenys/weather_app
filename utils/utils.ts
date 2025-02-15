export const getImageSource = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
      return require("../assets/images/sun.png");
    case "rain":
      return require("../assets/images/heavyrain.png");
    case "cloudy":
      return require("../assets/images/cloud.png");
    case "partly cloudy":
      return require("../assets/images/partlycloudy.png");
    case "mist":
      return require("../assets/images/mist.png");
    case "overcast":
      return require("../assets/images/moderaterain.png");
    case "fog":
      return require("../assets/images/cloud.png");
    default:
      return require("../assets/images/sun.png");
  }
};

export const getDayName = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "long" });
};
