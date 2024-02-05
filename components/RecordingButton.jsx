import React, { useState, useEffect } from 'react';

const RecordingButton = ({onStateChange}) => {
    const [childInternalValue, setChildInternalValue] = useState('');

    const [isClicked, setIsClicked] = useState(false);
    const [result, setResult] = useState();
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [userInputs, setUserInputs] = useState('');
    
    const handleInputChange = (e) => {
        // const newValue = e.target.value;
        setResult(e);

        // Pass the new value to the parent component
        onStateChange(e);
    };
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
                const audioBlob = new Blob(chunks, { type: 'audio/mp3' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const audio = new Audio(audioUrl);
                audio.onerror = function (err) {
                    console.error('Error playing audio:', err);
                };
                audio.play();
                console.log("Playing audio")
                try {
                    // setResult(audioBlob);
                    handleInputChange(audioBlob);
                }
                catch (error) {
                console.error(error);
                alert(error.message);
                }
            };
            setMediaRecorder(newMediaRecorder);
            })
            .catch(err => console.error('Error accessing microphone:', err));
    }, []);

    return (
        <div className="flex items-center justify-center">

        <div style={{ position: 'relative', width: '50px', height: '50px' }}>
            {/* Circle element */}
            <div
            className='items-center justify-center'
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                border: '2px solid black',
                boxSizing: 'border-box',
                backgroundColor: isClicked ? 'red' : 'transparent',
                cursor: 'pointer',
            }}
            onClick={recording ? stopRecording : startRecording}
            ></div>

            <svg className='items-center justify-center' fill="#000000" height="25px" width="25px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xmlnsXlink="http://www.w3.org/1999/xlink" style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        cursor: 'pointer',
                    }} onClick={recording ? stopRecording : startRecording}>
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <g>
                        <g>
                            <path d="m439.5,236c0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,70-64,126.9-142.7,126.9-78.7,0-142.7-56.9-142.7-126.9 0-11.3-9.1-20.4-20.4-20.4s-20.4,9.1-20.4,20.4c0,86.2 71.5,157.4 163.1,166.7v57.5h-23.6c-11.3,0-20.4,9.1-20.4,20.4 0,11.3 9.1,20.4 20.4,20.4h88c11.3,0 20.4-9.1 20.4-20.4 0-11.3-9.1-20.4-20.4-20.4h-23.6v-57.5c91.6-9.3 163.1-80.5 163.1-166.7z"></path>
                            <path d="m256,323.5c51,0 92.3-41.3 92.3-92.3v-127.9c0-51-41.3-92.3-92.3-92.3s-92.3,41.3-92.3,92.3v127.9c0,51 41.3,92.3 92.3,92.3zm-52.3-220.2c0-28.8 23.5-52.3 52.3-52.3s52.3,23.5 52.3,52.3v127.9c0,28.8-23.5,52.3-52.3,52.3s-52.3-23.5-52.3-52.3v-127.9z"></path>
                        </g>
                    </g>
                </g>
            </svg>
        </div>
        </div>
    );
}

export default RecordingButton;