'use client'
import { useState } from 'react';

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
          <div>
            <label className="label">
              <span className="text-base label-text text-zinc-700 -mb-2">Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered bg-white rounded-md border-blue-500 focus:border-blue-800"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="button" // Change to "submit" if you want to submit the form
              onClick={handleRegister}
              className="mt-2 btn btn-block bg-blue-500 border-blue-500 text-zinc-200 hover:bg-blue-800 hover:border-blue-800"
            >
              Next
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
