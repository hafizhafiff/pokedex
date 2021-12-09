import React, { useEffect, useState } from 'react';
import './App.css';
import styled, { ThemeProvider } from "styled-components";
import {lightTheme, darkTheme, GlobalStyles } from "./themes.js";

const StyledApp = styled.div``;
const inputKeyword = document.querySelector('.input-keyword');
const menuToggle = document.querySelector('.menu-toggle input');
const nav = document.querySelector('nav ul');

export default function App() {
  const [theme, setTheme] = useState("light");
  const [toggleMenu, setToggleMenu] = useState(false);

  const themeToggler = () => {
    theme === 'light' ? setTheme('dark'): setTheme('light');
  }


 const clickToggle = () => {
   setToggleMenu(!toggleMenu)
 }

const [filter, setFilter] = useState ("");
const handleSearchChange = (event) => {
  setFilter(event.target.value)
};

  const [viewPokemons, setViewPokemons] = useState([])
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState ('https://pokeapi.co/api/v2/pokemon?limit=72&offset=0')

  const getAllPokemons = async() => {
    const response = await fetch(loadMore)
    const data = await response.json()

    setLoadMore(data.next)
    
    function createPokemonObject (result) {
        result.forEach(async (pokemon) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
          const data = await response.json()

          setAllPokemons(currentList => [...currentList,data])
          setViewPokemons(currentList => [...currentList,data])
        })
    }
    createPokemonObject(data.results)
    await console.log(allPokemons)
  }
  useEffect(() => {
    getAllPokemons()
  }, [])

  useEffect(() => {
    const newPokemons = allPokemons.filter(pokemon => pokemon.name.includes(filter))
    setViewPokemons(newPokemons)
  }, [allPokemons, filter])

  return (
    <div className="App">
      <ThemeProvider theme= {theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <nav>
          <div class="logo">
            <img src="./pokeheader.png" width = "200px"/>
          </div>
          <ul class={toggleMenu && 'slide'}>
            <li><a href= "">Home</a></li>
            <li><a href="">Your Pokemon</a></li>
            <li><a href= "">Contact me</a></li>
            <li><a href= "">About</a></li>
          </ul>
          <div class="menu-toggle" onClick={() => clickToggle ()}>
            <input type="checkbox"/>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
        <div class="container-besar">
              <div class="bigbox">
              <div class="navigat">
              <input type="text" class="input-keyword" placeholder="Search Pokemon..." onChange={handleSearchChange}></input>
                <div class = "inbotton">
                  <button class = "search-button" type="button">Search</button>
                </div>
                <button class="theme" onClick={() => themeToggler ()}>Change Theme</button>
              </div>
                  <div class="bigbox-header">
                      <img src="./pikachu.png" width="70px" />
                      <div class="header">
                          <div>Welcome back, Afif</div>
                          <div>No Pokemon in your pocket</div>
                      </div>
                  </div>
                  {viewPokemons.length === 0 && <div class="nopoke">
                    No Pokemon Found
                  </div>}
                  <div class= "content">
                    {viewPokemons.map(pokemon => 
                      <div class="charcard">
                          <div class="cardheader">
                              <img src= {pokemon.sprites.front_default} width="130px" height="140px" />
                          </div>
                          <div class="charcontent">
                             {pokemon.name}
                          </div>
                          <div class="charnumber">
                              #{pokemon.id}
                          </div>
                      </div>
                      )}
                  </div>
                  <div class="loadmore">
                    <button onClick = {() => getAllPokemons()}>Load More</button>
                  </div>
              </div>
        </div>
        </StyledApp>
  </ThemeProvider>
    </div>
  );
  }
