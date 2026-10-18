import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <Link className="stay-card" to={`/events/${event.id}`}>
      <img
        src={event.image}
        alt={event.name}
        style={{ aspectRatio: "4 / 3", objectFit: "cover" }}
      />
      <div className="stay-content">
        <div className="stay-top">
          <span className="stay-category">{event.category}</span>
          <span className="stay-date">
            {new Intl.DateTimeFormat("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }).format(new Date(event.date))}
          </span>
        </div>
        <h3>{event.name}</h3>
        <p>{event.venue}</p>
        <p>{event.city}</p>
        <div className="stay-bottom">
          <strong>Free registration</strong>
          <span>
            View Event <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default EventCard;