import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducers from "./reducers/todoReducers";
import counterReducer from "./reducers/counterReducer";
import postReducers from "./reducers/postReducers";
import { thunk } from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import trendingReducers from "./reducers/trendingReducers";
import detailReducers from "./reducers/detailReducers";
import peopleReducers from "./reducers/peopleReducers";
import discoveriReducers from "./reducers/discoveriReducers";
import onairReducers from "./reducers/onairReducers";
import homepageReducers from "./reducers/homepageReducers";
import authReducers from "./reducers/authReducers";
import genresReducers from "./reducers/genresReducers";

const rootReducers = combineReducers({
  todo: todoReducers,
  counter: counterReducer,
  posts: postReducers,
  tv: trendingReducers,
  detail: detailReducers,
  people: peopleReducers,
  discover: discoveriReducers,
  onair: onairReducers,
  homepage: homepageReducers,
  auth: authReducers,
  genre: genresReducers,
});

const persistConfig = {
  key: "root",
  storage,
  //whitelist: ["todo"],
  //blacklist: ["counter"],
};
const persistedReducer = persistReducer(persistConfig, rootReducers);

// Create the store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
});

export const persistor = persistStore(store);
