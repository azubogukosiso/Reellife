import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css';
import Main from "./components/Main"

function App() {
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

export default App;
