import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import OverlayImg from '../../images/denise-jans-Lq6rcifGjOU-unsplash.jpg'

function Content(){
    const [movie, setMovie] = useState([]);
    const [actors, setActors] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const abortCont = new AbortController();

        async function fetchMovie(){
            const result = await fetch('https://api.themoviedb.org/3/movie/'+window.location.href.split('?')[1]+'?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US', 
                                        {signal: abortCont.signal});

            result.json().then(response => setMovie(response)).catch(err => {
                if(err.name !== 'AbortError'){
                    setError(err);
                }
            })
                
        };

        fetchMovie();

        
        return() => {
            abortCont.abort();
        }

    }, []);

    useEffect(() => {

        const abortCont = new AbortController();

        async function fetchActors(){
            const result = await fetch('https://api.themoviedb.org/3/movie/'+window.location.href.split('?')[1]+'/credits?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US', 
                                    {signal: abortCont.signal});

            result.json().then(response => setActors(response.cast.filter(item => item.profile_path!=null))).catch(err => {
                if(err.name !== 'AbortError'){
                    setError(err);
                }
            });

        }

        fetchActors();

        return() => {
            abortCont.abort();
        }

    }, []);

    return(
        <section className='one-movie-section'>
            <div className="one-movie-section-overlay" style={{backgroundImage: "url("+OverlayImg+")"}} />
            <div className='image-title-one'>
                <img alt={movie.title} src={"https://image.tmdb.org/t/p/w500"+(movie.poster_path)+""} className='one-movie-image' />
                <div className='one-movie-heading-div'>
                    <h2>{movie.title}</h2>
                    <h3>{movie.tagline}</h3>
                    <div className='one-movie-additional-info'>
                        {movie.runtime!==0 ? <h4>Runtime: {movie.runtime}min</h4> : <p />}
                        {movie.budget!==0 ? <h4>Budget: {new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(movie.budget)}</h4>  : <p />}
                        {movie.revenue!==0 ? <h4>Revenue: {new Intl.NumberFormat('us-US', { style: 'currency', currency: 'USD' }).format(movie.revenue)}</h4> : <p />}
                        {movie.vote_average!==0 ? <h4>Av. score: {movie.vote_average}</h4> : <p />}
                    </div>
                </div>
            </div>
            <div className='one-movie-overview'>
                <h4>{movie.overview}</h4>
            </div>
            <div className='one-movie-actors-outter'>
                <h2>In this movie:</h2>
                <div className='one-movie-actors'>
                    {!error ? (
                        actors.slice(0,12).map((actor, i) => {
                            return(
                                <div key={i} >
                                    <img alt={actor.name} src={"https://image.tmdb.org/t/p/w500"+(actor.profile_path)+""} className="one-movie-actor-img" onClick={() => navigate('/actor?' + actor.id)} />
                                    <h2>{actor.name}</h2>
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