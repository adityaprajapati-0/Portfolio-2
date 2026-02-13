import React, { useState, useRef, useEffect } from 'react'

const SYSTEM_PROMPT = "You are Adi, an AI version of the portfolio's creator. You are an expert in Graphic Design, Web Development, Career Guidance, and Psychology. You are friendly, insightful, and always helpful. You answer questions about these topics and also about Adi himself (the creator of this portfolio)."

const INITIAL_MESSAGES = [
  { role: 'assistant', content: "Hey! I'm Adi. Feel free to ask me anything about my work, career advice, psychology, or design!" }
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { role: 'user', content: input }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    // Simulated Response (until API key provided)
    setTimeout(() => {
      const response = getSimulatedResponse(input.toLowerCase())
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
      setIsTyping(false)
    }, 1500)
  }

  const getSimulatedResponse = (query) => {
    if (query.includes('career')) return "Career is a marathon, not a sprint. Focus on building a t-shaped skill set—deep expertise in one area (like Web Dev) and broad knowledge in others!"
    if (query.includes('psychology')) return "Psychology is at the heart of design. Understanding cognitive load and user behavior makes you a much better developer."
    if (query.includes('design')) return "Graphic design is about problem-solving visually. It's not just about making things look pretty; it's about clarity and communication."
    if (query.includes('web')) return "The web is my canvas. I love combining React's power with Three.js to create immersive experiences like this portfolio!"
    if (query.includes('who are you') || query.includes('about you')) return "I'm Adi's digital twin! I'm here to help you navigate his projects and share insights on the things he loves."
    return "That's an interesting question! Once my creator adds my API key, I'll be able to give you a much more detailed answer. For now, feel free to ask about career, design, or my tech stack!"
  }

  return (
    <div className={`chatbot-container ${isOpen ? 'active' : ''}`}>
      {/* Floating Mascot Button */}
      <button className="chat-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src="/chatbot/chatbot-removebg-preview.png" alt="Adi Chatbot" />
        <span className="online-indicator" />
      </button>

      {/* Chat Window */}
      <div className="chat-window">
        <div className="chat-header">
          <div className="chat-header-info">
            <span className="chat-name">Adi AI</span>
            <span className="chat-status">Always here to help</span>
          </div>
          <button className="close-chat" onClick={() => setIsOpen(false)}>×</button>
        </div>

        <div className="chat-messages">
          {messages.map((m, i) => (
            <div key={i} className={`message-bubble ${m.role}`}>
              {m.content}
            </div>
          ))}
          {isTyping && (
            <div className="message-bubble assistant typing">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-input-area" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" disabled={!input.trim()}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </button>
        </form>
      </div>
    </div>
  )
}
