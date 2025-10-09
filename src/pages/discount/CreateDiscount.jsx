import { useState } from "react";
import axios from "axios";
import "./CreateDiscount.css";
import { getUserInfo, getToken } from "../../compoment/auth"; // ✅ import auth

export default function CreateDiscount() {
  const [form, setForm] = useState({
    code: "",
    discount_value: "",
    valid_from: "",
    valid_until: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Lấy thông tin người dùng hiện tại
  const user = getUserInfo();
  const token = getToken();
  const kol_id = user?._id;
  console.log(user._id);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!kol_id) {
      setMessage("❌ Chưa đăng nhập — không thể tạo mã giảm giá!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "/api/them-moi-ma-giam-gia",
        {
          code: form.code,
          discount_value: parseFloat(form.discount_value),
          kol_id: kol_id, // ✅ tự động lấy từ localStorage
          valid_from: new Date(form.valid_from).toISOString(),
          valid_until: new Date(form.valid_until).toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        setMessage("✅ Tạo mã giảm giá thành công!");
        setForm({ code: "", discount_value: "", valid_from: "", valid_until: "" });
      } else {
        setMessage("❌ Không thể tạo mã, vui lòng thử lại.");
      }
    } catch (err) {
      console.error("Lỗi khi gửi API:", err);
      setMessage("❌ Đã xảy ra lỗi khi gửi yêu cầu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-discount-container">
      <h2>🎁 Tạo Mã Giảm Giá</h2>
      <form onSubmit={handleSubmit} className="discount-form">
        <label>Mã giảm giá (code):</label>
        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Ví dụ: giam100k"
          required
        />

        <label>Giá trị giảm (% hoặc số tiền):</label>
        <input
          type="number"
          name="discount_value"
          value={form.discount_value}
          onChange={handleChange}
          placeholder="Ví dụ: 5 hoặc 100000"
          required
        />
        <label>Ngày bắt đầu hiệu lực:</label>
        <input
          type="datetime-local"
          name="valid_from"
          value={form.valid_from}
          onChange={handleChange}
          required
        />

        <label>Ngày hết hiệu lực:</label>
        <input
          type="datetime-local"
          name="valid_until"
          value={form.valid_until}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Đang gửi..." : "Tạo mã giảm giá"}
        </button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
}
