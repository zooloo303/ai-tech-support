import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Chat.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [conversationHistory, setConversationHistory] = useState([]);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = () => {
    api
      .get("/api/chats/")
      .then((res) => res.data)
      .then((data) => {
        setMessages(
          data.flatMap((chat) => [
            { role: "user", content: chat.prompt },
            { role: "bot", content: chat.response },
          ])
        );
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    api
      .post("/api/chats/", { prompt: message })
      .then((res) => {
        if (res.status === 201) {
          alert("Message sent!");
          setConversationHistory([
            ...conversationHistory,
            { prompt: message, response: res.data.response },
          ]);
        } else alert("Failed to send message.");
        getChats();
      })
      .catch((err) => alert(err));
    setMessage("");
  };

  return (
    <div id="chat-box" className="chat-box">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`chat-box__message chat-box__message--${message.role} ${message.role}-input-style`}
          style={{ textAlign: message.role === "user" ? "right" : "left" }}
        >
          <p>
            {message.role === "user" ? "Me" : "Bot"}: {message.content}
          </p>
        </div>
      ))}
      <form id="chat-form" onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
