import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import "@testing-library/jest-dom"; // Importera jest-dom matchers
import Search from "../components/Search";
import userEvent from "@testing-library/user-event";

describe("Testing Search Component", () => {
  // här renderar vi vår sökkomponent för varje test exekvering.
  beforeEach(() => {
    render(<Search />);
  });
  //This test checks that all the essential elements render correctly on the page.
  test("Search input is rendered correctly", () => {
    expect(screen.queryByPlaceholderText("Search...")).toBeInTheDocument(); // Input field
    expect(
      screen.queryByRole("button", { name: "Search" })
    ).toBeInTheDocument(); // Submit button
  });

  //Här vill vi kontrollera att ett felmeddelande visas när användaren gör en tom sökning
  test("error message is displayed when user try to submit an empty search", async () => {
    userEvent.type(screen.getByPlaceholderText("Search..."));
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Please write the word you want to know the definition of."
        )
      ).toBeInTheDocument();
    });
  });

   //Här vill vi kontrollera att ett felmeddelande visas när användaren skriver ett ord som inte finns i databasen
   test("error message is displayed when user try to submit an incorrect value", async () => {
    const inputElm = screen.getByPlaceholderText("Search...");
    await userEvent.type(inputElm, "kelly123");
    userEvent.click(screen.getByRole("button", { name: "Search" }));

    await waitFor(() => {
      expect(
        screen.getByText(
          "Sorry, This word was not in our library databas."
        )
      ).toBeInTheDocument();
    });
  });


  test("fetches and displays word from API correctly", async () => {
    // Simulera att skriva in "hello" i sökfältet
    await userEvent.type(screen.getByPlaceholderText("Search..."), "hello");

    // Simulera att klicka på "Search"
    await userEvent.click(screen.getByRole("button", { name: "Search" }));

    // Vänta på att data visas på skärmen
    await waitFor(() => {
      expect(screen.getByText("hello")).toBeInTheDocument();
      expect(screen.getByText("noun")).toBeInTheDocument();
      expect(
        screen.getByText(
          "A greeting (salutation) said when meeting someone or acknowledging someone’s arrival or presence."
        )
      ).toBeInTheDocument();
    });
  });

  test("the user can play the audio file if it is available", async () => {
    // Simulera att skriva in "hello" i sökfältet
    await userEvent.type(screen.getByPlaceholderText("Search..."), "hello");

    // Simulera att klicka på "Search"
    await userEvent.click(screen.getByRole("button", { name: "Search" }));
    let audio;
    //här väntar vi att översättnigs svaret visas på skärmen
    await waitFor(() => {
      //här hämtar vi audio elemntet
      //här kontrollerar vi att audio elementet är i vår dokument
      audio = screen.getByRole("audio");
      expect(audio).toBeInTheDocument();

      //här vill vi kontrollera att ljudkällan är korrekt, har rätt länk
      const source = audio.querySelector("source");
      expect(source).toHaveAttribute(
        "src",
        "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3"
      );
    });
    await userEvent.click(audio);

    expect(audio).not.toBeNull();
  });
});