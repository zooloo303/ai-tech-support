import { React, useState, useEffect } from "react";
import api from "../api";
import "../styles/Chat.css";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Start loading
    api
      .post("/api/chats/", { prompt: message })
      .then((res) => {
        if (res.status === 201) {
          setIsLoading(false); // Stop loading
        } else alert("Failed to send message.");
        getChats();
      })
      .catch((err) => {
        alert(err);
        setIsLoading(false); // Stop loading
      });
    setMessage("");
  };

  return (
    <main className="container" {...props}>
      <article>
        <div id="chat-box" className="chat-box">
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-box__message chat-box__message--${message.role} ${message.role}`}
                style={{
                  textAlign: message.role === "user" ? "right" : "left",
                }}
              >
                <p>
                  {message.role === "user" ? "Me" : "Bot"}: {message.content}
                </p>
              </div>
            ))}
          </div>
          <div className="user-input">
            <form id="chat-form" onSubmit={sendMessage}>
              <input
                type="text"
                name="message"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit">Send</button>
              {isLoading && <progress />}
            </form>
          </div>
        </div>
      </article>
    </main>
  );
};

export default Chat;
