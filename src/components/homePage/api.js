import React, { useEffect, useState } from 'react';
import OverlayImg from '../../images/denise-jans-Lq6rcifGjOU-unsplash.jpg';
import {useNavigate} from 'react-router-dom';

function PopularMovies(){
	const [movies,setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

	const [clicked, setClicked] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrolledLeft, setScrolledLeft] = useState(0);

    const HandleMouseDown = (e) => {

        setClicked(true);
        document.getElementById('slider').classList.add('active');
        setStartX(e.pageX - document.getElementById('slider').offsetLeft);
        setScrolledLeft(document.getElementById('slider').scrollLeft);

    }

    const HandleMouseUp = () => {
        setClicked(false);
        document.getElementById('slider').classList.remove('active');
    }

    const HandleMouseLeave = () => {
        setClicked(false);
        document.getElementById('slider').classList.remove('active');
    }

    const HandleMouseMove = (e) => {

        if(!clicked){
            return;
        }

        e.preventDefault();
        const x = e.pageX - document.getElementById('slider').offsetLeft;
        const move = (x - startX) * 2;
        document.getElementById('slider').scrollLeft = scrolledLeft - move;
            
    }

  	useEffect(() => {

      const abortCont = new AbortController();

    async function discoverMovies(){
      const result = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=1b3dfe7d0f0ae0670f2045f2c73efa01&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate",
                                {signal: abortCont.signal});

        result.json().then(response => setMovies(response.results)).catch(err => {
          if(err.name !== 'AbortError'){
            setError(err);
          }
        });

    }

    discoverMovies();

    return() => {
      abortCont.abort();
    }

  }, [])

	return(
		<section className="popular-movies-section" id='movies'>
			<div className="popular-movies-overlay" style={{backgroundImage: "url("+OverlayImg+")"}} />
			<h2 className='text'>Currently popular movies</h2>
			<div className="main-flex" id='slider' onMouseDown={HandleMouseDown} onMouseUp={HandleMouseUp} onMouseLeave={HandleMouseLeave} onMouseMove={HandleMouseMove}>
      {!error ? (movies.map((mov, i) => {
        return(
        <div key={i} className="div-item" onClick={() => navigate('/movie?'+mov.id)}>
          <img alt={mov.title} src={"https://image.tmdb.org/t/p/w500"+(mov.poster_path)+""} className="item-img"/>
          <h4 className='mov-title' >{mov.title}</h4>
        </div>
        )
      })) : <p>{error}</p>
    }
    </div>
		</section>
	)
}

export default PopularMovies;