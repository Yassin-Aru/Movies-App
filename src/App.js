import React from "react";
import { useEffect, useState} from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";
// f26d57b1 api key

const API_URL = "http://www.omdbapi.com?apikey=f26d57b1";

const movie1 = {
    "Title": "Venom",
    "Year": "2018",
    "imdbID": "tt1270797",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BNzAwNzUzNjY4MV5BMl5BanBnXkFtZTgwMTQ5MzM0NjM@._V1_SX300.jpg"
  }

const App = () =>{
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() =>{
        searchMovies("venom");
    }, []);

    return (
        <div className="app">
            <h1>MoviesList</h1>

            <div className="search">
                <input  placeholder="Type name of the movie..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img    src={SearchIcon}
                        alt="search"
                        onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            //map is a method that required a return 
                            //{return (<MovieCard movie={movie} />)}
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found!</h2>
                    </div>
                )
            }

        </div>
    )
}
export default App;