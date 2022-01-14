import React from 'react';
import PopularMovies from './api';
import Header from '../globals/header';
import Genres from './genres';
import HotPeople from './hot-actors';
import Footer from '../globals/footer';

function HomePage(){
    return(
        <div>
            <Header />
            <PopularMovies />
            <Genres />
            <HotPeople />
            <Footer />
        </div>
    )
}

export default HomePage;