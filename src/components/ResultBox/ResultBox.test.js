import { cleanup, render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  it("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: 100, expect: "PLN 100.00 = $28.57" },
      { amount: 20, expect: "PLN 20.00 = $5.71" },
      { amount: 200, expect: "PLN 200.00 = $57.14" },
      { amount: 345, expect: "PLN 345.00 = $98.57" },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testObj.expect);
      cleanup();
    }
  });

  it("should render proper info about conversion when USD -> PLN", () => {
    const testCases = [
      { amount: 100, expect: "$100.00 = PLN 350.00" },
      { amount: 20, expect: "$20.00 = PLN 70.00" },
      { amount: 200, expect: "$200.00 = PLN 700.00" },
      { amount: 345, expect: "$345.00 = PLN 1,207.50" },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testObj.expect);
      cleanup();
    }
  });

  it("should render proper info about conversion when PLN -> PLN or USD -> USD", () => {
    const testCases = [
      {
        amount: 100,
        from: "PLN",
        to: "PLN",
        expect: "PLN 100.00 = PLN 100.00",
      },
      { amount: 20, from: "PLN", to: "PLN", expect: "PLN 20.00 = PLN 20.00" },
      { amount: 200, from: "USD", to: "USD", expect: "$200.00 = $200.00" },
      { amount: 345, from: "USD", to: "USD", expect: "$345.00 = $345.00" },
    ];

    for (const testObj of testCases) {
      render(
        <ResultBox
          from={testObj.from}
          to={testObj.to}
          amount={testObj.amount}
        />
      );
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testObj.expect);
      cleanup();
    }
  });

  it('should render "Wrong value..." error when amount is lower than zero', () => {
    render(<ResultBox from="PLN" to="USD" amount={-10} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("Wrong value...");
  });
});
