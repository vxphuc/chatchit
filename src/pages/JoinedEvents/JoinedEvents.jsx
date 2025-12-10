import { useState, useEffect } from "react";
import "./JoinedEvents.css";
import { getToken, getUserInfo } from "../../compoment/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../chatpage/ChatPage.css";
import Sidebar from "../chatpage/silebar/Sidebar";

export default function JoinedEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    
    //Thêm state mới để quản lý trạng thái
    const [copiedCode, setCopiedCode] = useState('');
    const navigate = useNavigate();
    const token = getToken();
    const user = getUserInfo();
    const kol_id = user?._id;

    useEffect(() => {
        const fetchEvents = async () => {
            if (!kol_id) {
                setMessage("❌ Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
                setLoading(false);
                return;
            }
            try {
                const res = await axios.get(`/api/ma-giam-gia-va-su-kien-tuong-ung?kol_id=${kol_id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (res.data) {
                    setEvents(res.data);
                } else {
                    setMessage("🤷‍♂️ Bạn chưa tham gia hoặc tạo mã cho sự kiện nào.");
                }
            } catch (error) {
                console.error("Error fetching events:", error);
                setMessage("Lỗi khi tải sự kiện đã tham gia.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, [kol_id, token]);

    //Tạo hàm xử lý việc sao chép
    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code).then(() => {
            setCopiedCode(code);
            setTimeout(() => {
                setCopiedCode('');
            }, 2000);
        }).catch(err => {
            console.error('Không thể sao chép:', err);
        });
    };
    if (loading) return <div className="joined-events-container"><p>Đang tải...</p></div>;
    if (message) return <div className="joined-events-container"><p className="message">{message}</p></div>;

    const handleNewChatRedirect = () => {
    navigate("/chat");
  };
    return (
    <div className="chat-page">
          <Sidebar 
            chats={[]}
            activeChat={null}
            setActiveChat={() => {}}
            newChat={handleNewChatRedirect}
          />
        <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#f5f5f5", position: "relative" }}>
        <div className="joined-events-container">
            <h2>🎟️ Các Sự Kiện Bạn Đã Tham Gia</h2>
            <table className="events-table">
                <thead>
                    <tr>
                        <th>Tên Sự Kiện</th>
                        <th>Mã Của Bạn</th>
                        <th>Giá Trị Giảm Giá (%)</th>
                        <th>Hoa Hồng (%)</th>
                        <th>Bắt Đầu</th>
                        <th>Kết Thúc</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.nameEvent}</td>
                            {/* 3. Cập nhật ô chứa mã code */}
                            <td className="code-cell">
                                <span>{event.codes}</span>
                                <button 
                                    onClick={() => handleCopyCode(event.codes)}
                                    className="copy-btn"
                                >
                                    {copiedCode === event.codes ? '✅ Đã chép' : 'Sao chép'}
                                </button>
                            </td>
                            <td>{event.discount_value}%</td>
                            <td>{event.commission_value}%</td>
                            <td>{new Date(event.start_day).toLocaleString("vi-VN")}</td>
                            <td>{new Date(event.end_day).toLocaleString("vi-VN")}</td>
                        </tr>
                    ))}
                </tbody>
                <button onClick={() => navigate(-1)} className="back-btn">
                    ⬅️ Quay lại danh sách
                </button>
            </table>
        </div>
    </div>
    </div>
    );
}