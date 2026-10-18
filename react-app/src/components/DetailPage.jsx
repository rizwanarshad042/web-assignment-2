import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import { cancelRegistration, fetchEvents, registerForEvent } from "../store";

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events.items);
  const user = useSelector((state) => state.auth.user);
  const registrations = useSelector((state) => state.registrations[user?.id] || []);
  const stay = events.find((item) => item.id === id);
  const booked = registrations.some((item) => item.id === id);
  useEffect(() => {
    if (!events.length) dispatch(fetchEvents());
  }, [dispatch, events.length]);
  if (!stay) {
    return (
      <>
        <Navbar />
        <div className="status">Event not found. Return to the event list and try again.</div>
      </>
    );
  }
  const reserve = () => {
    if (!user) return navigate("/login");
    if (booked)
      dispatch(cancelRegistration({ userId: user.id, eventId: stay.id }));
    else dispatch(registerForEvent({ userId: user.id, event: stay }));
  };
  return (
    <>
      <Navbar />
      <main className="detail-page">
        <button className="back-link" onClick={() => navigate("/events")}>
          <ArrowLeft size={16} /> Back to Events
        </button>
        <div className="detail-layout">
          <img className="detail-photo" src={stay.image} alt={stay.name} />
          <section className="detail-card">
            <span className="stay-category">{stay.category}</span>
            <h1>{stay.name}</h1>
            <div className="detail-pills">
              <span>
                {new Intl.DateTimeFormat("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }).format(new Date(stay.date))}
              </span>
              <span>{stay.time || "Time TBA"}</span>
              <span>{stay.city}</span>
            </div>
            <p className="detail-venue">{stay.venue}</p>
            <p>{stay.description}</p>
            <div className="detail-actions">
              <strong>Free registration</strong>
              <button className="pink-button" onClick={reserve}>
                {booked ? (
                  <>
                    <Check size={16} /> Booked
                  </>
                ) : (
                  "Reserve Now"
                )}
              </button>
              {stay.url && stay.url !== "#" && <a className="soft-button" href={stay.url} target="_blank" rel="noreferrer">Official page <ExternalLink size={15} /></a>}
              <button
                className="soft-button"
                onClick={() => navigate("/events")}
              >
                Back to Events
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default DetailPage;
