"use client";

// Import necessary libraries
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import InputArea from "../components/InputArea";

// This is the main component of our application
export default function Home() {
  // Define state variables for the result, recording status, and media recorder
  const [result, setResult] = useState();
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

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
    router.push('./');
  };
  const handleAssistant = () => {
    router.push('/assistant');
  };

  const [userInput, setUserInput] = useState('');
  // Render the components
  return (
    <main className={"bg-white flex flex-col items-center justify-center h-screen"}>
  <div className="mt-16 flex justify-between mb-4">
    <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-21 rounded-md mr-4" onClick={handleTranslate}>
      Translate
    </button>
    <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-2 rounded-md" onClick={handleAssistant}>
      Assistant
    </button>            
  </div>
  <InputArea recording={recording} startRecording={startRecording} stopRecording={stopRecording} />
</main>
  )
}