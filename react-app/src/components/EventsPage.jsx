import { useEffect, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "./Navbar";
import EventCard from "./EventCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, setCategory, setSearch } from "../store";

function EventsPage() {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const status = useSelector((state) => state.events.status);
  const error = useSelector((state) => state.events.error);
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registrations[user?.id] || []);
  const { search, category } = useSelector((state) => state.browse);
  useEffect(() => {
    const timer = setTimeout(() => dispatch(fetchEvents({ keyword: search, category })), 250);
    return () => clearTimeout(timer);
  }, [dispatch, search, category]);
  const categories = ["All", ...new Set(events.map((event) => event.category))];
  const filtered = useMemo(
    () =>
      events.filter(
        (event) =>
          (category === "All" || event.category === category) &&
          `${event.name} ${event.city} ${event.venue}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [events, category, search],
  );
  return (
    <>
      <Navbar />
      <main className="home">
        <section className="hero">
          <div>
            <h1>
              Find an event worth your
              <br />
              <span>plans.</span>
            </h1>
            <p>
              Explore live music, sports, theatre, and more. Register in seconds
              and manage every event you care about from one place.
            </p>
          </div>
          <div className="dashboard">
            <span>Smart dashboard</span>
            <div>
              Upcoming events <strong>{events.length}</strong>
            </div>
            <div>
              My events <strong>{registrations.length}</strong>
            </div>
            <div>
              Signed in <strong>{user ? "Yes" : "No"}</strong>
            </div>
          </div>
        </section>
        <section className="stays-section" id="featured-stays">
          <h2>Upcoming Events</h2>
          <div className="stay-filters">
            <label>
              <Search size={17} />
              <input
                value={search}
                onChange={(event) => dispatch(setSearch(event.target.value))}
                placeholder="Search events, venues, or cities"
              />
            </label>
            <div className="category-select">
              <select
                value={category}
                onChange={(event) => dispatch(setCategory(event.target.value))}
              >
                {categories.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
              <ChevronDown size={15} />
            </div>
          </div>
          {status === "loading" && <div className="status">Finding events...</div>}
          {status === "failed" && <div className="status form-error">{error}</div>}
          <div className="stay-grid">
            {status !== "loading" && filtered.map((event) => (
              <EventCard event={event} key={event.id} />
            ))}
          </div>
          {status === "succeeded" && !filtered.length && <div className="status">No events found. Try another search.</div>}
        </section>
      </main>
    </>
  );
}

export default EventsPage;
