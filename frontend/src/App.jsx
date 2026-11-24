import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./components/HomePage";
import Achievements from "./components/Achievements";
import OurEvents from "./components/OurEvents";
import Gallery from "./components/Gallery";
import Team from "./components/Team";
import About from "./components/About";
import GetInvolved from "./components/GetInvolved";
import ScrollToTop from "./components/ScrollToTop";
import Question from "./components/Question";
import ContributionMeter from "./components/ContributionMeter";
import MarathonBoard from "./components/MarathonBoard";

function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/About" element={<About />} />
          <Route path="/about" element={<Navigate to="/About" replace />} />
          <Route path="/OurEvents" element={<OurEvents />} />
          <Route path="/events" element={<Navigate to="/OurEvents" replace />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/gallery" element={<Navigate to="/Gallery" replace />} />
          <Route path="/Achievements" element={<Achievements />} />
          <Route path="/achievements" element={<Navigate to="/Achievements" replace />} />
          <Route path="/Team" element={<Team />} />
          <Route path="/team" element={<Navigate to="/Team" replace />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/GetInvolved" element={<Navigate to="/get-involved" replace />} />
          <Route path="/Question" element={<Question />} />
          <Route path="/question" element={<Navigate to="/Question" replace />} />
          <Route path="/faq" element={<Navigate to="/Question" replace />} />
          <Route path="/ContributionMeter" element={<ContributionMeter />} />
          <Route path="/leaderboard" element={<Navigate to="/ContributionMeter" replace />} />
          <Route path="/MarathonBoard" element={<MarathonBoard />} />
          <Route path="/marathon" element={<Navigate to="/MarathonBoard" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
