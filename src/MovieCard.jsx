

import React, { useState, useEffect } from 'react';
import { Button, Card, CardMedia, Typography, Link } from '@mui/material';
import MovieAbout from './MovieAbout';
import { Info } from '@mui/icons-material';
const MovieCard = ({ movie: { imdbID, Year, Poster, Title, Type } }) => {

  const [summary, setSummary] = useState([]);
  const [showSummary, setShowSummary] = useState(false);

  const fetchSummary = async () => {
    const response = await fetch(`https://www.omdbapi.com?apikey=b6003d8a&i=${imdbID}&plot=short`);
    const data = await response.json();
    setSummary(data);
  };

  useEffect(() => {
    if (showSummary) {
      setTimeout(() => {
        setShowSummary(false);
      }, 10000);
    }
  }, [showSummary]);

  const handleClick = () => {
    fetchSummary();
    setShowSummary(true);
  };

  return (
    <Card sx={{ bgcolor: '#5E029C', m: 2 }}>
      <div className="movie" key={imdbID}>

        <div>
          <p>{Year}</p>
          
        </div>

        <CardMedia image={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400'} alt={Title} />
       
        <div>


          <Typography><span>{Type}</span></Typography>

          <Typography variant='h3'>{Title}</Typography>
          <Button onClick={handleClick}><Info sx={{color: 'white'}}/></Button>
       {showSummary && <><Typography variant='body1' sx={{color: 'white'}}>Plot: {summary.Plot}</Typography>
       <Typography variant='subtitle' sx={{color: 'white', fontFamily:'cursive'}}>Actors: {summary.Actors}</Typography>
      
       </>
       }
          
        </div>
      </div>
    </Card>
  );
};

export default MovieCard;
