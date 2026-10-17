import { useEffect, useMemo, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "./Navbar";
import Hotelcard from "./Hotelcard";
import { fetchEvents, fallbackEvents } from "../events";

function EventsPage({ user, bookings, onLogout }) {
  const [stays, setStays] = useState(fallbackEvents);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchEvents()
      .then((result) => setStays(result.events))
      .finally(() => setLoading(false));
  }, []);
  const categories = ["All", ...new Set(stays.map((stay) => stay.category))];
  const filtered = useMemo(
    () =>
      stays.filter(
        (stay) =>
          (category === "All" || stay.category === category) &&
          `${stay.name} ${stay.city} ${stay.venue}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [stays, category, search],
  );
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main className="home">
        <section className="hero">
          <div>
            <h1>
              Find the stay that fits your
              <br />
              <span>plans.</span>
            </h1>
            <p>
              Explore comfortable hotels, resorts, and boutique stays in
              destinations around the world. Book in seconds and manage all your
              reservations from one place.
            </p>
          </div>
          <div className="dashboard">
            <span>Smart dashboard</span>
            <div>
              Available stays <strong>{stays.length}</strong>
            </div>
            <div>
              Bookings <strong>{bookings.length}</strong>
            </div>
            <div>
              Signed in <strong>{user ? "Yes" : "No"}</strong>
            </div>
          </div>
        </section>
        <section className="stays-section" id="featured-stays">
          <h2>Featured Stays</h2>
          <div className="stay-filters">
            <label>
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by hotel or city"
              />
            </label>
            <div className="category-select">
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
          </div>
          {loading ? (
            <div className="status">Loading stays...</div>
          ) : (
            <div className="stay-grid">
              {filtered.map((stay) => (
                <Hotelcard stay={stay} key={stay.id} />
              ))}
            </div>
          )}
          {!filtered.length && <div className="status">No stays found.</div>}
        </section>
      </main>
    </>
  );
}

export default EventsPage;
