import { useState } from "react";
export default function TraningChat() {
    const [data, setData] = useState({
        name: "",
        text: "",
        category: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("chatData", JSON.stringify(data));
        alert("Đào tạo ChatGPT thành công! 🎉");
    }
    return(
        <div className="data-container">
            <h2>Đào tạo ChatGPT</h2>
            <form onSubmit={handleSubmit} className="data-form">
                <label>Tên Promt</label>
                <input type="text" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>
                <label>Nội dung Promt</label>
                <textarea value={data.text} onChange={(e) => setData({...data, text: e.target.value})}/>
            </form>
        </div>
    );
}