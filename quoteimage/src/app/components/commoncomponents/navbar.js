"use client";
import { useDispatch, useSelector } from "react-redux";
import styles from "./navbar.module.css";
import { logout } from "@/app/redux/slices/userslice";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Navbar() {
  const { email } = useSelector((state) => state.User);
  const pathname = usePathname()
  console.log("hello pathname is:",pathname)
  const dispatch = useDispatch();
  const router = useRouter();
  function onlogout() {
    dispatch(logout());
    router.push("/login");
  }
  function onmycreations() {
    router.push("/mycreations");
  }
  function oncreate() {
    router.push("/");
  }
  return email ? (
    <div className={styles.container}>
      <Image src="/Frame 1.png" width={100} height={70}></Image>
      <div className={styles.scontainer1}>
      <div  onClick={oncreate} className={pathname==='/'?styles.cards:styles.card}>
        <Link href="/" className={pathname==='/'?styles.links:styles.link} >
        Create
        </Link>
      </div>
      <div className={pathname==='/mycreations'?styles.cards:styles.card}  onClick={onmycreations}>
        <Link href="/mycreations" className={pathname==='/mycreations'?styles.links:styles.link} >
        My Creations
        </Link>
      </div>
      <div className={pathname==='/profile'?styles.cards:styles.card}>
        <Link href="/profile" className={pathname==='/profile'?styles.links:styles.link} >
        Profile
        </Link>
        </div>
      <div className={pathname==='/logout'?styles.cards:styles.card} onClick={onlogout}>
        <Link href="/home" className={pathname==='/logout'?styles.links:styles.link} >
        Logout
        </Link>
      </div>
      </div>
    </div>
  ) : (
    <div className={styles.container}>
      <Image src="/Frame 1.png" width={100} height={70}></Image>
      <div className={styles.scontainer1}>
      <div className={pathname==='/home'?styles.cards:styles.card}>
            <Link href="/home" className={pathname==='/home'?styles.links:styles.link}>home</Link>
        </div>
      <div className={pathname==='/login'?styles.cards:styles.card}>
        <Link href="/login"  className={pathname==='/login'?styles.links:styles.link}>Login</Link>
        </div>
      <div className={pathname==='/signup'?styles.cards:styles.card}>
        <Link href="/signup"  className={pathname==='/signup'?styles.links:styles.link}>Sign Up</Link>
        </div>
      <div className={pathname==='/about'?styles.cards:styles.card}>
        <Link href="/about"  className={pathname==='/about'?styles.links:styles.link}>About</Link>
        </div>
      <div className={pathname==='/contactus'?styles.cards:styles.card}>
        <Link href="/contactus"  className={pathname==='/contactus'?styles.links:styles.link}>Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
