export const fallbackEvents = [
  {
    id: "seaside-house",
    name: "Seaside House",
    category: "Beach",
    date: "2026-11-08",
    city: "Goa",
    venue: "Candolim Beach Road",
    price: "$120",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=85",
    description:
      "A calm coastal stay with bright rooms, fresh local food, and the beach a short walk away.",
  },
  {
    id: "pine-retreat",
    name: "Pine Retreat",
    category: "Mountain",
    date: "2026-12-14",
    city: "Manali",
    venue: "Old Manali",
    price: "$95",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
    description:
      "Settle into a quiet hillside retreat with warm interiors and wide views of the valley.",
  },
  {
    id: "city-lanterns",
    name: "City Lanterns",
    category: "Urban",
    date: "2027-01-21",
    city: "Jaipur",
    venue: "C-Scheme",
    price: "$78",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    description:
      "A central boutique stay close to galleries, markets, and the city's best evening dining.",
  },
];

export function fetchEvents() {
  return Promise.resolve({ events: fallbackEvents });
}
