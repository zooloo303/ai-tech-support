import { React, useState, useEffect } from "react";
import IconBot from "../icons/IconBot";
import IconUser from "../icons/IconUser";
import api from "../api";
import "../styles/Chat.css";

const Chat = (props) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getChats();
  }, [searchTerm]);

  const getChats = () => {
    api
      .get("/api/chats/")
      .then((res) => res.data)
      .then((data) => {
        let filteredData = data;
        if (searchTerm) {
          filteredData = data.filter((chat) =>
            chat.prompt.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setMessages(
          filteredData.flatMap((chat) => [
            { role: "user", content: chat.prompt },
            { role: "bot", content: chat.response },
          ])
        );
      })
      .catch((err) => alert(err));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    getChats();
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
          <input
            type="search"
            name="search"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
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
                  {message.role === "user" ? <IconUser /> : <IconBot />}:{" "}
                  {message.content}
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
