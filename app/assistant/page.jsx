"use client";
import ChatBox from "@/components/ChatBox";
import { useRouter } from "next/navigation";
const page = () => {
    const router = useRouter()

    const handleTranslate = () => {
        router.back();
      };
      const handleAssistant = () => {
        router.push('./assistant');
      };
    
  return (
    <main className={"bg-white flex flex-col items-center justify-center h-screen"}>
      <div className="mt-16 flex justify-between mb-4">
    <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-21 rounded-md mr-4" onClick={handleTranslate}>
      Translate
    </button>
    <button className="p-15 text-blue-500 font-bold border border-blue-500 px-4 py-2 rounded-md" onClick={handleAssistant}>
      Assistant
    </button>            
  </div>
      <ChatBox />
    </main>
  )
}

export default page