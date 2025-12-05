import React, { useState } from "react";
import axios from "axios";
import { getToken } from "../../compoment/auth";
import "./SalaryKoc.css";

export default function SalaryKoc() {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const fetchKocRevenue = async (e) => {
    e?.preventDefault();
    setError("");
    setResult(null);

    if (!date) {
      setError("Chọn ngày trước khi tìm.");
      return;
    }

    const token = getToken();
    if (!token) {
      setError("Chưa đăng nhập — không thể gọi API.");
      return;
    }

    setLoading(true);
    try {
      // input date (YYYY-MM-DD) -> API cần YYYY/MM/DD
      const formatted = date.replace(/-/g, "/");
      const url = `/api/doanh-thu-KOC?date=${formatted}`;
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResult(res.data);
    } catch (err) {
      setError(err.response?.data || err.message || "Lỗi khi gọi API");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="salary-koc">
      <h2>Doanh thu KOC</h2>
      <form onSubmit={fetchKocRevenue} className="koc-form">
        <label>
          Chọn ngày:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Đang tải..." : "Lấy doanh thu"}
        </button>
      </form>

      {error && <div className="error">{error}</div>}

      {result && (
        <div className="koc-result">
          <pre>{JSON.stringify(result, null, 2)}</pre>

          {Array.isArray(result.revenues) && (
            <table>
              <thead>
                <tr>
                  <th>KOC ID</th>
                  <th>Tên KOC</th>
                  <th>Đơn hàng</th>
                  <th>Doanh thu</th>
                  <th>Giá TB đơn</th>
                </tr>
              </thead>
              <tbody>
                {result.revenues.map((r) => (
                  <tr key={r.kocId ?? r.kocName}>
                    <td>{r.kocId}</td>
                    <td>{r.kocName}</td>
                    <td>{r.totalOrders}</td>
                    <td>{r.totalRevenue}</td>
                    <td>{r.averageOrderValue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}