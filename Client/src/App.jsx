import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Homepage from "./Pages/Homepage"
import Editor from "./Pages/Editor"


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={Homepage}/>
          <Route path="/editor" element={Editor} />
        </Routes>
      </Router>
    </>
  )
}

export default App