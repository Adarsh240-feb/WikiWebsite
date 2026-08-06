import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";

import Achievements from "./components/Achievements";
import OurEvents from "./components/OurEvents";
import Team from "./components/Team";
import About from "./components/About";
// import Contact from "./components/Contact";
import ScrollToTop from "./components/ScrollToTop";
import Question from "./components/Question";
import ContributionMeter from "./components/ContributionMeter";
import MarathonBoard from "./components/MarathonBoard";
function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/Achievements" element={<Achievements />} />
        <Route path="/OurEvents" element={<OurEvents />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/About" element={<About />} />
        {/* <Route path="/Contact" element={<Contact />} /> */}
        <Route path="/Question" element={<Question />} />
        <Route path="/ContributionMeter" element={<ContributionMeter />} />
        <Route path="/MarathonBoard" element={<MarathonBoard />} />
      </Routes>
    </HashRouter>
  );
}

export default App;