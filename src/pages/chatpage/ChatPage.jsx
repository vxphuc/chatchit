import { useState } from "react";
import Sidebar from "./silebar/Sidebar";
import ChatWindow from "./chatwindow/ChatWindow";
import "./ChatPage.css";

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  const newChat = () => {
    const chatId = Date.now();
    setChats([...chats, { id: chatId, title: "Cuộc trò chuyện mới", messages: [] }]);
    setActiveChat(chatId);
  };

  const sendMessage = (input) => {
    if (!input || activeChat === null) return;

    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat
          ? { ...chat, messages: [...chat.messages, { role: "user", content: input }] }
          : chat
      )
    );

    setTimeout(() => {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === activeChat
            ? {
                ...chat,
                messages: [...chat.messages, { role: "bot", content: "Xin chào, tôi là Chat Bot 🤖" }],
              }
            : chat
        )
      );
    }, 500);
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
