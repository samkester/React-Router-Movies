import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Route, Switch} from "react-router-dom";

import SavedList from './Movies/SavedList';
import MovieList from './Movies/MovieList';
import Movie from "./Movies/Movie";

const App = () => {
  const [saved, setSaved] = useState([]); // Stretch: the ids of "saved" movies
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const getMovies = () => {
      axios
        .get('http://localhost:5000/api/movies')
        .then(response => {
          setMovieList(response.data);
        })
        .catch(error => {
          console.error('Server Error', error);
        });
    }
    getMovies();
  }, []);

  function getMovieFromID(id){
    for(let i = 0; i < movieList.length; i++){
      if(movieList[i].id == id) return movieList[i];
    }
    return undefined;
  }

  function hasSavedID(id){
    for(let i = 0; i < saved.length; i++){
      if(saved[i].id == id) return true;
    }
    return false;
  }

  const addToSavedList = id => {
    if(!hasSavedID(id)){
      setSaved([...saved, getMovieFromID(id)]);
    }
    // This is stretch. Prevent the same movie from being "saved" more than once
  };

  return (
    <div>
      <SavedList list={saved} />
      <Switch>
        <Route path="/movies/:id"><Movie addToSavedList={addToSavedList} /></Route>
        <Route path="/"><MovieList movies={movieList} /></Route>
      </Switch>
    </div>
  );
};

export default App;
