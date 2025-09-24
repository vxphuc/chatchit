import { useState, useEffect } from "react";
import axios from "axios"; 
import "./EditProfile.css";

export default function EditProfile() {
  const [user, setUser] = useState({
    id: "",
    username: "",
    email: "",
    name: "",
    phone: "",
    avatar: ""
  });

  // Khi vào trang thì lấy thông tin từ localStorage
  useEffect(() => {
    const fetchUserData = async () => {
      const savedUser = localStorage.getItem("tokenjwt");
      await axios
        .get("/api/thong-tin-sau-khi-dang-nhap", {
          headers: { Authorization: `Bearer ${savedUser}` },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
          const userData = {
            id: res.data.id,
            username: res.data.username,
            email: res.data.email,
            name: res.data.fullName,
            
          }
          setUser(userData);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchUserData();
  }, []);
  

  // Hàm xử lý khi lưu
  const handleSave = () => {
    localStorage.setItem("userData", JSON.stringify(user));
    alert("Thông tin đã được lưu!");
  };

  return (
    <div className="profile-container">
      <h2>Thông tin người dùng</h2>

      <div className="profile-form">
        <label>Tên hiển thị</label>
        <input
          type="text"
          value={user.name || ""}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <label>Email</label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />

        <label>Số điện thoại</label>
        <input
          type="text"
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
        />

        <label>Ảnh đại diện (URL)</label>
        <input
          type="text"
          value={user.avatar}
          onChange={(e) => setUser({ ...user, avatar: e.target.value })}
        />

        {user.avatar && (
          <div className="avatar-preview">
            <img src={user.avatar} alt="Avatar" />
          </div>
        )}

        <button className="saveinfo" onClick={handleSave}>
          Lưu thông tin
        </button>
      </div>
    </div>
  );
}
