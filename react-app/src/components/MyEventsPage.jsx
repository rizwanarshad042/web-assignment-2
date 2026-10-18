import { useState } from "react";
import { Ticket, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { cancelRegistration } from "../store";

function MyEventsPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.registrations[user.id] || []);
  const [now] = useState(() => Date.now());
  const upcoming = bookings.filter((event) => new Date(event.date).getTime() >= now);
  const completed = bookings.filter((event) => new Date(event.date).getTime() < now);
  const cancel = (eventId) => dispatch(cancelRegistration({ userId: user.id, eventId }));
  return (
    <>
      <Navbar />
      <main className="bookings">
        <h1>My Events</h1>
        <p className="booking-intro">Your registered events, all in one place.</p>
        {bookings.length ? (
          <div className="booking-list">
            {[{ title: "Upcoming", items: upcoming }, { title: "Completed", items: completed }].map(({ title, items }) => items.length > 0 && <section key={title}>
              <h2>{title}</h2>
              {items.map((stay) => (
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
                    onClick={() => cancel(stay.id)}
                >
                  <X size={17} /> {title === "Upcoming" ? "Cancel" : "Remove"}
                </button>
              </div>
              ))}
            </section>)}
          </div>
        ) : (
          <div className="empty-bookings">
            <Ticket size={28} />
            <p>You have no bookings yet.</p>
            <Link className="pink-button" to="/events">
              Find an Event
            </Link>
          </div>
        )}
      </main>
    </>
  );
}

export default MyEventsPage;
