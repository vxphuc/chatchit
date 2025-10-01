import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ChatPage from "./pages/chatpage/ChatPage";
import EditProfile from "./pages/editprofile/EditProfile";
import KOLRegister from "./pages/kol/KOLRegister";
import TraningChat from "./pages/TraningChat";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/kol-register" element={<KOLRegister />} />
        <Route path="/traning-chat" element={<TraningChat />} />
      </Routes>
    </BrowserRouter>
  );
}
