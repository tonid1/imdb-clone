import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Content(){
    const [query, setQuery] = useState('');
    const [answer, setAnswer] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const abortCont = new AbortController();

        window.location.href.includes('search') ? setQuery('search') : setQuery('genres');

        async function fetchData(){
            const result = await fetch(query==='search' ? 
            'https://api.themoviedb.org/3/search/movie?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US&query='+window.location.href.split('search=')[1]+'&page=1&include_adult=false' : 
            'https://api.themoviedb.org/3/discover/movie?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres='+window.location.href.split('genre=')[1]+'&with_watch_monetization_types=flatrate', 
            {signal: abortCont.signal});

            result.json().then(response => setAnswer(response.results)).catch(err => {
                if(err.name !== 'AbortError'){
                    setError(err);
                }
            });

        }

        fetchData();

        return() => {
            abortCont.abort();
        }

    }, [query]);

    return(
        <section className='results-section'>
            <h2 className='results-heading'>Showing {answer.length === 1 ? answer.length+' result' : answer.length+' results'}</h2>
            <div className='results-outter'>
                {!error ? (answer.map((ans, i) => {
                    return(
                        <div className='results-middle' key={i}>
                            <div className='results-inner' onClick={() => navigate('/movie?' + ans.id)}>
                                <img alt='' src={"https://image.tmdb.org/t/p/w500"+(ans.poster_path)+""} className='results-img' />
                                <h3 className='results-title'>{ans.title}</h3>
                            </div>
                        </div>
                    )
                    })) :
                    <p>{error}</p>
                }
            </div>
        </section>
    )
}

export default Content;