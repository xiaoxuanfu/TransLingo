import { useState } from 'react';
import Image from 'next/image';

const Chatbox = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async () => {
    try {
      // Clear the textarea
      setUserInput('');

      // Show user input in the chatbox
      const newConversation = [...conversation, { 
        role: 'user', 
        content: userInput 
      }];
      setConversation(newConversation);

      // Call OpenAI API to generate response
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      console.log(response);
      const { content } = await response.json();

      const assistantReply = content;

      // Show OpenAI response in the chatbox
      const updatedConversation = [...newConversation, { 
        role: 'assistant', 
        content: assistantReply 
      }];
      setConversation(updatedConversation);
    } catch (error) {
      console.error('Error calling API:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    // <div className="h-full" style={{ maxHeight: '650px', width: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
    //   <div className="h-full" style={{ flex: 1, border: '1px solid #ccc', padding: '10px', marginBottom: '10px', overflowY: 'auto' }}>
    //     {conversation.map((message, index) => (
    //       <div key={index} className={message.role === "user" ?"text-right": "text-left"} style={{ marginBottom: '10px', color: message.role === 'user' ? 'blue' : 'green' }}>
    //         {message.content}
    //       </div>
    //     ))}
    //   </div>
    //   <div className='inset-x-0 bottom-0' style={{ display: 'flex'}}>
    //     <textarea
    //       rows="2"
    //       style={{ flex: '1', marginRight: '10px', resize: 'none', padding: '5px' }}
    //       placeholder="Type here..."
    //       value={userInput}
    //       onChange={(e) => setUserInput(e.target.value)}
    //     />
    //     <button type="submit" className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleSubmit} style={{ padding: '8px', cursor: 'pointer' }}>
    //       Submit
    //     </button>
    //   </div>
    // </div>
    <div className="h-full flex flex-col justify-between p-4 bg-white rounded-md shadow-md w-1/2">
      <div className="rounded-md overflow-y-auto mb-4 max-h-screen min-w-36" style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
        {conversation.map((message, index) => (
          <div key={index} className={message.role === "user" ? "text-right" : "text-left"} style={{ marginBottom: '10px', color: message.role === 'user' ? 'blue' : 'green' }}>
            <div className="flex items-center">
            {message.role === 'user' ? (
              <div className="flex items-center justify-end">
                <p className="text-right mr-2 float-right items-end">{message.content}</p>
                <div className="mr-2 inline-flex items-center items-end">
                  <Image
                    src="/tour-guide-icon.png"
                    alt="User Icon"
                    width={50}
                    height={50}
                    className=""
                  />
                </div>
              </div>
              )
              :
              (
                <div className="flex items-center justify-start">
                <div className="mr-2 inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 48 48">
<path fill="none" stroke="#00796b" stroke-linecap="round" stroke-miterlimit="10" stroke-width="3" d="M3.5 34.5C3.5 29.253 7.753 24 13 24M44.5 14.5c0 5.247-4.253 9.5-9.5 9.5M19.5 36.5L19.5 44.5M28.5 36.5L28.5 44.5"></path><path fill="#00bfa5" d="M34,37H14c-1.105,0-2-0.895-2-2V5c0-1.105,0.895-2,2-2h20c1.105,0,2,0.895,2,2v30 C36,36.105,35.105,37,34,37z"></path><path fill="#e0f2f1" d="M32,19H16c-0.552,0-1-0.448-1-1V7c0-0.552,0.448-1,1-1h16c0.552,0,1,0.448,1,1v11 C33,18.552,32.552,19,32,19z"></path><path fill="#212121" d="M18.5 9A1.5 1.5 0 1 0 18.5 12 1.5 1.5 0 1 0 18.5 9zM29.5 9A1.5 1.5 0 1 0 29.5 12 1.5 1.5 0 1 0 29.5 9z"></path><path fill="none" stroke="#212121" stroke-miterlimit="10" d="M26.5,13c0,1.381-1.119,2.5-2.5,2.5s-2.5-1.119-2.5-2.5"></path><path fill="#212121" d="M15 21H27V23H15zM32 21A1 1 0 1 0 32 23 1 1 0 1 0 32 21z"></path><path fill="#76ff03" d="M33 26A1 1 0 1 0 33 28A1 1 0 1 0 33 26Z"></path><path fill="#ffea00" d="M17 25H19V31H17z"></path><path fill="#ffea00" d="M17 25H19V31H17z" transform="rotate(-90 18 28)"></path><path fill="#212121" d="M18 35h-2c-.552 0-1-.448-1-1l0 0c0-.552.448-1 1-1h2c.552 0 1 .448 1 1l0 0C19 34.552 18.552 35 18 35zM24 35h-2c-.552 0-1-.448-1-1l0 0c0-.552.448-1 1-1h2c.552 0 1 .448 1 1l0 0C25 34.552 24.552 35 24 35z"></path><path fill="#ff3d00" d="M30.5 30A2.5 2.5 0 1 0 30.5 35A2.5 2.5 0 1 0 30.5 30Z"></path><path fill="#84ffff" d="M28 25L26 28 30 28z"></path>
</svg>
                </div>
                <p className="text-left">{message.content}</p>
              </div>
          
        )}
        {/* {message.content} */}
          </div>
          </div>
        ))}
      </div>
      <div className="flex place-items-center">
        <textarea
          rows="2"
          className='rounded-md'
          style={{ flex: '1', marginRight: '10px', resize: 'none', padding: '10px' }}
          placeholder="Type here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button className="content-center  btn btn-xs sm:btn-sm md:btn-md lg:btn-lg" onClick={handleSubmit} style={{ padding: '8px', cursor: 'pointer' }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
