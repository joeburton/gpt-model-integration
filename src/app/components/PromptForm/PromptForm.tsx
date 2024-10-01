'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Message } from '../MessageItem';
import { MessageItem } from '../MessageItem';

export function PromptForm() {
  const [prompt, setPrompt] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (prompt.trim().length === 0) {
      return;
    }

    const newMessage: Message = {
      role: 'user',
      content: prompt.trim(),
    };

    setMessages([...messages, newMessage]);
    setPrompt('');

    try {
      const response = await fetch('/api/completions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      const json = await response.json();

      if (response.ok) {
        const aiMessage: Message = {
          content: json.data?.choices[0]?.message?.content,
          role: 'assistant',
        };
        setMessages([...messages, newMessage, aiMessage]);
      } else {
        console.warn(json?.error?.message);
      }
    } catch (error) {
      console.error('Failed to fetch AI response:', error);
    }
  };

  return (
    <>
      <form className="inputContainer" onSubmit={handleSubmit}>
        <div className="flex items-center bg-white rounded-full shadow px-4 py-2 w-full">
          <span className="text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7a7 7 0 00-7-7h14a7 7 0 00-7 7z"
              />
            </svg>
          </span>
          <textarea
            className="flex-1 bg-transparent outline-none p-2 text-gray-700 placeholder-gray-400"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setPrompt(e.target.value)
            }
            value={prompt}
            placeholder="Please enter your message..."
            rows={1}
          />
          <button
            type="submit"
            className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>
      </form>
      <div className="answers">
        {messages.map((message, i) => (
          <MessageItem key={i} message={message} />
        ))}
      </div>
    </>
  );
}
