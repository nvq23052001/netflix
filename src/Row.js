import React, { useState, useEffect } from 'react';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import './Row.css';
import instance from './axios';

const base_url = 'https://image.tmdb.org/t/p/original'

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await instance.get(fetchUrl);
            // https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_network=213

            setMovies(request.data.results)
        }
        fetchData();

    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        }
    };

    const clickHandle = (movie) => {
        console.log(movie.name);
        if (trailerUrl) {
            setTrailerUrl('')
        } else {

            movieTrailer(movie.name)
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search)

                    setTrailerUrl(urlParams.get("v"));
                })
                .catch(err => console.log(err));
        }
    }
    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {movies.map(movie => (
                    <img
                        onClick={() => clickHandle(movie)}
                        key={movie.id}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                    />
                ))}
            </div>
            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row;


