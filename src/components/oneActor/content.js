import React, { useEffect, useState } from "react";
import OverlayImg from '../../images/denise-jans-Lq6rcifGjOU-unsplash.jpg'
import { useNavigate } from 'react-router-dom';

function Content(){
    const [movies, setMovies] = useState([]);
    const [actor, setActor] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const abortCont = new AbortController();

        async function fetchActor(){
            const result = await fetch('https://api.themoviedb.org/3/person/'+window.location.href.split('?')[1]+'?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US', 
                                    {signal: abortCont.signal});

            result.json().then(response => setActor(response)).catch(err => {
                if(err.name !== 'AbortError'){
                    setError(err);
                }
            });

        }

        fetchActor();

        return() => {
            abortCont.abort();
        }

    }, []);

    useEffect(() => {

        const abortCont = new AbortController();

        async function fetchMovies(){
            const result = await fetch('https://api.themoviedb.org/3/person/'+window.location.href.split('?')[1]+'/movie_credits?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US', 
                                        {signal: abortCont.signal});

            result.json().then(response => setMovies(response.cast.filter(item => item.poster_path !== null).slice(0, 8))).catch(err => {
                if(err.name !== 'AbortError'){
                    setError(err);
                }
            })
                
        };

        fetchMovies();

        
        return() => {
            abortCont.abort();
        }

    }, []);

    return(
        <section className='one-movie-section'>
            <div className="one-movie-section-overlay" style={{backgroundImage: "url("+OverlayImg+")"}} />
            <div className='image-title-one'>
                <img alt={actor.name} src={"https://image.tmdb.org/t/p/w500"+(actor.profile_path)+""} className='one-movie-image' />
                <div className='one-movie-heading-div'>
                    <h2>{actor.name}</h2>
                    <div className='one-movie-additional-info'>
                        <h4>Date of birth: {actor.birthday}</h4>
                        <h4>Place of birth: {actor.place_of_birth}</h4>
                        {actor.deathday!==null ? <h4>Date of death: {actor.deathday}</h4> : null}
                        {actor.gender===1 ? <h4>Gender: Female</h4> :<h4>Gender: Male</h4>}
                    </div>
                </div>
            </div>
            <div className='one-movie-overview'>
                <h4>{actor.biography}</h4>
            </div>
            <div className='one-movie-actors-outter'>
                <h2>Starred in:</h2>
                <div className='one-actor-movies'>
                    {!error ? (
                        movies.map((mov, i) => {
                            return(
                                <div key={i} className='one-actor-movie-div'>
                                    <img alt={mov.title} src={"https://image.tmdb.org/t/p/w500"+(mov.poster_path)+""} className="one-movie-actor-img" onClick={() => navigate('/movie?' + mov.id)} />
                                    <div className='one-actor-movie-info' >
                                        <h2>{mov.title}</h2>
                                        <h3>- {mov.character}</h3>
                                    </div>
                                </div>
                            )
                        })
                    ) : <p>{error}</p>}
                </div>
            </div>
        </section>
    )

}

export default Content;