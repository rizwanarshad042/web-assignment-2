import { useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "./Navbar";
import Hotelcard from "./Hotelcard";
import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSearch } from "../store";

function EventsPage() {
  const dispatch = useDispatch();
  const stays = useSelector((state) => state.stays);
  const user = useSelector((state) => state.auth.user);
  const bookings = useSelector((state) => state.bookings);
  const { search, category } = useSelector((state) => state.browse);
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
      <Navbar />
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
                onChange={(event) => dispatch(setSearch(event.target.value))}
                placeholder="Search by hotel or city"
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
          <div className="stay-grid">
            {filtered.map((stay) => (
              <Hotelcard stay={stay} key={stay.id} />
            ))}
          </div>
          {!filtered.length && <div className="status">No stays found.</div>}
        </section>
      </main>
    </>
  );
}

export default EventsPage;
