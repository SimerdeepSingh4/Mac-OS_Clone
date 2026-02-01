import React, { useEffect, useState } from "react";

const DateTime = () => {
    const [now, setNow] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setNow(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    const day = days[now.getDay()];
    const month = months[now.getMonth()];
    const date = now.getDate();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    // macOS style: "Sun  1 Feb  3:45 PM" (two spaces before single-digit date)
    const dateStr = date < 10 ? `  ${date}` : `${date}`;
    return <span>{`${day} ${dateStr} ${month}  ${hours}:${minutes} ${ampm}`}</span>;
};

export default DateTime;
