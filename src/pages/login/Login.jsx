import { useState } from "react";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [Username, setUsername] = useState("");
  const [Password_hash, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/dangnhap", { Username: Username, Password_hash: Password_hash })
        .then((res) => {
          if (
            res.data &&
            res.data === "userName không chính xác"
          ) {
            alert("Sai tên đăng nhập!");
          }else if(res.data &&
            res.data === "Mật khẩu không chính xác"){
              alert("Sai mật khẩu!");
            }
           else if (res.data && res.data.tokenjwt !== "userName không chính xác") {
            localStorage.setItem("tokenjwt", res.data);
            alert("Đăng nhập thành công!");
            navigate("/chat");
          }
        });
      } catch (err) {
      alert("tên đăng nhập hoặc mật khẩu không chính xác!");
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
