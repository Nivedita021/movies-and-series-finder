import React, { useState, useEffect } from "react";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import MovieCard from "./MovieCard";
import SearchIcon from '@mui/icons-material/Search';
import "./App.css";
import MovieAbout from "./MovieAbout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchAppBar from "./Appbarsearch";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

const API_URL = "https://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Avengers");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    
    const data = await response.json();
  //console.log(data)
    setMovies(data.Search);
  };
  
  return (
   

    <div className="app">
      
     <AppBar position="fixed"
     sx={{bgcolor: "#5E029C"}}
     > 
     <Toolbar>
     <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
     <MovieFilterIcon />
     </IconButton>
     
     <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}> Movies And Series</Typography>
     </Toolbar>
      </AppBar>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          id="inputID"
        />
        <IconButton
         onClick={() => searchMovies(searchTerm)}
         size="large"
         edge="end"
         color="#5E029C"
         
        >
<SearchIcon/>
        </IconButton>
        
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
     
    </div>
    
      );
    };
    
    export default App;
