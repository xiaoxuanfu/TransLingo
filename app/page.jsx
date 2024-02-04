"use client";

// Import necessary libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// This is the main component of our application
export default function Home() {
  // Define state variables for the result, recording status, and media recorder
  const [result, setResult] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  
  // This array will hold the audio data
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
                setResult(data.result);
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

  const router = useRouter();
  const handleTranslate = () => {
    router.push('/app/assistant/page');
  };

  const [userInput, setUserInput] = useState('');
  const handleEnterPress = (event) => {
    if (event.key === 'Enter') {
      // Save or process the user input here
      console.log('User input saved:', userInput);
    }
  };

  // Render the components
  return (
    <main className={"bg-white flex flex-col items-center justify-center h-screen"}>
  <div className="mt-16 flex justify-between mb-4">
    <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-21 rounded-md mr-4" onClick={handleTranslate}>
      Translate
    </button>
    <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-2 rounded-md" onClick={handleTranslate}>
      Assistant
    </button>            
  </div>

  <div className={"bg-white rounded-md shadow-md flex h-3/4 space-x-4 p-8 w-3/4"}>
  
  <form className="w-1/2 flex flex-col h-full relative">
  <textarea
    id="chat"
    rows="1"
    className="flex-grow pl-4 border text-sm text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none mb-4 py-2" // Added padding to the textarea
    placeholder="Type here..."
  ></textarea>
  <button
    type="submit"
    className="absolute bottom-0 right-0 p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
  >
    <svg
      className="w-5 h-5 rotate-90 rtl:-rotate-90"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
    >
      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
    </svg>
  </button>
</form>


<div className="w-1/2 pl-4 bg-white border rounded-lg flex items-center">
    <h2 className="text-lg">Second BOX</h2>
  </div>
</div>
  <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={recording ? stopRecording : startRecording}>
        {recording ? 'Stop Recording' : 'Start Recording'}
  </button>
</main>
  )
}