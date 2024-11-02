"use client";
import styles from "./otp.module.css";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { setotp } from "../redux/slices/signupslice";
import { useDispatch } from "react-redux";
import User from "../services/operations/user";
import { useSelector } from "react-redux";
export default function Otp() {
  const { email, password, confirmpassword, firstname, lastname, otp } =
    useSelector((state) => state.Signup);
  const dispatch = useDispatch();
  const { startsignup } = User();
  const [otp1, setOtp] = useState("");
  function handlesubmit(e) {
    e.preventDefault();
    dispatch(setotp(otp1));
    console.log("firstname and lastname are:", firstname, lastname);
    startsignup({
      email,
      password,
      confirmpassword,
      firstname,
      lastname,
      otp1,
    });
  }
  return (
    <div className={styles.maincontainer}>
      <form onSubmit={handlesubmit}>
        <div className={styles.container}>
          <div>Enter The Otp That has Sent To The Mail</div>
          <OtpInput
            value={otp1}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => (
              <input
                type="number"
                {...props}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid  white",
                }}
                className={styles.inp}
              />
            )}
          />
          <div>
            <button className={styles.btn}>Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
