import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import UploadUserImage from "./pages/UploadUserImage";
import UploadCCTVImage from "./pages/UploadCCTVImage";
import ResultPage from "./pages/ResultPage";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<UploadUserImage />} />
        <Route path="/cctv" element={<UploadCCTVImage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;