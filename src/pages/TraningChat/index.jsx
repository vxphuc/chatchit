import { useState } from "react";
import "./style.css";
import axios from "axios";
export default function TraningChat() {
    const [data, setData] = useState({
        prompt_Name: "",
        prompt_Text: "",
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
                <input type="text" value={data.prompt_Name} onChange={(e) => setData({...data, prompt_Name: e.target.value})}/>
                <label>Nội dung Promt</label>
                <textarea value={data.prompt_Text} onChange={(e) => setData({...data, prompt_Text: e.target.value})}/>
                <label>Danh mục</label>
                <input type="text" value={data.category} onChange={(e) => setData({...data, category: e.target.value})}/>
                <button className="RegisterKol" type="submit">Gửi đào tạo</button>
            </form>
        </div>
    );
}