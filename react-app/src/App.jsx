import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DetailPage from "./components/DetailPage";
import EventsPage from "./components/EventsPage";
import MyEventsPage from "./components/MyEventsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route
          path="/events"
          element={
            <EventsPage />
          }
        />
        <Route
          path="/events/:id"
          element={
            <DetailPage />
          }
        />
        <Route path="/login" element={<LoginPage mode="login" />} />
        <Route
          path="/register"
          element={<LoginPage mode="register" />}
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute>
              <MyEventsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/events" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
