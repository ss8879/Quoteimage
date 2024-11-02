import { configureStore } from "@reduxjs/toolkit";
import Userslice from "./slices/userslice";
import Signupslice from "./slices/signupslice";
export const store = configureStore({
  reducer: {
    User: Userslice,
    Signup: Signupslice,
  },
});
