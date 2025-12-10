import { useState, useEffect } from "react";
import axios from "axios";
import "./GenerateCode.css"; 
import { getUserInfo, getToken } from "../../compoment/auth"; // Giữ nguyên đường dẫn auth cũ của bạn
import { useNavigate } from "react-router-dom";

// --- IMPORT SIDEBAR VÀ CSS ---
import "../chatpage/ChatPage.css"; 
import Sidebar from "../chatpage/silebar/Sidebar";
// -----------------------------

export default function GenerateCode() {
  // State để lưu danh sách chiến dịch và chiến dịch đang được chọn
  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState("");

  // State để quản lý trạng thái tải và gửi dữ liệu
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Lấy thông tin cần thiết
  const token = getToken();
  const user = getUserInfo();
  const kol_id = user?._id;

  // useEffect để tải danh sách các chiến dịch
  useEffect(() => {
    const fetchCampaigns = async () => {
      if (!token) {
        setMessage("❌ Vui lòng đăng nhập để sử dụng chức năng này.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get("/api/su-kien-giam-gia", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.status === 200 && res.data.xemsukien) {
          setCampaigns(res.data.xemsukien);
        } else {
          setMessage("🤷‍♂️ Không tìm thấy chiến dịch nào.");
        }
      } catch (err) {
        console.error("Lỗi khi tải danh sách chiến dịch:", err);
        setMessage("❌ Đã xảy ra lỗi khi tải danh sách chiến dịch.");
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, [token]);

  // Hàm xử lý khi form được gửi đi
  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!selectedCampaign) {
      setMessage("⚠️ Vui lòng chọn một chiến dịch.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const payload = {
        kol_id: kol_id,
        campaign_id: selectedCampaign,
      };

      const res = await axios.post("/api/them-moi-ma-giam-gia-theo-su-kien", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      setMessage(`✅ Tạo mã thành công! Mã mới của bạn là: ${res.data.new_code}`);

    } catch (err) {
      console.error("Lỗi khi tạo mã:", err);
      const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi không xác định.";
      setMessage(`❌ Lỗi: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Hàm chuyển hướng khi bấm tạo chat mới
  const handleNewChatRedirect = () => {
    navigate("/");
  };

  return (
    // Bọc toàn bộ trong class chat-page để chia cột
    <div className="chat-page">
      {/* Sidebar bên trái */}
      <Sidebar 
        chats={[]} 
        activeChat={null}
        setActiveChat={() => {}}
        newChat={handleNewChatRedirect} 
      />

      {/* Khu vực nội dung bên phải */}
      <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#f5f5f5", position: "relative" }}>
        
        {loading ? (
          <div className="generate-code-container">
            <p>Đang tải danh sách chiến dịch...</p>
          </div>
        ) : (
          <div className="generate-code-container">
            <form onSubmit={handleSubmit}>
              <h2>✨ Tạo Mã Giảm Giá Mới</h2>
              
              <label htmlFor="campaign-select">Chọn chiến dịch tham gia:</label>
              <select 
                id="campaign-select"
                value={selectedCampaign}
                onChange={(e) => setSelectedCampaign(e.target.value)}
                disabled={campaigns.length === 0}
              >
                <option value="">-- Vui lòng chọn --</option>
                {campaigns.map((campaign) => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.name}
                  </option>
                ))}
              </select>
              
              <button type="submit" disabled={submitting || !selectedCampaign}>
                {submitting ? 'Đang tạo...' : '🚀 Tạo Mã'}
              </button>

              {message && <p className="message">{message}</p>}
            </form>
          </div>
        )}

      </div>
    </div>
  );
}