import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Teaching from "./pages/Teaching";
import Contact from "./pages/Contact";
import GroupMembers from "./pages/GroupMembers";

function App() {
  return (
    <>
      <Router>
        <Header />
        {/* Footer */}
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/publications" element={<Publications />} />
            <Route path="/group-members" element={<GroupMembers />} />
            <Route path="/teaching" element={<Teaching />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
