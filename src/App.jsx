import { HashRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RoadToWiki from "./components/RoadToWiki";
import Team from "./components/Team";
import About from "./components/About";
import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Question from "./components/Question";
import ContributionMeter from "./components/ContributionMeter";
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/RoadToWiki" element={<RoadToWiki />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Question" element={<Question />} />
        <Route path="/ContributionMeter" element={<ContributionMeter />} />
      </Routes>
    </HashRouter>
  );
}

export default App;