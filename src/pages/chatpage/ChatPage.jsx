import { useState, useEffect } from "react";
import Sidebar from "./silebar/Sidebar";
import ChatWindow from "./chatwindow/ChatWindow";
import "./ChatPage.css";
import axios from "axios";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const newChat = () => {
    const chatId = Date.now();
    setChats([...chats, { id: chatId, title: "Cuộc trò chuyện mới", messages: [{ role: "bot", content: "Xin chào! Tôi có thể giúp gì cho bạn?" }] }]);
    setActiveChat(chatId);
  };
  // Tạo cuộc trò chuyện mới khi trang được tải lần đầu
  useEffect(() => {
    if (chats.length === 0) {
      newChat();
    }
  }, []);
  const sendMessage = async (input) => {
    if (!input || activeChat === null) return;

    // Thêm tin nhắn người dùng
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, { role: "user", content: input }] }
          : chat
      )
    );

    try {
      const token = localStorage.getItem("tokenjwt");
      console.log("Token JWT:", token);
      // Gửi request tới API backend
      const res = await axios.post("/api/chatAI", 
        { Input: input },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      const botReply = res.data?.response || "Xin lỗi, không nhận được phản hồi.";

      // Thêm phản hồi từ bot
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? { ...chat, messages: [...chat.messages, { role: "bot", content: botReply }] }
            : chat
        )
      );
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? { ...chat, messages: [...chat.messages, { role: "bot", content: "Có lỗi khi gọi API." }] }
            : chat
        )
      );
    }
  };

  const currentChat = chats.find((c) => c.id === activeChat);

  return (
    <div className="chat-page">
      <Sidebar
        chats={chats}
        activeChat={activeChat}
        setActiveChat={setActiveChat}
        newChat={newChat}
      />
      <ChatWindow currentChat={currentChat} sendMessage={sendMessage} />
    </div>
  );
}
