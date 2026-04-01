import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./silebar/Sidebar";
import ChatWindow from "./chatwindow/ChatWindow";
import "./ChatPage.css";

const CHAT_API_URL =
  import.meta.env.VITE_CHAT_API_URL || "/chat-api/chat-gpt";

const getBotErrorMessage = (error) => {
  const serverMessage = error?.response?.data;

  if (typeof serverMessage === "string" && serverMessage.trim()) {
    return serverMessage;
  }

  if (!error?.response && error?.request) {
    return "Khong goi duoc API tu trinh duyet. Hay kiem tra CORS hoac proxy /chat-api.";
  }

  return "Xin loi, chua lay duoc phan hoi tu chatbot.";
};

export default function ChatPage() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);

  const newChat = () => {
    const chatId = Date.now();
    const newConversation = {
      id: chatId,
      title: "Cuoc tro chuyen moi",
      messages: [
        {
          role: "bot",
          content: "Toi co the giup gi cho ban!",
        },
      ],
    };

    setChats((prev) => [...prev, newConversation]);
    setActiveChat(chatId);
  };

  useEffect(() => {
    if (chats.length === 0) {
      newChat();
    }
  }, []);

  const sendMessage = async (input) => {
    if (!input?.trim() || activeChat === null || loading) return;

    const currentChatId = activeChat;
    const userMessage = {
      role: "user",
      content: input,
    };

    setLoading(true);
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, userMessage],
            }
          : chat
      )
    );

    try {
      const response = await axios({
        method: "post",
        url: CHAT_API_URL,
        params: {
          text: input,
        },
        responseType: "text",
      });

      let botReply = "Xin loi, khong nhan duoc phan hoi.";

      if (typeof response.data === "string" && response.data.trim()) {
        botReply = response.data.replace(/^"(.*)"$/s, "$1");
      }

      const botMessage = {
        role: "bot",
        content: botReply,
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, botMessage],
              }
            : chat
        )
      );
    } catch (error) {
      console.error("Loi khi goi API:", error);

      const botMessage = {
        role: "bot",
        content: getBotErrorMessage(error),
      };

      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
                ...chat,
                messages: [...chat.messages, botMessage],
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
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

      <ChatWindow
        currentChat={currentChat}
        sendMessage={sendMessage}
        loading={loading}
      />
    </div>
  );
}
