'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
 
export default function LoginPage() {
  const router = useRouter()
  // Initialize state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Update state variables when input values change
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  async function handleSubmit(event) {
    event.preventDefault()
    console.log("Email: ",email)
    console.log("Password: ", password)
 
    // const response = await fetch('https://techfest-audio.s3.ap-southeast-1.amazonaws.com', {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
    //     // "Access-Control-Allow-Origin": "*",
    //     // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
     },
      body: JSON.stringify({ email, password }),
    })
 

    console.log(response)
    if (response.ok) {
      console.log(response)
      console.log(response.message)
      console.log(response.audioData)
      router.push('/')
    } else {
      // Handle errors
      console.log("Login failed")
    }
  }
 
  return (
  <div className="relative flex flex-col justify-center h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-500">Translate App</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label">
              <span className="text-base label-text text-zinc-700">Email</span>
            </label>
            <input 
            type="text" 
            className="w-full input input-bordered bg-white rounded-md border-blue-500 focus:border-blue-800" 
            onChange={handleEmailChange}
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text text-zinc-700">Password</span>
            </label>
            <input type="password"
              className="w-full input input-bordered bg-white rounded-md border-blue-500 focus:border-blue-800" 
              onChange={handlePasswordChange}/>
          </div>
          {/* <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a> */}
          <div>
            <button className="mt-2 btn btn-block bg-blue-500 border-blue-500 text-zinc-200 hover:bg-blue-800 hover:border-blue-800">Login</button>
            <p className="mb-0 mt-2 pt-1 font-normal">
              Don't have an account?&nbsp;
              <a
              href="register"
              className="transition duration-150 ease-in-out text-blue-500 hover:text-blue-800 hover:underline"
              >Register</a
              >
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}