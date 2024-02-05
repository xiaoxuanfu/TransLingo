// TranslationBox.jsx
"use client";
import { useState, useEffect } from 'react';

  const TranslationBox = ({ userInput, selectedLanguage }) => {
  const [translation, setTranslation] = useState('');

  const handleTranslation = async () => {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput, language: selectedLanguage }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { content } = await response.json();
      setTranslation(content);
      const speechfile = await fetch('/api/textToSpeech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: content }),
      });
      console.log(speechfile);
;      if (!speechfile.ok) {
        throw new Error(`Error: ${speechfile.statusText}`);
      }

      const audioElement = new Audio(speechfile.json());
      await audioElement.play();
  };

  useEffect(() => {
    // Trigger translation when userInput changes
    if (userInput && selectedLanguage) {
      handleTranslation();
    }
  }, [userInput, selectedLanguage]);

  return (
    <div className="w-1/2 pl-2 h-full bg-white border rounded-lg flex py-2 ">
      {translation && <p>{translation}</p>}
    </div>

  );
};

export default TranslationBox;
