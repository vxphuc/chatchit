import "./Sidebar.css";

export default function Sidebar({ chats, activeChat, setActiveChat, newChat }) {
  return (
    <div className="sidebar">
      {/* Nút tạo chat mới */}
      <button onClick={newChat} className="new-chat-btn">
        + Cuộc trò chuyện mới
      </button>

      {/* Danh sách chat */}
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setActiveChat(chat.id)}
            className={`chat-item ${activeChat === chat.id ? "active" : ""}`}
          >
            {chat.title}
          </div>
        ))}
      </div>
      
      {/* Góc dưới sidebar: chỉnh sửa thông tin cá nhân */}
      <div className="user-settings">
        <button
          className="user-settings-btn"
          onClick={() => (window.location.href = "/salary-koc")}
        >
          ⚙️ Doanh thu của KOC
        </button>
      </div>
      <div className="user-settings">
        <button
          className="user-settings-btn"
          onClick={() => (window.location.href = "/profile")}
        >
          ⚙️ Chỉnh sửa thông tin
        </button>
      </div>
      <div className="user-settings">
        <button
          className="user-settings-btn"
          onClick={() => (window.location.href = "/Discount")}
        >
          🌟 Xem chương trình khuyến mãi
        </button>
      </div>
      <div className="user-settings">
        <button
          className="user-settings-btn"
          onClick={() => (window.location.href = "/JoinedEvents")}
        >
          ✨ danh sách mã giảm giá
        </button>
      </div>
    </div>
  );
}
