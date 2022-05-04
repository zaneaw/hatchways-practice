import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../styles/Forecast.module.css";

export default function Forecast() {
    // weather is going to hold the forecast data
    const [weather, setWeather] = useState("");

    // load the data from the api, key is hidden
    // by placing the key in a backend function
    useEffect(() => {
        axios
            .get("/api/weather")
            .then((res) => {
                return setWeather(res.data.daily);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    // function for forecast here
    const DisplayWeather = () => {
        // map over the state
        return weather.map((day, i) => {
            // stops at the 6th iteration (0 based)
            if (i < 5) {
                // create date from unix timestamp. convert to localDateString and
                // use the short version. undefined should follow local machine time (I think)
                let date = new Date(day.dt * 1000).toLocaleDateString(
                    undefined,
                    { weekday: "short" }
                );
                // important variables from iteration object
                const highTemp = Math.round(day.temp.max);
                const lowTemp = Math.round(day.temp.min);
                const desc = day.weather[0].description;
                const weatherIcon = day.weather[0].icon;
                const src = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`;
                return (
                    <div
                        className={`${styles.card} ${i === 0 && styles.dark}`}
                        key={day.dt}
                    >
                        <p className={styles.cardHeader}>{date}</p>
                        <Image
                            loader={() => src}
                            unoptimized
                            src={src}
                            alt={desc}
                            width={70}
                            height={70}
                        />
                        <div className={styles.temps}>
                            <p className={styles.bold}>{lowTemp}&deg;</p>
                            <p>{highTemp}&deg;</p>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <div className={styles.container}>
            {weather !== "" && <DisplayWeather />}
        </div>
    );
}
