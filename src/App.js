import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Teaching from "./pages/Teaching";
import Contact from "./pages/Contact";
import Lecture from "./pages/Lecture";
import GroupMembers from "./pages/GroupMembers";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/research" element={<Research />} />
              <Route path="/publications" element={<Publications />} />
              <Route path="/group-members" element={<GroupMembers />} />
              <Route path="/teaching" element={<Teaching />} />
              <Route path="/teaching/:lectureId" element={<Lecture />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
