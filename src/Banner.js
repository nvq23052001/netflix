import React, { useState, useEffect } from 'react'
import axios from './axios';

import './Banner.css';

function Banner({ fetchUrl }) {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovie(request.data.results[Math.floor(
                Math.random() * request.data.results.length - 1
            )])
        }
        fetchData()
    }, [fetchUrl])

    // shorten description 
    const truncate = (srt, n) => {
        return srt?.length > n ? srt.substr(0, n - 1) + '...' : srt;
    }

    return (
        <header className='banner'
            style={{
                backgroundSize: 'cover',
                backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
                backgroundPosition: 'center center'
            }}
        >
            <div className="banner__contents">
                <h1 className='banner__title'>
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button className="banner__button">
                        Play
                    </button>
                    <button className="banner__button">
                        My List
                    </button>
                </div>
                <h2 className="banner__description">
                    {truncate(movie?.overview, 300)}
                </h2>
            </div>
            <div className="banner--fade" />
        </header>
    )
}

export default Banner;
