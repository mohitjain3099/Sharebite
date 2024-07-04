import axios from 'axios';

/**
 * Translates the text content of the document body to the specified language using the Microsoft Translator API.
 * @param languageCode The language code to translate the text to.
 * @returns A Promise that resolves when the translation is complete.
 */
export const translate = async (languageCode: string) => {

  try {

    // Create a tree walker to traverse the text nodes in the document body.
    const textNodes = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    // Translate each text node in the document body.
    let currentNode = textNodes.nextNode();

    
    while (currentNode) {
      const originalText = currentNode.nodeValue;

      // Make a POST request to the Microsoft Translator API to translate the text content.
      const options = {
        method: 'POST',
        url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
        // Replace these with actual values
        params: {
          'to[0]': languageCode,
          'api-version': '3.0',
          profanityAction: 'NoAction',
          textType: 'plain'
        },
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': '9561c759bdmsh07cf923a568b5d3p1852dfjsn8f22dcc8d72c',
          'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
        },
        // Replace these with actual values
        data: [
          {
            Text: originalText
          }
        ]
      };

      const response = await axios.request(options);

      const translatedText = response.data[0].translations[0].text;

      currentNode.nodeValue = translatedText;

      currentNode = textNodes.nextNode();
    }
  }
  catch (error) {
    console.error('Translation error:', error);
  }
};