import { configureStore, createSlice } from "@reduxjs/toolkit";

const stays = [
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

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: [],
  reducers: {
    addBooking: (state, action) => {
      if (!state.some((stay) => stay.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    cancelBooking: (state, action) =>
      state.filter((stay) => stay.id !== action.payload),
  },
});

const browseSlice = createSlice({
  name: "browse",
  initialState: { search: "", category: "All" },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});

const uiSlice = createSlice({
  name: "ui",
  initialState: { navOpen: false },
  reducers: {
    toggleNav: (state) => {
      state.navOpen = !state.navOpen;
    },
    closeNav: (state) => {
      state.navOpen = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { addBooking, cancelBooking } = bookingsSlice.actions;
export const { setSearch, setCategory } = browseSlice.actions;
export const { toggleNav, closeNav } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    bookings: bookingsSlice.reducer,
    browse: browseSlice.reducer,
    stays: () => stays,
    ui: uiSlice.reducer,
  },
});