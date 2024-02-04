import { useState } from 'react';

const Chatbox = () => {
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const handleSubmit = async () => {
    try {
      // Update #1: Clear the textarea
      setUserInput('');

      // Update #2: Show user input in the chatbox
      const newConversation = [...conversation, { role: 'user', content: userInput }];
      setConversation(newConversation);

      // Update #3: Call OpenAI API to generate response
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

      // Update #4: Show OpenAI response in the chatbox
      const updatedConversation = [...newConversation, { role: 'assistant', content: assistantReply }];
      setConversation(updatedConversation);
    } catch (error) {
      console.error('Error calling API:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div style={{ width: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <div style={{ minHeight: '200px', border: '1px solid #ccc', padding: '10px', marginBottom: '10px', overflowY: 'auto' }}>
        {conversation.map((message, index) => (
          <div key={index} style={{ marginBottom: '10px', color: message.role === 'user' ? 'blue' : 'green' }}>
            {message.content}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <textarea
          rows="2"
          style={{ flex: '1', marginRight: '10px', resize: 'none', padding: '5px' }}
          placeholder="Type here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button onClick={handleSubmit} style={{ padding: '8px', cursor: 'pointer' }}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
