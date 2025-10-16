import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { getToken, getUserInfo } from "../../compoment/auth";
import "./DiscountDetails.css";

export default function DiscountDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = getToken();

    // State cho việc tải chi tiết sự kiện
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    // 2. Thêm State mới cho việc tạo mã
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            if(!token){
                setMessage("❌ Vui lòng đăng nhập để xem chi tiết.");
                setLoading(false);
                return;
            }
            try{

                const res = await axios.get(`/api/chi-tiet-su-kien?id=${id}`, {
                    headers: { Authorization: `Bearer ${token}`},
                });

                if(res.status === 200 && res.data.xemchitietsukien && res.data.xemchitietsukien.length > 0){
                    setDetails(res.data.xemchitietsukien[0]); 
                } else {
                    setMessage("❌ Không tìm thấy chi tiết sự kiện.");
                }
            } catch(err){
                console.error("Lỗi khi lấy chi tiết sự kiện:", err);
                setMessage("❌ Đã xảy ra lỗi khi tải dữ liệu."); // Cần set message lỗi ở đây
            } finally{
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, token]);
    
    const handleGenerateCode = async () => {
        const user = getUserInfo();
        const kol_id = user?._id;
        if(!kol_id){
            setSubmitMessage("❌ Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
            return;
        }
        setIsSubmitting(true);
        setSubmitMessage("");
        try {
            const payload = {
                kol_id: kol_id,
                campaign_id: id, // id từ URL
            };

            await axios.post("/api/them-moi-ma-giam-gia-theo-su-kien", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            // Dựa trên Postman, API trả về '1' khi thành công, không có mã cụ thể
            setSubmitMessage("✅ Tạo mã tham gia thành công!");

        } catch (err) {
            console.error("Lỗi khi tạo mã:", err);
            const errorMessage = err.response?.data?.message || "Đã xảy ra lỗi không xác định.";
            setSubmitMessage(`❌ Lỗi: ${errorMessage}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    if (loading) {
        return <div className="details-container"><p>Đang tải chi tiết...</p></div>;
    }
    if (message) {
        return <div className="details-container"><p className="message">{message}</p></div>;
    }
    if (!details) {
        // Có thể hiển thị thông báo thay vì null để người dùng biết
        return <div className="details-container"><p>Không có dữ liệu để hiển thị.</p></div>;
    }

    return (
        <div className="details-container">
          <div className="details-card">
            <h2>Chi Tiết Sự Kiện: {details.name}</h2>
            <div className="detail-item"><strong>Mô tả:</strong> {details.description}</div>
            <div className="detail-item"><strong>Bắt đầu:</strong> {new Date(details.start_date).toLocaleString("vi-VN")}</div>
            <div className="detail-item"><strong>Kết thúc:</strong> {new Date(details.end_date).toLocaleString("vi-VN")}</div>
            <div className="detail-item">
                <strong>Loại giảm giá:</strong> {details.discount_type === 'percentage' ? `Phần trăm (${details.discount_value}%)` : `Số tiền cố định (${Number(details.discount_value).toLocaleString('vi-VN')} VNĐ)`}
            </div>
            <div className="detail-item">
                <strong>Loại hoa hồng:</strong> {details.commission_type === 'percentage' ? `Phần trăm (${details.commission_value}%)` : `Số tiền cố định (${Number(details.commission_value).toLocaleString('vi-VN')} VNĐ)`}
            </div>
            <div className="action-section">
                <button 
                    onClick={handleGenerateCode} 
                    disabled={isSubmitting}
                    className="generate-btn"
                >
                    {isSubmitting ? 'Đang xử lý...' : '🚀 Tạo Mã Tham Gia'}
                </button>
                {submitMessage && <p className="message submit-message">{submitMessage}</p>}
            </div>
            <button onClick={() => navigate(-1)} className="back-btn">
              ⬅️ Quay lại danh sách
            </button>
          </div>
        </div>
      );
}