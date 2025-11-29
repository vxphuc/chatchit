import { useState } from "react";
import "./ChatWindow.css";

export default function ChatWindow({ currentChat, sendMessage, startNewChat }) {
  const [input, setInput] = useState("");
  const [newChatName, setNewChatName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  const handleStartNewChat = (e) => {
    e.preventDefault();
    if (newChatName.trim() === "") return;
    if (startNewChat) {
      startNewChat(newChatName);
      setNewChatName("");
    }
    if (!currentChat) {
      <div className="no-chat-selected">
        <p className="name-chat">
          Hãy tên cho cuộc trò chuyện mới.
        </p>
        <form onSubmit={handleStartNewChat} className="input-area-newchat">
          <input 
            className="btn-mess"
            value={newChatName}
            onChange={(e) => setNewChatName(e.target.value)}
            placeholder="Nhập tên cuộc trò chuyện..."
          />
          <button type="submit" className="sub-mess">
            Bắt đầu Chat
          </button>
        </form>
      </div>
    }
  };

  return (
    <div className="chat-window">
      <div className="messages">
        {currentChat ? (
          currentChat.messages.map((msg, i) => (
            <div key={i} style={{ textAlign: msg.role === "user" ? "right" : "left" }}>
              <p
                style={{
                  background: msg.role === "user" ? "#0084ff" : "#e0e0e0",
                  color: msg.role === "user" ? "#fff" : "#000",
                  display: "inline-block",
                  padding: "10px",
                  borderRadius: "10px",
                  margin: "5px",
                  whiteSpace: "pre-line",
                }}
              >
                {msg.content.replace(/\*\*/g, "\n")}
              </p>
            </div>
          ))
        ) : (
          <p style={{ color: "#777" }}>Hãy chọn hoặc tạo một cuộc trò chuyện mới.</p>
        )}
      </div>

      {currentChat && (
        <form onSubmit={handleSubmit} className="input-area">
          <input
            className="btn-mess"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button type="submit" className="sub-mess" style={{ marginLeft: "10px" }}>
            Gửi
          </button>
        </form>
      )}
    </div>
  );
}
