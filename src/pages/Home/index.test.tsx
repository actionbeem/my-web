import { render, screen } from "@testing-library/react";
import Home from ".";

test("renders learn react link", () => {
  render(<Home />);
  const testElement = screen.getByText(/test/i);
  expect(testElement).toBeInTheDocument();
});
