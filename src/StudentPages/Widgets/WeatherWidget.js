import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const apiKey = "332ab0a8790e454e87e110615232905";
        const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Ankara&lang=tr`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, []);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const { location, current } = weatherData;
  const { name, region, country } = location;
  const { temp_c, condition } = current;

  const getWeatherIcon = (conditionIcon) => {
    return <img src={conditionIcon} alt="weather-icon" />;
  };
  const weatherIcon = getWeatherIcon(condition.icon);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={200}
      width={200}
      backgroundColor="#e0e0e0"
      borderRadius={10}
      padding={2}
    >
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">{region}</Typography>
      <Typography variant="body1">{country}</Typography>
      <Typography variant="h4">{temp_c}°C</Typography>
      <Box fontSize={40}>{weatherIcon}</Box>
    </Box>
  );
};

export default WeatherWidget;
