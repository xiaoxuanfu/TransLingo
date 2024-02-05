'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RecordingButton from '../../components/RecordingButton';



export default function RegistrationPage() {
    const [audioState, setAudioState] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [recording, setRecording] = useState(false);
    
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();
    
    
    const handleAudioStateChange = (newValue) => {
      setAudioState(newValue);
    };
    const handleRegister = async () => {
    

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      console.log("HandleRegister: ", audioState);

      formData.append('audiofile', audioState, "audiofile");
        

      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      // console.log(response)
      const data = await response.body;
      // console.log(data); // Handle the response from the server as needed
      setError(null); // Clear the error message
      router.push('/login');
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle the error, e.g., show an error message to the user
      setError("Error during registration"); // Set the error message
    }
  };

  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-blue-500">Register</h1>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        <form className="space-y-4">
          <div>
            <label className="label">
              <span className="text-base label-text text-zinc-700 -mb-2">Name</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white rounded-md border-blue-500 focus:border-blue-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-zinc-700 -mb-2">Email</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered bg-white rounded-md border-blue-500 focus:border-blue-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-zinc-700 -mb-2">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered bg-white rounded-md border-blue-500 focus:border-blue-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='text-xl text-center justify-around py-4'>
            Record the text to make our model adopt your voice!
          </div>
          <div className='text-center text-xl m-6 underline underline-offset-2'>
            The quick brown fox jumps over the lazy dog.

          </div>
          <div className='items-center justify-center text-center'>
            <RecordingButton 
            className="items-center justify-center text-center"
            onStateChange={handleAudioStateChange} />
          </div>
          <div>
            <button
              type="button"
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
