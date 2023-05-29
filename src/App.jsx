import { BrowserRouter, Routes, Route } from "react-router-dom";
import { users, transactions } from "./constants/users";
import {
  setSessionStorage,
  getSessionStorage,
} from "./services/storage.service";
// import ProtectedRoutes from "./components/service/ProtectedRoutes";
import LoginPage from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./App.css";

function App() {
  const constructor = () => {
    const storedUsers = getSessionStorage("users");
    const storedTransactions = getSessionStorage("transactions");

    if (!storedUsers) {
      setSessionStorage("users", users, false);
    }

    if (!storedTransactions) {
      setSessionStorage("transactions", transactions, false);
    }
  };
  constructor();

  const setLoggedInUser = () => {
    // static
    const loggedInUser = { isLoggedin: true, email: "lexi@email.com" };
    setSessionStorage("loggedInUser", loggedInUser, true);
  };
  setLoggedInUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/" element={<ProtectedRoutes />}> */}
        <Route path="/" element={<Dashboard />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
