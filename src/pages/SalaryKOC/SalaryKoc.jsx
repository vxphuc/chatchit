import { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../../compoment/auth";
import "./SalaryKoc.css";
import "../chatpage/ChatPage.css"; 
import Sidebar from "../chatpage/silebar/Sidebar";
import { useNavigate } from "react-router-dom";

export default function SalaryKoc() {
  const [month, setMonth] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  // tự động chọn tháng hiện tại
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    setMonth(`${year}-${m}`);
  }, []);
  useEffect(() => {
    if (month) {
      fetchKocRevenue();
    }
  }, [month]);

  const fetchKocRevenue = async (e) => {
    e?.preventDefault();
    setError("");
    setResult(null);

    if (!month) {
      setError("Chọn tháng trước khi tìm.");
      return;
    }

    const token = getToken();
    if (!token) {
      setError("Chưa đăng nhập — không thể gọi API.");
      return;
    }

    setLoading(true);
    try {
      const formatted = month.replace("-", "/") + "/01";
      const url = `/api/doanh-thu-KOC?date=${formatted}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data || err.message || "Lỗi khi gọi API");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="salary-koc">
          <div className="salary-card">
            <form onSubmit={fetchKocRevenue} className="koc-form">
              <div className="form-row">
                <label className="salary-label">
                  <span className="label-title">Chọn tháng</span>
                  <input
                    type="month"
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    required
                    className="month-input"
                  />
                </label>

                <button type="submit" disabled={loading} className="fetch-btn">
                  {loading ? "Đang tải..." : "Lấy doanh thu"}
                </button>
              </div>

              <div className="form-meta">
                <p className="hint">Kết quả cho <strong>{month}</strong></p>
              </div>
            </form>
          </div>

          {error && <div className="error">{error}</div>}

          {result && (
            <div className="koc-result">
              <h2>💸 Doanh thu KOC</h2>
              {Array.isArray(result.revenues) && (
                <table className="salary-table">
                  <thead>
                    <tr>
                      <th>KOC ID</th>
                      <th>Tên KOC</th>
                      <th>Đơn hàng</th>
                      <th>Doanh thu</th>
                      <th>Giá TB đơn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.revenues.map((r) => (
                      <tr key={r.kocId ?? r.kocName}>
                        <td>{r.kocId}</td>
                        <td>{r.kocName}</td>
                        <td>{r.totalOrders}</td>
                        <td>{r.totalRevenue}</td>
                        <td>{r.averageOrderValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
          <div style={{ maxWidth: "920px", margin: "0 auto", padding: "0 18px" }}>
             <button onClick={() => navigate(-1)} className="fetch-btn" style={{ backgroundColor: '#6c757d', marginTop: '10px' }}>
                ⬅️ Quay lại
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}