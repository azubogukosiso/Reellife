import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import MoonLoader from "react-spinners/MoonLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

import Header from "./Header";
import Home from "./Home";
import NoData from "./NoData";
import MovieDisplay from "./MovieDisplay";
import MovieFavourites from "./MovieFavourites";
import MovieDetails from "./MovieDetails";
import Footer from "./Footer";

import "./css/Main.css";

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);
  const [heading, setHeading] = useState("");
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState();

  // EMPTIES THE MOVIE ARRAY
  const checkSearchValue = () => {
    if (searchValue === "") {
      setErrorMsg(false);
      setMovies([]);
    }
  };

  // THIS FETCHES THE RESPONSE TO WHATEVER REQUEST WAS MADE - WHETHER IT WAS FOR A MOVIE OR A SERIES
  const handleRequest = async (url) => {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
      setLoading(false);
    } else {
      setErrorMsg(true);
      setLoading(false);
    }
  };

  // THIS IS FUNCTION IS TRIGGERED ON CLICKING THE 'ALL' BUTTON IN THE CATEGORIES BAR. IT CHECKS IF THERE'S ANY INPUT IN THE SEARCH BAR IT SENDS A 'FETCH' REQUEST TO THE API USING THE SPECIFIED ROUTE AND THEN TRIGGERS THE 'HANDLEREQUEST' FUNCTION TO GET A RESPONSE TO THE REQUEST
  const getMovieRequest = async (searchValue) => {
    if (searchValue === "") {
      alert("Type in some keywords to search");
    } else {
      setLoading(true);
      setHeading("All Categories");
      const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}`;
      handleRequest(url);
    }
  };

  // THIS IS FUNCTION IS TRIGGERED BY CLICKING THE 'MOVIES' BUTTON IN THE CATEGORIES BAR. IT CHECKS IF THERE'S ANY INPUT IN THE SEARCH BAR, IF THERE IS, IT SENDS A 'FETCH' REQUEST TO THE API USING THE SPECIFIED ROUTE AND THEN TRIGGERS THE 'HANDLEREQUEST' FUNCTION TO GET THE APPRORIATE MOVIES AS A RESPONSE TO THE REQUEST
  const getMovieRequestMovies = async (searchValue) => {
    if (searchValue === "") {
      alert("Type in some keywords to search");
    } else {
      setLoading(true);
      setHeading("Only Movies");
      const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}&type=movie`;
      handleRequest(url);
    }
  };

  // THIS IS FUNCTION IS TRIGGERED BY CLICKING THE 'SERIES' BUTTON IN THE CATEGORIES BAR. IT CHECKS IF THERE'S ANY INPUT IN THE SEARCH BAR. IF THERE IS, IT SENDS A 'FETCH' REQUEST TO THE API USING THE SPECIFIED ROUTE AND THEN TRIGGERS THE 'HANDLEREQUEST' FUNCTION TO GET THE APPRORIATE SERIES AS A RESPONSE TO THE REQUEST
  const getMovieRequestSeries = async (searchValue) => {
    if (searchValue === "") {
      alert("Type in some keywords to search");
    } else {
      setLoading(true);
      setHeading("Only Series");
      const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${searchValue}&type=series`;
      handleRequest(url);
    }
  };

  const navigate = useNavigate();
  // THIS GETS THE DETAILS OF A PARTICULAR MOVIE
  const getMovieDetails = async (imdbID) => {
    const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${imdbID}`;
    const response = await fetch(url);
    const responseJson = await response.json();
    setMovieDetails(responseJson);
    navigate("/movie-details");
  };

  // SAVES IN THE FAVOURITES LIST TO THE BROWSER'S LOCAL STORAGE FOR A MUCH BETTER STORAGE ABILITY
  const saveToLocalStorage = (items) => {
    localStorage.setItem("reellife-favourites", JSON.stringify(items));
  };

  // SHOW SUCCESS MSG - MOVIE HAS BEEN ADDED TO FAVOURITES
  const showSuccessMsg = () => {
    toast('Movie has been added to favourites!', {
      position: "bottom-center",
      hideProgressBar: true,
      pauseOnHover: false,
    });
  };

  // SHOW SUCCESS MSG - MOVIE HAS BEEN REMOVED FROM TO FAVOURITES
  const showSuccessMsgRemove = () => {
    toast('Movie has been removed from favourites!', {
      position: "bottom-center",
      hideProgressBar: true,
      pauseOnHover: false,
    });
  };

  // SHOW INFO MSG - MOVIE IS ALREADY A FAVOURITE
  const showInfoMsg = () => {
    toast('Movie is already a favourite!', {
      position: "bottom-center",
      hideProgressBar: true,
      pauseOnHover: false,
    });
  };

  // TRIGGERED WHEN ADDING A PARTICULAR MOVIE TO THE FAVOURITES LIST, BY CLICKING THE FAVOURITE BUTTON
  const addFavouriteMovie = (movie) => {
    let alreadyFavourite = false;
    favourites.map(favourite => {
      if (favourite.imdbID === movie.imdbID) {
        alreadyFavourite = true;
      }
      return alreadyFavourite;
    })

    if (!alreadyFavourite) {
      const newFavouriteList = [...(favourites || []), movie];
      setFavourites(newFavouriteList);
      saveToLocalStorage(newFavouriteList);
      showSuccessMsg();
    } else {
      showInfoMsg();
    }
  };

  // REMOVES A MOVIE FROM THE FAVOURITE LIST USING THE PROVIDED ID
  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
    showSuccessMsgRemove();
  };

  let component;
  // IF THERE WERE NO MOVIES AT THE MOMENT, WE SET THE COMPONENT TO BE SHOWN AS THE 'NO DATA' COMPONENT OR THE 'HOME' COMPONENT IF A SEARCH HAS NOT BEEN MADE YET
  if (movies.length === 0) {
    if (errorMsg) {
      component = <NoData />;
    } else if (loading) {
      component = <MoonLoader
        color={"#fff"}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />;
    } else {
      component = <Home />;
    }
  } else {
    // IF LOADING IS SET TO TRUE WE SET THE COMPONENT TO BE SHOWN TO BE THE ANIMATED LOADING SVG ICON ELSE WE SET IT TO THE SEARCH RESULTS
    component = loading ? (
      <MoonLoader
        color={"#fff"}
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    ) : (
      <MovieDisplay
        movies={movies}
        setMovies={setMovies}
        heading={heading}
        handleFavouritesClick={addFavouriteMovie}
        getMovieDetails={getMovieDetails}
      />
    );
  }

  // WE RUN THIS TO LOAD THE MOVIES IN THE LOCAL STORAGE INTO THE FAVOURITE MOVIES ARRAY FOR DISPLAY
  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("reellife-favourites")
    );

    if (movieFavourites === null) {
      setFavourites([]);
    } else {
      setFavourites(movieFavourites);
    }
  }, []);

  // THIS LOOKS OUT FOR CHANGES TO THE SEARCH VALUE AND CALLS THE "CHECKSEARCHVALUE" FUNCTION
  useEffect(() => {
    checkSearchValue();
    // eslint-disable-next-line
  }, [searchValue]);

  return (
    <>
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        getMovieRequest={getMovieRequest}
        getMovieRequestMovies={getMovieRequestMovies}
        getMovieRequestSeries={getMovieRequestSeries}
      />
      <main className="container my-5 d-flex justify-content-center align-items-center flex-column">
        <Routes>
          <Route path="/" element={component} />
          <Route
            path="/favourites"
            element={
              <MovieFavourites
                movies={favourites}
                handleFavouritesClick={removeFavouriteMovie}
                getMovieDetails={getMovieDetails}
              />
            }
          />
          <Route path="/movie-details" element={<MovieDetails movieDetails={movieDetails} />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer autoClose={3000} toastStyle={{ backgroundColor: "rgb(0,0,70)", border: "2px solid #fff" }} />
    </>
  );
};

export default Main;
