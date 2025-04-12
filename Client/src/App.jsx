import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Editorpage from "./Pages/Editorpage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/room/:roomId" element={<Editorpage />} />
      </Routes>
    </Router>
  );
};

export default App;
