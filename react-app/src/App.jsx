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
  const stays = [
    {
      id: "seaside-house",
      name: "Seaside House",
      category: "Beach",
      date: "2026-11-08",
      city: "Goa",
      venue: "Candolim Beach Road",
      price: "$120",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
      description:
        "A calm coastal stay with bright rooms, fresh local food, and the beach a short walk away.",
    },
    {
      id: "pine-retreat",
      name: "Pine Retreat",
      category: "Mountain",
      date: "2026-12-14",
      city: "Manali",
      venue: "Old Manali",
      price: "$95",
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
      description:
        "Settle into a quiet hillside retreat with warm interiors and wide views of the valley.",
    },
    {
      id: "city-lanterns",
      name: "City Lanterns",
      category: "Urban",
      date: "2027-01-21",
      city: "Jaipur",
      venue: "C-Scheme",
      price: "$78",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
      description:
        "A central boutique stay close to galleries, markets, and the city's best evening dining.",
    },
  ];

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
          element={
            <EventsPage
              stays={stays}
              user={user}
              bookings={bookings}
              onLogout={onLogout}
            />
          }
        />
        <Route
          path="/events/:id"
          element={
            <DetailPage
              stays={stays}
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
