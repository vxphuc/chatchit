// Login.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUserInfo } from "../../compoment/auth"; // ✅ 1. Import hàm fetchUserInfo
import "./login.css";
export default function Login() {
  const [Username, setUsername] = useState("");
  const [Password_hash, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/dangnhap", {
        Username: Username,
        Password_hash: Password_hash,
      });

      if (res.data && res.data === "userName không chính xác") {
        alert("Sai tên đăng nhập!");
      } else if (res.data && res.data === "Mật khẩu không chính xác") {
        alert("Sai mật khẩu!");
      } else if (res.data && res.data.tokenjwt !== "userName không chính xác"&& res.data.tokenjwt !== "Mật khẩu không chính xác") { // Sửa điều kiện kiểm tra token
        // Lưu token
        localStorage.setItem("tokenjwt", res.data);

        // ✅ 2. Lấy và lưu thông tin người dùng ngay sau khi đăng nhập
        await fetchUserInfo(); 

        alert("Đăng nhập thành công!");
        navigate("/chat"); // Hoặc trang tạo mã giảm giá
      } else {
        alert("Tên đăng nhập hoặc mật khẩu không chính xác!");
      }
    } catch (err) {
      alert("Đã xảy ra lỗi khi đăng nhập!");
      console.error(err);
    }
  };


  return (
    <div className="login-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
      <p>
        Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
      </p>
      <p>
        Tới trang chat <Link to="/chat">chatdt</Link>
      </p>
    </div>
  );
}