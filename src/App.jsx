
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Students from "./pages/Students";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="*" element={<Navigate to="/students" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
