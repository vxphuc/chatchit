import { useState } from "react";
import "./KOLRegister.css";

export default function KOLRegister() {
  const [kol, setKol] = useState({
    bio: "",
    niche: "",
    phone: "",
    social: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("kolData", JSON.stringify(kol));
    alert("Đăng ký KOL thành công! 🎉");
  };

  return (
    <div className="kol-container">
      <h2>Đăng ký KOL</h2>
      <form onSubmit={handleSubmit} className="kol-form">
        <label>Giới thiệu bản thân</label>
        <textarea
          value={kol.bio}
          onChange={(e) => setKol({ ...kol, bio: e.target.value })}
        />

        <label>Lĩnh vực (Niche)</label>
        <input
          type="text"
          value={kol.niche}
          onChange={(e) => setKol({ ...kol, niche: e.target.value })}
        />

        <label>Số điện thoại</label>
        <input
          type="text"
          value={kol.phone}
          onChange={(e) => setKol({ ...kol, phone: e.target.value })}
        />

        <label>Link mạng xã hội</label>
        <input
          type="text"
          value={kol.social}
          onChange={(e) => setKol({ ...kol, social: e.target.value })}
        />

        <button className="RegisterKol" type="submit">Gửi đăng ký</button>
      </form>
    </div>
  );
}
