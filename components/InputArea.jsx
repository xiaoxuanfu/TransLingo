import { useState } from 'react';

const InputArea = ({ onUserInputSubmit, recording, startRecording, stopRecording }) => {
  const [userInput, setUserInput] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english'); // Default language

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the parent component function to handle user input
    onUserInputSubmit(userInput);
    // Clear the input after submitting
    //setUserInput('');
  };

  const handleLanguageChange = (language) => {
    // Handle language change here
    setSelectedLanguage(language);
  };

  return (
    <form className="w-1/2 flex flex-col h-full relative" onSubmit={handleSubmit}>
<div className="flex justify-end space-x-4 mb-4">
        <button size="sm" onClick={() => handleLanguageChange('english')}>English</button>
        <button size="sm" onClick={() => handleLanguageChange('chinese')}>Chinese</button>
        <select value={selectedLanguage} onChange={(value) => handleLanguageChange(value)}>
          <option value="german">German</option>
          <option value="korean">Korean</option>
          <option value="french">French</option>
        </select>
      </div>
  <textarea
    id="chat"
    rows="4"
    value={userInput}
    onChange={(e) => setUserInput(e.target.value)}
    className="flex-grow pl-4 border text-m text-gray-900 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 resize-none mb-4 py-2" 
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
  




    
  )
}

export default InputArea