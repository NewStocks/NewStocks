"use client";

import styles from "./chat.module.css";
import React, { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage/ChatMessage";


interface Message {
  role: string;
  message: string;
}

export default function Chat() {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingMessage, setIsLoadingMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      role: "bot",
      message:
        "안녕하세요. 저는 주식 관련 뉴스에 대해 알려주는 챗봇입니다. 뉴스에 대해 궁금한 점이 있으면 물어보세요! \n\n (예: 삼성전자 관련 뉴스를 알려줘)",
    }
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [chatHistory]);

  const handleClick = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();

    const api_url = "http://localhost:8000/chat";
    const data = {
      message: message,
      history: "", 
    };

    if (message.trim() === "") {
      setMessage("");
      return;
    }

    if (isLoadingMessage) {
      setMessage("");
      return; 
    }

    try {
      setIsLoadingMessage(true);
      setChatHistory((prev) => [...prev, { role: "human", message: message }]);

      setMessage("");
      const res = await fetch(api_url, {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",

        },
        body: JSON.stringify(data), 
      })
      
      if (res.status === 200 && res.body) {
        const reader = res.body.getReader();
        let decoder = new TextDecoder(); 

        let accumulatedMessage = "";

        setChatHistory((prev) => [...prev, { role: "bot", message: accumulatedMessage}])


        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }
          accumulatedMessage += decoder.decode(value)
          
          setChatHistory((prev) => [...prev.slice(0, -1), { role: "bot", message: accumulatedMessage }])

        }
 
        setIsLoadingMessage(false);
      }
    } catch (e) {
      // console.error(e);
      setIsLoadingMessage(false);
    }
  };

  return (
    <div className={styles["container"]}>
      <div className={styles["chat-container"]}>
        {chatHistory.map((chat, idx) => {
          return <ChatMessage key={idx} chatmessage={chat} />;
        })}
        <div ref={messageEndRef}></div>
      </div>
      <div className={styles["input-container"]}>
        <textarea
          name="chatmessage"
          className={styles["input-box"]}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              handleClick(e);
            }
          }}
        ></textarea>

        {isLoadingMessage ? (
          <div>
            <svg className={styles["animated-svg"]} viewBox="25 25 50 50">
              <circle r="10" cy="50" cx="50"></circle>
            </svg>
          </div>
        ) : (
          <div onClick={handleClick} className={styles["button-wrap"]}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
            >
              <path
                d="M8.03126 15.4071L14.3687 15.3983M12.1151 6.53322L22.1207 11.536C26.6108 13.7811 26.602 17.4492 22.1207 19.7031L12.1151 24.7059C5.38875 28.0735 2.63104 25.3157 5.99863 18.5894L7.48356 15.6195L5.99863 12.6497C2.63104 5.92334 5.37992 3.17446 12.1151 6.53322Z"
                stroke="white"
                strokeWidth="2.10714"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
