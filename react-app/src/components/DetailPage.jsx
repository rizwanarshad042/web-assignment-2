import { ArrowLeft, Check } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function DetailPage({ stays, user, bookings, onBook, onCancel, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const stay = stays.find((item) => item.id === id);
  const booked = bookings.some((item) => item.id === id);
  if (!stay)
    return (
      <>
        <Navbar user={user} onLogout={onLogout} />
        <div className="status">Stay not found.</div>
      </>
    );
  const reserve = () => {
    if (!user) return navigate("/login");
    if (booked)
      onCancel(stay.id);
    else onBook(stay);
  };
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main className="detail-page">
        <button className="back-link" onClick={() => navigate("/events")}>
          <ArrowLeft size={16} /> Back to Stays
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
              <span>10:00 AM</span>
              <span>{stay.city}</span>
            </div>
            <p className="detail-venue">{stay.venue}</p>
            <p>{stay.description}</p>
            <div className="detail-actions">
              <strong>{stay.price.replace("$", "Rs ")}</strong>
              <button className="pink-button" onClick={reserve}>
                {booked ? (
                  <>
                    <Check size={16} /> Booked
                  </>
                ) : (
                  "Reserve Now"
                )}
              </button>
              <button
                className="soft-button"
                onClick={() => navigate("/events")}
              >
                Back to Stays
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default DetailPage;
