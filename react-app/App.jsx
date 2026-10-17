import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import DetailPage from "./components/DetailPage";
import EventsPage from "./components/EventsPage";
import MyEventsPage from "./components/MyEventsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/events" replace />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/events/:id" element={<DetailPage />} />
      <Route path="/login" element={<AuthPage mode="login" />} />
      <Route path="/register" element={<AuthPage mode="register" />} />
      <Route
        path="/my-events"
        element={
          <ProtectedRoute>
            <MyEventsPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
