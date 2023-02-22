import logo from "./logo.svg";
import "./App.css";
import Routes from "./config/routes";
import Header from "./components/header";
import axios from "axios";

axios.defaults.baseURL = "https://reception-app-mern.vercel.app";

function App() {
  return (
    <>
      <Header />
      <Routes />
    </>
  );
}

export default App;
