import React from "react";
import { render } from "@testing-library/react-native";
import InfoIcons from "../InfoIcons";

describe("InfoIcons Component", () => {
  it("renders correctly with wind icon and info", () => {
    const { getByText, getByTestId } = render(
      <InfoIcons icon="wind" info="10 km/h" />,
    );

    const image = getByTestId("info-icon-image");
    expect(image.props.source).toBe(require("../../../assets/icons/wind.png"));

    expect(getByText("10 km/h")).toBeTruthy();
  });

  it("renders correctly with sun icon and info", () => {
    const { getByText, getByTestId } = render(
      <InfoIcons icon="sun" info="25°C" />,
    );

    const image = getByTestId("info-icon-image");
    expect(image.props.source).toBe(require("../../../assets/icons/sun.png"));

    expect(getByText("25°C")).toBeTruthy();
  });

  it("renders correctly with drop icon and info", () => {
    const { getByText, getByTestId } = render(
      <InfoIcons icon="drop" info="50%" />,
    );

    const image = getByTestId("info-icon-image");
    expect(image.props.source).toBe(require("../../../assets/icons/drop.png"));

    expect(getByText("50%")).toBeTruthy();
  });

  it("renders default icon when icon is not recognized", () => {
    const { getByTestId } = render(<InfoIcons icon="unknown" info="N/A" />);

    const image = getByTestId("info-icon-image");
    expect(image.props.source).toBe(require("../../../assets/icons/wind.png"));
  });

  it("renders correctly with wind icon and info", () => {
    const { getByText, getByTestId } = render(
      <InfoIcons icon="wind" info="10 km/h" />,
    );

    const image = getByTestId("info-icon-image");
    expect(image.props.source).toBe(require("../../../assets/icons/wind.png"));

    expect(getByText("10 km/h")).toBeTruthy();
  });
});
