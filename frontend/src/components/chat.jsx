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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .get("/api/current_user/")
      .then((res) => setCurrentUser(res.data.username))
      .catch((err) => alert(err));

    getChats();
  }, [searchTerm, currentUser]);

  const getChats = () => {
    api
      .get("/api/chats/")
      .then((res) => res.data)
      .then((data) => {
        let filteredData = data;
        if (currentUser) {
          // Filter the chats to only include those from the current user
          filteredData = data.filter((chat) => chat.author === currentUser);
        }
        if (searchTerm) {
          filteredData = data.filter((chat) =>
            chat.prompt.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        setMessages(
          filteredData
            .flatMap((chat) => [
              { role: "bot", content: chat.response },
              { role: "user", content: chat.prompt },
            ])
            .reverse()
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
      <div className="chat-box">
        <form className="form-chat contrast" onSubmit={sendMessage}>
          <fieldset role="group">
            <input
              type="text"
              name="message"
              placeholder="Ask your question ..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <input type="submit" value="hmmm" />
          </fieldset>
          {isLoading && <progress />}
        </form>
        <input
          className="chat-search"
          type="search"
          name="search"
          placeholder="Search the chat history"
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
      </div>
    </main>
  );
};

export default Chat;
