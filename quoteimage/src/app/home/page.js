import Image from "next/image"
import styles from "./home.module.css"
export default function Home(){
    return (
         <div className={styles.maincontainer}>
            <div className={styles.h}>
            Timeless Wisdom in Every Frame
            </div>
            <div className={styles.imagecontainer}>
                <Image src="/mainbodypic.jpg" layout="fill"/>
            </div>
           
         </div>
    )
}