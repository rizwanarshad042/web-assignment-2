import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import date from "./date";

function Hotelcard({ stay }) {
  return (
    <Link className="stay-card" to={`/events/${stay.id}`}>
      <img src={stay.image} alt={stay.name} />
      <div className="stay-content">
        <div className="stay-top">
          <span className="stay-category">{stay.category}</span>
          <span className="stay-date">{date(stay.date)}</span>
        </div>
        <h3>{stay.name}</h3>
        <p>{stay.venue}</p>
        <p>{stay.city}</p>
        <div className="stay-bottom">
          <strong>{stay.price.replace("$", "Rs ")}</strong>
          <span>
            View Stay <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default Hotelcard;