import { rest } from 'msw';

export const handlers = [
  // Mocka GET-anropet till Free Dictionary API
  rest.get('https://api.dictionaryapi.dev/api/v2/entries/en/:word', (req, res, ctx) => {
    const { word } = req.params;

    // Simulera svar baserat på det sökta ordet
    if (word === 'hello') {
      return res(
        ctx.status(200),
        ctx.json([
          {
            word: 'hello',
            phonetics: [
              { 
                text: "/həˈloʊ/", 
                audio: "https://api.dictionaryapi.dev/media/pronunciations/en/hello-au.mp3",
                sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=75797336"
              },
              { 
                text: "/həˈloʊ/", 
                audio: "https://api.dictionaryapi.dev/media/pronunciations/en/hello-uk.mp3",
                sourceUrl: "https://commons.wikimedia.org/w/index.php?curid=9021983"
              },
              { 
                text: "/həˈloʊ/", 
                audio: "", // Ingen audio för detta phonetic
              }
            ],
            meanings: [
              {
                partOfSpeech: 'noun',
                definitions: [
                  { definition: 'A greeting or expression of goodwill.' },
                ],
              },
              {
                partOfSpeech: 'interjection',
                definitions: [
                  { definition: 'Used to express surprise or call attention.' },
                ],
              }
            ],
            license: {
              name: "CC BY-SA 3.0",
              url: "https://creativecommons.org/licenses/by-sa/3.0/"
            },
            sourceUrls: [
              "https://en.wiktionary.org/wiki/hello"
            ]
          }
        ])
      );
    }

    return res(ctx.status(404), ctx.json({ message: 'Word not found' }));
  }),
];
