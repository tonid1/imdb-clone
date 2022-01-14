import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';

function Genres(){
    const [genres,setGenres] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {

        const abortCont = new AbortController();

        async function fetchGenres(){
            const result = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US",
                                        {signal: abortCont.signal});

             result.json().then(response => setGenres(response.genres)).catch(err => {
                 if(err.name !== 'AbortError'){
                     setError(err);
                 }
             });
        }

        fetchGenres();

        return() => {
            abortCont.abort();
        }
    }, [])

    return(
        <section className='genres-section'>
            <h1>Select by genre</h1>
            <div className='genres-div'>
                {!error ? 
                    (genres.map((genre, i) => {
                    return(
                        <h2 key={i} className='genre-title' onClick={() => navigate('/result?genre='+genre.id)} >{genre.name}</h2>
                    )
                })) : <p>{error}</p>
            }
            </div>
        </section>
    )
}

export default Genres;