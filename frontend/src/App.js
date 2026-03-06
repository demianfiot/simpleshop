import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/auth" element={<AuthPage />} />

      {/* <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;