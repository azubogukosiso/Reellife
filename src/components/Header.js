import { NavLink } from "react-router-dom";
import "./css/Header.css";

const Header = (props) => {
  return (
    <>
      <div className="main">
        <NavLink className="text-decoration-none" to="/">
          <h1 className="brand">Reellife🎬</h1>
        </NavLink>

        <div className="search-container rounded p-1">
          <input
            type="text"
            value={props.value}
            onChange={(event) => props.setSearchValue(event.target.value)}
            placeholder="Enter movie keywords..."
            className="search-bar form-control rounded border border-light p-2 w-75"
          />
          <NavLink
            to="/"
            className="custom-btn rounded w-25 d-flex justify-content-center align-items-center"
            onClick={() => {
              props.getMovieRequest(props.searchValue);
            }}
          >
            Search
          </NavLink>
        </div>

        <NavLink
          className="fav-btn rounded border border-light p-2"
          to="/favourites"
        >
          View All Favourites
        </NavLink>
      </div>

      <div className="sub py-3">
        <NavLink
          to="/"
          className="custom-btn rounded p-2 mx-3 border border-light"
          onClick={() => {
            props.getMovieRequest(props.searchValue);
          }}
        >
          All
        </NavLink>
        <NavLink
          to="/"
          className="custom-btn rounded p-2 mx-3 border border-light"
          onClick={() => {
            props.getMovieRequestMovies(props.searchValue);
          }}
        >
          Movies
        </NavLink>
        <NavLink
          to="/"
          className="custom-btn rounded p-2 mx-3 border border-light"
          onClick={() => {
            props.getMovieRequestSeries(props.searchValue);
          }}
        >
          Series
        </NavLink>
      </div>
    </>
  );
};

export default Header;
