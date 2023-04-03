import "./css/MovieDisplay.css";
import defImage from "../images/no-image.png";

const MovieDetails = (props) => {
    return (
        <div className='container'>
            <h3 className="text-center mb-5">Details of the {props.movieDetails.Type}: {props.movieDetails.Title}</h3>
            <div className='row justify-content-center'>
                <div className='img-border border border-2 p-0 col-12 col-md-3'>
                    <img src={props.movieDetails.Poster !== "N/A" ? props.movieDetails.Poster : defImage} alt="" className='image img-fluid' />
                </div>
                <div className='col-12 col-sm-10 col-lg-7 mt-3 mt-lg-0 ms-md-3 text-center text-lg-start'>
                    <span><h5>Year of Release: <br /> {props.movieDetails.Year}</h5></span>
                    <hr />
                    <span><h5>Age Rating: <br /> {props.movieDetails.Rated}</h5></span>
                    <hr />
                    <span><h5>Runtime: <br /> {props.movieDetails.Runtime}</h5></span>
                    <hr />
                    <span><h5>Cast: <br /> {props.movieDetails.Actors}</h5></span>
                    <hr />
                    <span><h5>Plot: <br /> {props.movieDetails.Plot}</h5></span>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default MovieDetails