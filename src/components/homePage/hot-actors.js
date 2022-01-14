import React, { useEffect, useState }from "react";
import { useNavigate } from "react-router";

function HotPeople(){
    const [people,setPeople] = useState([]);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        const abortCont = new AbortController();

        async function fetchPeople(){
            const result = await fetch("https://api.themoviedb.org/3/trending/person/week?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01", 
                                    {signal: abortCont.signal});

            result.json().then(response => setPeople(response.results.filter(item => item.known_for_department === "Acting").slice(0, 7))).catch(err => {
                if(err.name !== 'AbortError'){
                    setError(err);
                }
            });
            
        }

        fetchPeople();

        return() => {
            abortCont.abort();
        }
    })

    return(
        <section className='actors-section' id='actors'>
            <h1>Hot actors this week</h1>
            <div className='actors-div'>
                {!error ? (people.map((peop, i) => {
                    return(
                        <div key={i} className="div-item-actors">
                            <img alt={peop.id} src={"https://image.tmdb.org/t/p/w500"+(peop.profile_path)+""} className="actors-item-img" onClick={() => navigate('actor?'+peop.id)} />
                            <h2 key={i} className='actors-title' >{peop.name}</h2>
                        </div>
                    )
                })) : <p>{error}</p>
                }
            </div>

        </section>
    )
}

export default HotPeople;