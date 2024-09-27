import { beforeEach, describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Header from "../components/Header";
describe("test Header komponent", () => {
  beforeEach(() => {
    render(<Header/>);
  });
  test("should render the correct title", () => {
    expect(screen.getByText("World Wide Library")).toBeInTheDocument();
  });

  test("should render the logo correctly", () => {
    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
  
  });
});
