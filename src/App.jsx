import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RoadToWiki from "./components/RoadToWiki";
import Team from "./components/Team";
import About from "./components/About";
import Contact from "./components/Contact";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RoadToWiki" element={<RoadToWiki />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
      </Routes>
    </HashRouter>
  );
}

export default App;