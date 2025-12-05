import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import ChatPage from "./pages/chatpage/ChatPage";
import EditProfile from "./pages/editprofile/EditProfile";
import Discount from "./pages/discount/CreateDiscount";
import TraningChat from "./pages/TraningChat";
import GenerateCode from "./pages/GenerateCode/GenerateCode";
import DiscountDetails from "./pages/DiscountDetails/DiscountDetails";
import JoinedEvents from "./pages/JoinedEvents/JoinedEvents";
import SalaryKoc from "./pages/SalaryKOC/SalaryKoc";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/profile" element={<EditProfile />} />
        <Route path="/Discount" element={<Discount />} />
        <Route path="/traning-chat" element={<TraningChat />} />
        <Route path="/generate-code" element={<GenerateCode />} />
        <Route path="/discount-details/:id" element={<DiscountDetails />} />
        <Route path="/JoinedEvents" element={<JoinedEvents />} />
        <Route path="/salary-koc" element={<SalaryKoc />} />
      </Routes>
    </BrowserRouter>
  );
}
