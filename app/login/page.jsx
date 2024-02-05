'use client'

import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
 
export default function LoginPage() {
  const router = useRouter()
 
  async function handleSubmit(event) {
    event.preventDefault()
 
    const formData = new FormData(event.currentTarget)
    // const email = formData.get('email')
    // const password = formData.get('password')

    const email = "ahchew@gmail.com"
    const password = "password123"
 
    const response = await fetch('https://techfest-audio.s3.ap-southeast-1.amazonaws.com', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
     },
      body: JSON.stringify({ email, password }),
    })
 
    if (response.ok) {
      router.push('/')
    } else {
      // Handle errors
      console.log("Login failed")
    }
  }
 
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden">
    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md ring-2 ring-gray-800/50 lg:max-w-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700">DaisyUI</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <label className="label">
                    <span className="text-base label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="Email Address" required className="w-full input input-bordered" />
            </div>
            <div>
                <label className="label">
                    <span className="text-base label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="Enter Password" className="w-full input input-bordered" required />
            </div>
            <a href="#" className="text-xs text-gray-600 hover:underline hover:text-blue-600">Forget Password?</a>
            <div>
                <button className="btn btn-block">Login</button>
            </div>
        </form>
    </div>
</div>

  )
}