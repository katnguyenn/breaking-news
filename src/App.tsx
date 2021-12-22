import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import SearchResult from "./Pages/SearchResult";
import "./App.css";

const Keyword = () => {
  const { keyword } = useParams();
  return <SearchResult />
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:keyword" element={<SearchResult />} />
      </Routes>
    </Router>
  );
}

export default App;
