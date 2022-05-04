import axios from "axios";

export default async function fetchWeather(req, res) {
    const lat = 42.65;
    const lon = "-73.75";
    const units = "imperial";
    const key = process.env.WEATHER_API_KEY;
    const data = await axios
        .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=current,minutely,hourly,alerts&appid=${key}`
        )
        .then((res) => {
            // handle success
            // console.log(res.data);
            return res.data;
        })
        .catch((error) => {
            // handle error
            console.error(error);
            return error;
        });
    res.json(data);
}
