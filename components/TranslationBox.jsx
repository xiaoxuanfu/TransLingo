// TranslationBox.jsx
import { useState, useEffect } from 'react';

const TranslationBox = ({ userInput }) => {
  const [translation, setTranslation] = useState('');

  const handleTranslation = async () => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const { content } = await response.json();
      setTranslation(content);
    } catch (error) {
      console.error('Translation error:', error.message);
    }
  };

  useEffect(() => {
    // Trigger translation when userInput changes
    if (userInput) {
      handleTranslation();
    }
  }, [userInput]);

  return (
    <div className="w-1/2 pl-2 h-full bg-white border rounded-lg flex py-2 ">
      <button
        type="button"
        className="p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
        onClick={handleTranslation}
      >
      </button>
      {translation && <p>{translation}</p>}
    </div>
  );
};

export default TranslationBox;
