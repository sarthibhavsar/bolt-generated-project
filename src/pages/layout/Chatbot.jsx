import React, { useState } from "react";
import { XMarkIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { Skeleton } from "@/components/ui/skeleton";
import {CustomInput} from '../../components/index'

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false); // State to manage chat window visibility

  const toggleChat = () => {
    setIsOpen(!isOpen); // Toggle chat window
  };
  return (
    <React.Fragment>
      <div
        className={`fixed bottom-5 right-5 flex items-center justify-center shadow-lg w-12 h-12 rounded-full cursor-pointer bg-gradient-to-r from-pink-500 to-purple-500 z-50`}
        onClick={toggleChat}
      >
        <SparklesIcon className="w-6 h-6 text-white" />
      </div>

      {isOpen && <ChatbotModal toggleChat={toggleChat} />}
    </React.Fragment>
  );
}

export default ChatBot;

function ChatbotModal({ toggleChat }) {
  return (
    <div className="fixed z-50 bg-white shadow-lg rounded-md border border-opacity-50 bottom-20 right-5 w-80 h-[600px]">
      <div
        onClick={toggleChat}
        className="absolute cursor-pointer top-3 right-3"
      >
        <XMarkIcon className="w-5 h-5 text-slate-500" />
      </div>

      <div className="flex flex-col items-center justify-between h-full gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center mt-12 space-x-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
        </div>

        {/* <Skeleton className="w-full h-12" /> */}
        <div className="w-full p-2">
        <CustomInput type="text" placeholder="Enter your query..." />
        </div>
      </div>
    </div>
  );
}
