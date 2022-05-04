import Head from "next/head";
import styles from "../styles/Home.module.css";
import Forecast from "../comps/forecast";

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Practice Assessment</title>
                <meta name="description" content="Created by Zane A. Wilson" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Forecast />
        </div>
    );
}
