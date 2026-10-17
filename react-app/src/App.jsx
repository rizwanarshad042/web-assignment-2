import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DetailPage from "./components/DetailPage";
import EventsPage from "./components/EventsPage";
import MyEventsPage from "./components/MyEventsPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  const onLogin = (nextUser) => setUser(nextUser);
  const onRegister = (nextUser) => setUser(nextUser);
  const onLogout = () => setUser(null);
  const onBook = (stay) =>
    setBookings((current) =>
      current.some((item) => item.id === stay.id) ? current : [...current, stay],
    );
  const onCancel = (id) =>
    setBookings((current) => current.filter((item) => item.id !== id));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route
          path="/events"
          element={<EventsPage user={user} bookings={bookings} onLogout={onLogout} />}
        />
        <Route
          path="/events/:id"
          element={
            <DetailPage
              user={user}
              bookings={bookings}
              onBook={onBook}
              onCancel={onCancel}
              onLogout={onLogout}
            />
          }
        />
        <Route path="/login" element={<LoginPage mode="login" onLogin={onLogin} />} />
        <Route
          path="/register"
          element={<LoginPage mode="register" onRegister={onRegister} />}
        />
        <Route
          path="/my-events"
          element={
            <ProtectedRoute user={user}>
              <MyEventsPage
                user={user}
                bookings={bookings}
                onCancel={onCancel}
                onLogout={onLogout}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
