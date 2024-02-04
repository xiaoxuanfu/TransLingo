import { useState } from 'react';
const InputArea = ({ recording, startRecording, stopRecording }) => {


  return (
    <div className={"bg-white rounded-md shadow-md flex h-3/4 space-x-4 p-8 w-3/4"}>
    <form className="w-1/2 flex flex-col h-full relative">
  <textarea
    id="chat"
    rows="4"
    className="flex-grow pl-4 border text-m text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none mb-4 py-2" // Added padding to the textarea
    placeholder="Type here..."
  ></textarea>

  <button
    type="submit"
    className="absolute bottom-6 right-0 p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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
  
    <button
      type="microphone"
      className="absolute bottom-20 p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
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


<div className="w-1/2 pl-4 h-full bg-white border rounded-lg flex items-center">
    <h2 className="text-lg">Second BOX</h2>
  </div>
</div>
    
  )
}

export default InputArea