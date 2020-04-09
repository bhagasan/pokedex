import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from "axios";

export default function MainPage(props) {
  const [pokemons, setPokemons] = useState([]);
  const [nextList, setNextList] = useState();

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/").then(res => {
      const { data } = res;
      setPokemons(data.results);
      setNextList(data.next);
    });
  }, []);

  function renderList(data) {
    const temp = data.map(({ name }) => (
      <li key={name}>
        <Link to={`/homepage/${name}`}>{name}</Link>
      </li>
    ));
    if (temp.length > 0) {
      return temp;
    }

    return <span>I'm sorry, you have no pokemon</span>;
  }

  return (
    <Wrapper>
      <h1>Mainpage</h1>
      <ul>{renderList(pokemons)}</ul>
    </Wrapper>
  );
}

const Wrapper = Styled.div``;
