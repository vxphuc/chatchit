import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      await axios.post("/api/dangky", {
        username: username,
        email: email,
        password_hash: password,
        full_name: fullName,
        role_id: 5,
      });

      alert("Đăng ký thành công, hãy đăng nhập!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi đăng ký!");
    }
    console.log({ username, fullName, email, password, confirmPassword });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Đăng ký</h2>
      <form
        onSubmit={handleRegister}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Họ và tên"
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng ký</button>
      </form>
      <p>
        Đã có tài khoản? <Link to="/">Đăng nhập</Link>
      </p>
    </div>
  );
}
