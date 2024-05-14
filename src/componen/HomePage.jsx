import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "../App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchTrending } from "../redux/actions/trendingActions";
import { fetchDiscoveri } from "../redux/actions/discoveriActions";
import { fetchPopularPeople } from "../redux/actions/peopleActions";
import { fetchOnAir } from "../redux/actions/onairActions";
import { setCurrentSlide } from "../redux/reducers/onairReducers";

export default function HomePage() {
  const data = useSelector((state) => state.onair.data);
  const dispatch = useDispatch();
  const trending = useSelector((state) => state.tv.trending);
  const discoveri = useSelector((state) => state.discover.discoveri);
  const OnAir = useSelector((state) => state.onair.OnAir);
  const people = useSelector((state) => state.people.people);
  const [currentMovie, setCurrentMovie] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMovie((prevMovie) => (prevMovie + 1) % data.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    dispatch(fetchTrending());
    dispatch(fetchDiscoveri());
    dispatch(fetchOnAir());
    dispatch(fetchPopularPeople());
    dispatch(setCurrentSlide(0));
  }, [dispatch]);

  const sliderSettings = {
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <Navbar />
      <div className="carousel">
        {data.map((movie, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentMovie ? "show" : ""}`}
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="overlay flex flex-col mb-36">
              <h1 className="text-5xl font-bold whitespace-normal max-w-sm mb-3 text-white">{movie.name}</h1>
            </div>
            <div className="overlay flex flex-col items-start justify-end h-full px-6 pb-10 text-white">
              <h1 className="text-6xl l:text-4xl lg:text-4xl text-white font-semibold mb-3 max-w-md">"{movie.title}"</h1>
              <p className="text-white text-sm md:text-base max-w-md">
                <span style={{ fontStyle: "italic" }}>{movie.overview.slice(0, 100)}...</span>
              </p>
            </div>
          </div>
        ))}
      </div>
      <div>
        {/* {isLoggedIn && <h2 className="text-2xl text-white font-black my-4 text-center">Welcome!!</h2>} */}
        <div className="slider-container px-16 bg-zinc-950">
          <h2 className="text-2xl text-white font-black my-4"> TV Trending </h2>
          <Slider {...sliderSettings}>
            {Array.isArray(trending) &&
              trending?.map((show) => (
                <div key={show?.id} onClick={() => {}}>
                  <Link to={"/detailhome"} state={{ series_id: show?.id }}>
                    <div className="flex justify-center">
                      <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.name} />
                    </div>
                  </Link>
                </div>
              ))}
          </Slider>
          <h2 className="text-2xl text-white font-black my-4"> People </h2>
          <Slider {...sliderSettings}>
            {Array.isArray(people) &&
              people?.map((show) => (
                <div key={show?.id}>
                  <div className="flex justify-center">
                    <img src={`https://image.tmdb.org/t/p/w500${show.profile_path}`} />
                  </div>
                </div>
              ))}
          </Slider>
          <h2 className="text-2xl text-white font-black my-4">TV Discover</h2>
          <Slider {...sliderSettings}>
            {Array.isArray(discoveri) &&
              discoveri?.map((show) => (
                <div key={show?.id} onClick={() => {}}>
                  <Link to={"/detailhome"} state={{ series_id: show?.id }}>
                    <div className="flex justify-center">
                      <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.name} />
                    </div>
                  </Link>
                </div>
              ))}
          </Slider>
          <h2 className="text-2xl text-white font-black my-4">On Air TV</h2>
          <Slider {...sliderSettings}>
            {Array.isArray(OnAir) &&
              OnAir?.map((show) => (
                <div key={show?.id} onClick={() => {}}>
                  <Link to={"/detailhome"} state={{ series_id: show?.id }}>
                    <div className="flex justify-center">
                      <img src={`https://image.tmdb.org/t/p/w500${show.backdrop_path}`} alt={show.name} />
                    </div>
                  </Link>
                </div>
              ))}
          </Slider>
        </div>
      </div>
      <Footer />
    </>
  );
}
