import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import DarkMode from "../components/DarkMode/DarkMode";

describe("Test DarkMode Component", () => {
    test("renders the toggle with Sun and Moon icons", () => {
      // Rendera komponenten Darkmode
      render(<DarkMode  />);
      
      // Kontrollera att sol ikonen renderas korrekt
      const sunIcon = screen.getByAltText("Sun Icon");
      expect(sunIcon).toBeInTheDocument();
  
      // Kontrollera att mån ikonen renderas korrekt
      const moonIcon = screen.getByAltText("Moon Icon");
      expect(moonIcon).toBeInTheDocument();
  
      
    });
  
})