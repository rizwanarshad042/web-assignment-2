import { Ticket, X } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function MyEventsPage({ user, bookings, onCancel, onLogout }) {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main className="bookings">
        <h1>My Bookings</h1>
        <p className="booking-intro">Your saved stays and reservations.</p>
        {bookings.length ? (
          <div className="booking-list">
            {bookings.map((stay) => (
              <div className="booking-row" key={stay.id}>
                <img src={stay.image} alt="" />
                <div>
                  <span className="stay-category">{stay.category}</span>
                  <h2>{stay.name}</h2>
                  <p>
                    {stay.venue} · {stay.city}
                  </p>
                </div>
                <button
                  onClick={() => onCancel(stay.id)}
                >
                  <X size={17} /> Cancel
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-bookings">
            <Ticket size={28} />
            <p>You have no bookings yet.</p>
            <Link className="pink-button" to="/events">
              Find a Stay
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export default MyEventsPage;
