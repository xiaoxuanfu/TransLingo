import { useEffect, useState } from 'react';

const InputArea = ({ onUserInputSubmit, output}) => {
  const [userInput, setUserInput] = useState('');

  useEffect( () => {
    if (output){
      setUserInput(output);
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent component function to handle user input
    onUserInputSubmit(userInput);
  };

  // allow user to clear chat
  const handleClearChat = () => {
    setUserInput('');
  };

  return (
    <form className="w-1/2 flex flex-col h-full relative" onSubmit={handleSubmit}>
  <textarea
    id="chat"
    rows="4"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    className="flex-grow pl-4 border text-m text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none py-2" 
    placeholder="Type here..."
    contentEditable="true"
  ></textarea>
  <button
    className="absolute bottom-6 right-10 p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100"
    onClick={handleClearChat}
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
  </button>
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
    
  )
}

export default InputArea