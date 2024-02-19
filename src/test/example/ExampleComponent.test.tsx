import React from "react";
import { render, screen } from "@testing-library/react";
import ExampleComponent from "./ExampleComponent";

test("renders ExampleComponent", () => {
  render(<ExampleComponent />);
  expect(screen.getByText(/hello/i)).toBeInTheDocument();
});
