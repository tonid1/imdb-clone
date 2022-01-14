import React from 'react';
import { useNavigate } from 'react-router';

function Search (){
    const navigate = useNavigate();

    const handleSubmit = () => {

        navigate('/result?search='+document.querySelector('#search').value);
    }

    return(
        <div className='search-bar-div'>
            <input id='search' type='text' placeholder='Search for a movie' className='search-bar' />
            <button type='submit' className='search-button' onClick={handleSubmit} >Search</button>
        </div>
    )
}

export default Search;