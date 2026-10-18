const API_URL = "https://app.ticketmaster.com/discovery/v2/events.json";

const normalizeEvent = (event) => {
  const venue = event._embedded?.venues?.[0];
  const classification = event.classifications?.[0];
  return {
    id: event.id,
    name: event.name,
    category: classification?.segment?.name || "Other",
    date: event.dates?.start?.dateTime || event.dates?.start?.localDate,
    time: event.dates?.start?.localTime || "Time TBA",
    city: venue?.city?.name || "Location TBA",
    venue: venue?.name || "Venue TBA",
    image: event.images?.find((image) => image.width >= 640)?.url || event.images?.[0]?.url,
    description: event.info || event.pleaseNote || "More event information is available from the organiser.",
    url: event.url,
  };
};

export async function fetchTicketmasterEvents({ keyword, category }) {
  const apiKey = import.meta.env.VITE_TICKETMASTER_API_KEY;
  if (!apiKey) throw new Error("Add VITE_TICKETMASTER_API_KEY to your .env file.");

  const params = new URLSearchParams({
    apikey: apiKey,
    size: "24",
    sort: "date,asc",
  });
  if (keyword) params.set("keyword", keyword);
  if (category !== "All") params.set("classificationName", category);
  const response = await fetch(`${API_URL}?${params}`);
  if (!response.ok) throw new Error("Ticketmaster could not load events right now.");
  const data = await response.json();
  return (data._embedded?.events || []).map(normalizeEvent);
}
