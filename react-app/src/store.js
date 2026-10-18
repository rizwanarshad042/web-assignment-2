import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTicketmasterEvents } from "./ticketmaster";

const readStorage = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const savedUser = readStorage("booksmart-user", null);
const savedRegistrations = readStorage("booksmart-registrations", {});

export const fetchEvents = createAsyncThunk(
  "events/fetchEvents",
  async ({ keyword = "", category = "All" } = {}) =>
    fetchTicketmasterEvents({ keyword, category }),
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("booksmart-user", JSON.stringify(action.payload));
    },
    register: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("booksmart-user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("booksmart-user");
    },
  },
});

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: savedRegistrations,
  reducers: {
    registerForEvent: (state, action) => {
      const { userId, event } = action.payload;
      const current = state[userId] || [];
      if (!current.some((item) => item.id === event.id)) {
        state[userId] = [...current, event];
        localStorage.setItem("booksmart-registrations", JSON.stringify(state));
      }
    },
    cancelRegistration: (state, action) => {
      const { userId, eventId } = action.payload;
      state[userId] = (state[userId] || []).filter((event) => event.id !== eventId);
      localStorage.setItem("booksmart-registrations", JSON.stringify(state));
    },
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

const eventsSlice = createSlice({
  name: "events",
  initialState: { items: [], status: "idle", error: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
        state.error = "";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unable to load events.";
      });
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

export const { login, register, logout } = authSlice.actions;
export const { registerForEvent, cancelRegistration } = registrationsSlice.actions;
export const { setSearch, setCategory } = browseSlice.actions;
export const { toggleNav, closeNav } = uiSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    events: eventsSlice.reducer,
    registrations: registrationsSlice.reducer,
    browse: browseSlice.reducer,
    ui: uiSlice.reducer,
  },
});
