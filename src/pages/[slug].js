import Typed from "typed.js";
import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Snowflakes from "magic-snowflakes";
import Script from "next/script";

function CopyUrlButton() {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };

  return (
    <button className="btn btn-secondary rounded-pill" onClick={handleClick}>
      {copied ? "Copied!" : "Copy URL"}
    </button>
  );
}

export default function Home({ person, publicPerson }) {
  const router = useRouter();
  const secret = router.query.secret;
  const el = useRef(null);
  const [currentUrl, setCurrentUrl] = useState("Not Found");

  if (person.secret !== secret) {
    person = publicPerson;
  }

  useEffect(() => {
    setCurrentUrl(window.location.href);
    var snowflakes = new Snowflakes({
      color: "#ffff",
      count: 45,
      minOpacity: 0.3,
      maxOpacity: 0.5,
      minSize: 8,
      maxSize: 15,
    });
    const clickMe = document.querySelector(".click-icon");
    const card = document.querySelector(".card");

    const cdThumb = document.querySelector(".cd-thumb");
    const audio = document.querySelector("#audio");
    const progress = document.querySelector("#progress");

    let isPlaying = false;

    const cdThumbAnimate = cdThumb?.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );

    cdThumbAnimate?.pause();

    const handleClick = () => {
      card.classList.toggle("is-opened");
      clickMe.classList.toggle("is-hidden");
      handlePlay();
    };

    const handlePlay = () => {
      if (!isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
      isPlaying = !isPlaying;
    };

    //Event
    card?.addEventListener("click", handleClick);

    audio?.addEventListener("play", function () {
      cdThumbAnimate.play();
    });

    audio?.addEventListener("pause", function () {
      cdThumbAnimate.pause();
    });

    audio?.addEventListener("timeupdate", function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    });

    progress?.addEventListener("change", function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    });

    audio?.addEventListener("ended", function () {
      audio.play();
      progress.value;
    });

    return () => {
      card?.removeEventListener("click", handleClick);
    };
  }, []);

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

  const cdImage = "/images/bg.jpg";

  return (
    <>
      <Head>
        <title>HAPPY WOMEN&apos;S DAY</title>
        <meta name="description" content={person.name} />
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
      <main className="area">
        <div>
          <div className="card">
            <div className="card-page card-page-front">
              <div className="card-page card-page-outside">
                {/* <h1 className="ff-great">{person.name}</h1> */}
              </div>
              <div className="card-page card-page-inside">
                <div className="player w-50 h-100 py-5 px-2">
                  <div className="d-flex h-100 py-5 flex-column align-items-center justify-content-center">
                    <header>
                      <h4>Now playing</h4>
                      <h2>Beautiful day</h2>
                    </header>
                    <div className="cd m-2">
                      <div
                        className="cd-thumb"
                        style={{
                          backgroundImage: `url(${cdImage})`,
                        }}
                      />
                    </div>
                    <div className="control w-100 my-2 d-flex align-items-center justify-content-between">
                      <div className="btn-control">
                        <i className="fa-solid fa-repeat" />
                      </div>
                      <div className="btn-control">
                        <i className="fa-solid fa-backward" />
                      </div>
                      <div className="btn-play">
                        <i className="fa-solid fa-circle-pause" />
                      </div>
                      <div className="btn-control">
                        <i className="fa-solid fa-forward" />
                      </div>
                      <div className="btn-control">
                        <i className="fa-solid fa-shuffle" />
                      </div>
                    </div>
                    <input
                      id="progress"
                      className="progress"
                      type="range"
                      defaultValue={0}
                      step={1}
                      min={0}
                      max={100}
                    />
                    <audio id="audio" src="/music.mp3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-page px-3 card-page-bottom d-flex flex-column justify-content-center align-items-center">
              <h1 className="ff-great">
                Happy&nbsp;
                <span ref={el}></span>
                &nbsp;Day
              </h1>
              <p>&quot;{person.quote}&quot;</p>
            </div>
          </div>
          <span className="click-icon">
            <Image src="/images/open.svg" fill alt="open-icon" />
          </span>
        </div>
      </main>
      <div className="unsupported bg-light h-100 w-100 d-flex flex-column justify-content-center align-items-center p-5 text-center">
        <div className="my-2">
          Sorry, this screen size is not supported. Please access the content
          using a desktop browser with a wider screen. <br></br> Thank you.
        </div>
        <div class="alert alert-secondary fs-6" role="alert">
          {currentUrl}
        </div>
        <CopyUrlButton />
      </div>
      <Script src="https://unpkg.com/magic-snowflakes/dist/snowflakes.min.js" />
      <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
    </>
  );
}

export async function getServerSideProps({ params: { slug } }) {
  const data = [];
  let person = data.filter((person) => person.slug === slug)[0];
  const publicPerson = {
    id: 0,
    name: "Một nửa thế giới",
    quote:
      "Wishing you a day that’s just like you… really special!",
  };

  if (!person) {
    person = publicPerson;
  }

  return {
    props: { person: person, publicPerson: publicPerson },
  };
}
