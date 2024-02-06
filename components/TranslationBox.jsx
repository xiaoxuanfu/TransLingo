// TranslationBox.jsx
"use client";
import { useState, useEffect } from 'react';


const TranslationBox = ({ userInput, selectedLanguage }) => {
  const [translation, setTranslation] = useState('');
  const [audioElement, setAudioElement] = useState(null);

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

     /* const audioElement = speechfile.json();
      ffmpeg(audioElement)
        .toFormat('s16le')
        .audioChannels(2)
        .audioFrequency(44100)
        .audioCodec('pcm_s16le')
        .on('end', () => console.log('Finished processing'))
        .on('error', (err) => console.error('Error:', err))
        .pipe(process.stdout, { end: true });
    */
     
      };
      const playAudio = () => {
        if (audioElement) {
          console.log('play');
          audioElement.play();
        }
      };

  useEffect(() => {
    // Trigger translation when userInput changes
    if (userInput && selectedLanguage) {
      handleTranslation();
    }
  }, [userInput, selectedLanguage]);

  useEffect(() => {
    // Create an audio element for the MP3 file
    const audio = new Audio('/speech.mp3');
    setAudioElement(audio);

    // Cleanup when the component unmounts
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  return (
    <div className="w-1/2 pl-2 h-full bg-white border rounded-lg flex py-2 ">
      {translation && <p>{translation}</p>}
      <button className="absolute bottom-16 left-25 border text-sm text-blue-500 border-blue-500 rounded-md" onClick={playAudio}>Play Audio</button>

    </div>

  );
};

export default TranslationBox;
