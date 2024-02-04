"use client";

// Import necessary libraries
import { useState, useEffect } from "react";

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
            const audioBlob = new Blob(chunks, { 
              type: 'audio/mpeg' 
            });
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
                console.log(audioBlob)

                const audiofile = new File([audioBlob], "/tmp/output.mp3", {
                  type: "audio/mp3",
                });
                const formData = new FormData();

                // Append the recording to the FormData
                formData.append('audio', audioBlob);
                
                const response = await fetch("/api/speechToText", {
                  method: "POST",
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: formData,
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
  // Render the componentz
  return (
    <main className={"bg-slate-50 flex flex-col items-center justify-center h-screen"}>
      <div className={"bg-slate-50 p-8 rounded-md shadow-md w-1/2"}>
        <h2>
          Convert audio to text <span>-&gt;</span>
        </h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4" onClick={recording ? stopRecording : startRecording} >
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <p className="text-lg">{result}</p>
      </div>
    </main>
  )
}