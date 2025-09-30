import { useState } from "react";
import "./ChatWindow.css";

export default function ChatWindow({ currentChat, sendMessage }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
    setInput("");
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
            style={{ flex: 1, padding: "10px" }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Nhập tin nhắn..."
          />
          <button type="submit" style={{ marginLeft: "10px" }}>
            Gửi
          </button>
        </form>
      )}
    </div>
  );
}
