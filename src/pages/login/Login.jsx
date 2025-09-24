import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [Username, setUsername] = useState("");
  const [Password_hash, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Giả lập: nếu có backend thì gọi API, tạm thời chỉ điều hướng
    try {
      await axios.post("http://chatapi.io.vn/dangnhap", { Username : Username, Password_hash: Password_hash }
      ).then((res) => {localStorage.setItem("tokenjwt", res.data);});
      navigate("/chat");
    } catch (err) {
      alert("Sai email hoặc mật khẩu!");
    }
    console.log({ Username, Password_hash });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
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
