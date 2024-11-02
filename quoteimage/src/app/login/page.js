"use client";
import { useState } from "react";
import User from "../services/operations/user";
import styles from "./login.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
export default function Login() {
  const { token } = useSelector((state) => state.User);
  const router = useRouter();
  const { login_op } = User();
  const [obj, setobj] = useState({
    email: "",
    password: "",
  });
  async function handleonsubmit(e) {
    e.preventDefault();
    login_op(obj);
  }
  function handlechange(e) {
    setobj((p) => ({ ...p, [e.target.name]: e.target.value }));
  }
  return token ? (
    router.push("/")
  ) : (
    <div className={styles.maincontainer}>
      <div>
        <Image src='/loginimage.jpeg' width={400} height={400} />
      </div>
      <form onSubmit={handleonsubmit}>
        <div className={styles.container}>
          <div>Login</div>

          <div>
            <div>Email</div>
            <div className={styles.scontainer}>
              <div style={{paddingLeft:"5px"}}>
              <FaRegUser style={{color:"black"}}/>
              </div>
              <input
                type="text"
                value={obj.email}
                name="email"
                onChange={handlechange}
                className={styles.minput}
                style={{border:"none"}}
              />
            </div>
          </div>
          <div>
            <div>Password</div>
            <div className={styles.scontainer}>
              <div style={{paddingLeft:"5px"}}><FaLock style={{color:"black"}}/></div>
              <input
                type="text"
                value={obj.password}
                name="password"
                onChange={handlechange}
                style={{border:"none"}}
                className={styles.minput}
              />
            </div>
          </div>

          <div>
            <button className={styles.btn}>Login</button>
          </div>
        </div>
      </form>
    </div>
  );
}
