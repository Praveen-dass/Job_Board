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
import HeroPage from "./HeroPage";
import SkillTestForm from "./Components/JobUser/SkillTestForm";
import LoginPage from "./Components/LoginPage.jsx";
import SignUpPage from "./Components/SignUpPage.jsx";import { Profile } from "./Components/JobUser/Profile";

export const Admincontext = createContext();
function App() {
  const [jobName, setjobName] = useState("");
  const [location, setLocation] = useState("");
  const [companyname, setCompanyNameInContext] = useState("");
  const [username, setUserNameContext] = useState("");

  return (
      <Admincontext.Provider
        value={{
          jobName,
          setjobName,
          location,
          setLocation,
          companyname,
          setCompanyNameInContext,
          username,
          setUserNameContext,
        }}
      >
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/post/home" element={<Home />} />
          <Route path="/postjob" element={<JobPostPage />} />
          <Route path="/getjob" element={<CompanyDetail />} />
          <Route path="/post/form" element={<PostJobForm />} />
          <Route path="/user/applyjob" element={<ApplyNow />} />
          <Route path="/post/dashboard" element={<DashBoard />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/get/review" element={<Companies />} />
          <Route path="/admin/signup" element={<AdminSignup />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/user/signup" element={<UserSignup />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route path="/job/update/:id" Component={UpdateForm} element={<UpdateForm />} />
          <Route path="/mainpage" element={<FrontPage />} />
          <Route path="/check" element={<SkillTestForm/>} />
        </Routes>
      </Admincontext.Provider>
  );
}

export default App;
