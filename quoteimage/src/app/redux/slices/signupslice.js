import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
  confirmpassword: "",
  otp: "",
};
export const Signupslice = createSlice({
  name: "Signup",
  initialState,
  reducers: {
    setuserdata(state, action) {
      console.log("setuser action data:", action.payload);
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
      state.password = action.payload.password;
      state.confirmpassword = action.payload.confirmpassword;
    },
    setotp(state, action) {
      console.log("payload of setotp:", action.payload);
      state.otp = action.payload;
    },
  },
});

export const { setuserdata, setotp } = Signupslice.actions;
export default Signupslice.reducer;
