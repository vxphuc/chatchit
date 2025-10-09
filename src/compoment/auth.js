// ✅ auth.js
import axios from "axios";

// Lấy token đã lưu
export function getToken() {
  return localStorage.getItem("tokenjwt");
}

// Lấy thông tin người dùng (gọi API khi cần)
export async function fetchUserInfo() {
  const token = getToken();
  if (!token) return null;

  try {
    const res = await axios.get("/api/thong-tin-sau-khi-dang-nhap", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    console.log("Thông tin người dùng đã được lưu:", res.data);
    return res.data;
  } catch (err) {
    console.error("Lỗi khi lấy thông tin người dùng:", err);
    return null;
  }
}

// Lấy thông tin người dùng đã lưu sẵn
export function getUserInfo() {
  const data = localStorage.getItem("userInfo");
  return data ? JSON.parse(data) : null;
}
