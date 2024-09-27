import Loading from "./Loading";
import "./Search.css";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";


export default function Search() {
  const [searchInput, setSearchInput] = useState("");
  const [translatedWord, setTranslatedWord] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const [startSearch, setStartSearch] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmpty(searchInput)) {
      setErrorMessage(
        "Please write the word you want to know the definition of."
      );
      return;
    } else {
      setErrorMessage("");
      setStartSearch(true);
    }
  };

  useEffect(() => {
    if (!startSearch) return;

    const getWords = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${searchInput}`
        );

        if (!response.ok) {
          throw new Error("Word not found");
        }

        const responseData = await response.json();
        setTranslatedWord(responseData[0]);
        console.log(responseData);
        
        if (
          responseData[0].phonetics &&
          responseData[0].phonetics.length > 0
        ) {
          setAudioUrl(responseData[0].phonetics[0].audio);
        } else {
          setAudioUrl("");
        }
      } catch (error) {
        setErrorMessage("Error fetching word, please try again later");
      
      }
      setLoading(false);
      setStartSearch(false);
    };

    getWords();
  }, [startSearch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="search-container">
        <input 
         className={`search-input ${errorMessage ? "input-error" : ""}`}
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search..."
          
        />
        <button type="submit" className="search-btn">
         Search
        </button>
        </div>
      </form>

      <p className={`error ${errorMessage ? "show" : ""}`}>{errorMessage}</p>

      {translatedWord && (
        <article className="translation-result">
          <h2>{translatedWord.word}</h2>
          {translatedWord.meanings.map((meaning, index) => (
            <div key={index}>
              <h3>{meaning.partOfSpeech}</h3>
              <ul>
                {meaning.definitions.map((definition, idx) => (
                  <li key={idx}>{definition.definition}</li>
                ))}
              </ul>
            </div>
          ))}
          {audioUrl && (
            <div className="audio-section">
              <audio controls role="audio">
                <source src={audioUrl} type="audio/mpeg" />
                Your browser dont provide soundfiles.
              </audio>
            </div>
          )}
        </article>
      )}
    </div>
  );
}
