import React from 'react';
import { useState, useEffect } from 'react';

export interface Message {
  role: 'user' | 'system' | 'assistant';
  content: string;
}

export interface MessageItemProps {
  message: Message;
}

export function MessageItem({ message }: MessageItemProps) {
  const [text, setText] = useState<string>('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((currentText) => {
        if (currentText.length < message.content.length) {
          return message.content.slice(0, currentText.length + 1);
        } else {
          clearInterval(intervalId);
          return currentText;
        }
      });
    }, 2);

    return () => clearInterval(intervalId);
  }, [message.content]);

  return (
    <div className="mt-2.5 bg-gray-100 p-4 rounded-lg shadow">
      <div className={`font-semibold text-lg text-blue-600 mb-2`}>
        {message.role === 'user' ? 'Your input' : 'Result'}:
      </div>
      <div className="text-gray-800 text-base">{text}</div>
    </div>
  );
}
