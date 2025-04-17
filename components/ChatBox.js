'use client';

import { useState } from 'react';

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { role: 'bot', text: data.reply };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  return (
    <div className="border rounded p-4 w-full max-w-xl mx-auto bg-white mt-6">
      <h2 className="text-lg font-semibold mb-2">🤖 AI Chat Assistant</h2>

      <div className="h-60 overflow-y-auto border p-2 bg-gray-50 rounded mb-4">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block px-3 py-2 rounded ${msg.role === 'user' ? 'bg-blue-200' : 'bg-green-200'}`}>
              {msg.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-gray-400">Typing...</div>}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border px-3 py-2 rounded"
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}
