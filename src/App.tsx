import "./app.scss";
import { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import CreateServer from "./Pages/create-server/CreateServer";

const App: FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<CreateServer />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
