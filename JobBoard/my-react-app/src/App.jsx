import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Components/JobAdmin/Home";
import JobPostPage from "./Components/JobAdmin/JobPostPage";
import CompanyDetail from "./Components/JobUser/Home";
import { createContext, useState } from "react";
import Login from "./Components/JobAdmin/login";
import FrontPage from "./Components/FrontPage";
import PostJobForm from "./Components/JobAdmin/PostJobForm";
import DashBoard from "./Components/JobAdmin/Dashboard";
import CompanyReview from "./Components/JobUser/CompanyReview";
import Companies from "./Components/JobUser/AboutCompany";
import AdminSignup from "./Components/JobAdmin/AdminSignup";
import Cart from "./Components/JobAdmin/Cart";
import UserSignup from "./Components/JobUser/UserSignup";
import UserLogin from "./Components/JobUser/Userlogin";
import AdminLogin from "./Components/JobAdmin/login";
import ApplyNow from "./Components/JobUser/ApplyNow";
import UpdateForm from "./Components/JobAdmin/UpdateForm";

export const jobcontext = createContext();
function App() {
  const [jobName, setjobName] = useState("");
  const [location, setLocation] = useState("");
  const [companyname, setCompanyNameInContext] = useState("");

  return (
    <jobcontext.Provider value={{ jobName, setjobName, location, setLocation ,companyname, setCompanyNameInContext }}>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/post/home" element={<Home />} />
        <Route path="/postjob" element={<JobPostPage />} />
        <Route path="/getjob" element={<CompanyDetail />} />
        <Route path="/post/form" element={<PostJobForm />} />
        <Route path="/user/applyjob" element={<ApplyNow />} />
        <Route path="/post/dashboard" element={<DashBoard />} />
        <Route path="cart" element={<Cart></Cart>} />
        <Route path="/get/review" element={<Companies />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/user/signup" element={<UserSignup />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/job/update" element={<UpdateForm />} />
      </Routes>
    </jobcontext.Provider>
  );
}

export default App;
