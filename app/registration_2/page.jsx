'use client'
import { useState } from 'react';
import RecordingButton from '../../components/RecordingButton';

export default function RegistrationPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('confirmPassword', confirmPassword);


      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data); // Handle the response from the server as needed
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle the error, e.g., show an error message to the user
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500">Register</h1>
        <form className="space-y-4">
          <div className='text-xl text-center m-6 justify-around'>
            Record the following text to train our model!
          </div>
          <div className='text-center text-xl m-6 underline underline-offset-2'>
            A string of text

          </div>
          <div className='items-center justify-center text-center'>
            <RecordingButton className="items-center justify-center text-center"/>
          </div>
          <div>
            <button
              type="button" // Change to "submit" if you want to submit the form
              onClick={handleRegister}
              className="mt-2 btn btn-block bg-blue-500 border-blue-500 text-zinc-200 hover:bg-blue-800 hover:border-blue-800"
            >
              Register
            </button>
          </div>
          <div className="mt-2">
            <span>
              Already have an account?&nbsp;
              <a href="login" className="text-blue-500 hover:text-blue-800 hover:underline">
                Login
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
