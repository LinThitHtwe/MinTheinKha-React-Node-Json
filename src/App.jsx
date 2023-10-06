import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Questions from "./components/Questions";
import Header from "./components/Header";
import ChooseNumber from "./components/ChooseNumber";
function App() {
  return (
    <>
      <Header />
      <div className="main">
        <Router>
          <Routes>
            <Route path="/" element={<Questions />} />
            <Route path="/:questionNo" element={<ChooseNumber />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;
