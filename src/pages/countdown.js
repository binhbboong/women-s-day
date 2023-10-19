import Typed from "typed.js";
import Head from "next/head";
import Script from "next/script";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function Countdown({ date }) {
  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const endDate = new Date(date);
      const now = new Date();
      const timeLeft = endDate - now;

      if (timeLeft < 0) {
        clearInterval(intervalId);
        return;
      }

      const oneSecond = 1000;
      const oneMinute = oneSecond * 60;
      const oneHour = oneMinute * 60;
      const oneDay = oneHour * 24;

      let days = Math.floor(timeLeft / oneDay);
      let hours = Math.floor((timeLeft % oneDay) / oneHour);
      let minutes = Math.floor((timeLeft % oneHour) / oneMinute);
      let seconds = Math.floor((timeLeft % oneMinute) / oneSecond);

      days = String(days).padStart(2, "0");
      hours = String(hours).padStart(2, "0");
      minutes = String(minutes).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");

      setDays(days);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [date]);

  return (
    <div className="cs-countdown d-flex justify-content-center">
      <ul className="ot-countdown unstyle">
        <li>
          <span className="days">{days}</span>
          <p className="days_text">{days === "01" ? "day" : "days"}</p>
        </li>
        <li className="seperator">:</li>
        <li>
          <span className="hours">{hours}</span>
          <p className="hours_text">{hours === "01" ? "hour" : "hours"}</p>
        </li>
        <li className="seperator">:</li>
        <li>
          <span className="minutes">{minutes}</span>
          <p className="minutes_text">
            {minutes === "01" ? "minute" : "minutes"}
          </p>
        </li>
        <li className="seperator">:</li>
        <li>
          <span className="seconds">{seconds}</span>
          <p className="seconds_text">
            {seconds === "01" ? "second" : "seconds"}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default function Home() {
  const el = useRef(null);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Women's", "Sweetest"],
      typeSpeed: 50,
      backSpeed: 40,
      backDelay: 1500,
      loop: !0,
      showCursor: false,
    });
    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <>
      <Head>
        <title>HAPPY WOMEN&apos;S DAY</title>
        <meta name="description" content="Coming soon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
          integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
          crossorigin="anonymous"
          referrerpolicy="no-referrer"
        />
      </Head>
      <main>
        <div className="container-fluid area h-100">
          <ul className="circles">
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
            <li />
          </ul>
          <div className="container padding-top-bottom h-100 d-flex flex-column text-center justify-content-between align-content-center align-self-center">
            <div className="cs-logo">
              <a href="#">
                <Image
                  src="images/logo.svg"
                  alt="logo"
                  width={200}
                  height={30}
                />
              </a>
            </div>
            <div className="cs-content">
              <h2 className="ff-great gradient-slide-in-text">
                Happy&nbsp;
                {/* <span
                  className="typer"
                  id="main"
                  // data-words=["Women's","Sweetest"]
                  data-delay={100}
                  data-deletedelay={1000}
                /> */}
                <span ref={el}></span>
                &nbsp;Day
              </h2>
              <p>
                The gift will be opened on
                <span className="fw-bold">&nbsp;March 8th</span>
              </p>
            </div>
            <Countdown date={new Date("2023-03-08T03:00:00")} />
            <div className="cs-link">
              <p className="text-white-50">flowers.mireavn.com</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
