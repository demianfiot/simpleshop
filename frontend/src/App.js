import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import { ThemeProvider } from "./context/ThemeContext";
import ToastContainer from "./components/ui/Toast";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
