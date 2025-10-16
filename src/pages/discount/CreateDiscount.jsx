import { useState, useEffect } from "react";
import axios from "axios";
import "./CreateDiscount.css";
import { getToken } from "../../compoment/auth";

export default function DiscountEventList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = getToken();

  useEffect(() => {
    const fetchDiscountEvents = async () => {
      if (!token) {
        setMessage("❌ Vui lòng đăng nhập để xem danh sách.");
        setLoading(false);
        return;
      }

      try {
        // API endpoint này được giả định dựa trên file C#
        const res = await axios.get("/api/su-kien-giam-gia", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        // Dựa theo cấu trúc file C#, dữ liệu nằm trong `res.data.xemsukien`
        if (res.status === 200 && res.data.xemsukien && res.data.xemsukien.length > 0) {
          setCampaigns(res.data.xemsukien); 
        } else {
          setMessage("🤷‍♂️ Hiện chưa có sự kiện giảm giá nào.");
        }
      } catch (err) {
        console.error("Lỗi khi lấy danh sách sự kiện giảm giá:", err);
        let errorMessage = "❌ Đã xảy ra lỗi khi tải dữ liệu.";
        if (err.response) {
            // Thêm chi tiết lỗi từ server nếu có
            errorMessage += `\nServer trả về: ${err.response.status} - ${JSON.stringify(err.response.data)}`;
        }
        setMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDiscountEvents();
  }, [token]);

  if (loading) {
    return <div className="discount-list-container"><p>Đang tải danh sách sự kiện...</p></div>;
  }

  if (message) {
    return <div className="discount-list-container"><p className="message" style={{ whiteSpace: 'pre-wrap' }}>{message}</p></div>;
  }

  return (
    <div className="discount-list-container">
      <h2>📜 Danh Sách Sự Kiện Giảm Giá</h2>
      <table className="discount-table">
        <thead>
          <tr>
            {/* THÊM CỘT MỚI VÀO HEADER */}
            <th>Tên Chiến Dịch</th>
            <th>Mô Tả</th>
            <th>Loại Giảm Giá</th>
            <th>Giá Trị Giảm Giá</th>
            <th>Loại Hoa Hồng</th>
            <th>Giá Trị Hoa Hồng</th>
            <th>Bắt Đầu</th>
            <th>Kết Thúc</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr key={campaign.id}>
              {/* THÊM DỮ LIỆU CHO CÁC CỘT MỚI */}
              <td>{campaign.name}</td>
              <td>{campaign.description}</td>
              <td>{campaign.discount_type === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định'}</td>
              <td>
                {campaign.discount_type === 'percentage'
                  ? `${campaign.discount_value}%`
                  : `${Number(campaign.discount_value).toLocaleString('vi-VN')} VNĐ`}
              </td>
              <td>{campaign.commission_type === 'percentage' ? 'Phần trăm (%)' : 'Số tiền cố định'}</td>
              <td>
                {campaign.commission_type === 'percentage'
                  ? `${campaign.commission_value}%`
                  : `${Number(campaign.commission_value).toLocaleString('vi-VN')} VNĐ`}
              </td>
              <td>{new Date(campaign.start_date).toLocaleString("vi-VN")}</td>
              <td>{new Date(campaign.end_date).toLocaleString("vi-VN")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}