"use client";

// Import necessary libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputArea from "../components/InputArea";
import TranslationBox from "@/components/TranslationBox";

export default function Home() {
  // Define state variables for the result, recording status, and media recorder
  const [result, setResult] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [userInputs, setUserInputs] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default language

  // Function to start recording
  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  // Function to stop recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  // this array holds audio data
  let chunks = [];
  // This useEffect hook sets up the media recorder when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          const newMediaRecorder = new MediaRecorder(stream);
          newMediaRecorder.onstart = () => {
            chunks = [];
          };
          newMediaRecorder.ondataavailable = e => {
            chunks.push(e.data);
          };
          newMediaRecorder.onstop = async () => {
            const audioBlob = new Blob(chunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.onerror = function (err) {
              console.error('Error playing audio:', err);
            };
            audio.play();
            try {
              const reader = new FileReader();
              reader.readAsDataURL(audioBlob);
              
              reader.onloadend = async function () {
                const base64Audio = reader.result.split(',')[1]; // Remove the data URL prefix
                const response = await fetch("/api/speechToText", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ audio: base64Audio }),
                });
                const data = await response.json();
                if (response.status !== 200) {
                  throw data.error || new Error(`Request failed with status ${response.status}`);
                }
                setResult(data.result); // obtain the transcribed text
                setUserInputs(data.result);
              }
            } catch (error) {
              console.error(error);
              alert(error.message);
            }
          };
          setMediaRecorder(newMediaRecorder);
        })
        .catch(err => console.error('Error accessing microphone:', err));
      }
  }, []);


  // routing for changing pages
  const router = useRouter();
  const handleTranslate = () => {
    router.push('./');
  };

  const handleAssistant = () => {
    router.push('/assistant');
  };

  const handleUserInputSubmit = (result) => {
    setUserInputs(result); // Set the user input to the state
  };

  // for the language selection
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);    
    // handleUserInputSubmit(userInputs);
    
  };
  
  // Render the components
  return (  
    <main className="bg-white flex flex-col items-center justify-center h-screen">
      <div className="mt-16 flex justify-between mb-4">
        <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-2 rounded-md mr-4" onClick={handleTranslate}>
          Translate
        </button>
        <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-2 rounded-md" onClick={handleAssistant}>
          Assistant
        </button>            
      </div>
      <div className="space-x-4 flex">
              <select className="select text-sm" 
              onChange={(e) => handleLanguageChange(e.target.value)}
              value={selectedLanguage}>
                <option value="english">English</option>
                <option value="chinese">Chinese</option>
                <option value="japanese">Japanese</option>
                <option value="korean">Korean</option>
                <option value="french">French</option>
              </select>
        </div>
      <div className={"bg-white rounded-md shadow-md flex h-3/4 space-x-4 p-8 w-3/4"}>
      <InputArea onUserInputSubmit={handleUserInputSubmit} output = {userInputs} />
      <button
          type="microphone"
          className="absolute bottom-12 p-2 mb-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          onClick={recording ? stopRecording : startRecording}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="currentColor"
            className="bi bi-mic-fill justify-center"
            viewBox="0 0 16 16"
          >
            <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0z" />
            <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
          </svg>
        </button>
        
      <TranslationBox userInput={userInputs} selectedLanguage={selectedLanguage}/>

  </div>
</main>
  )
}