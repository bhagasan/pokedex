import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from "axios";

import Card from "../../commons/Card";
import { Container } from "../../commons/Layouts";

export default function MainPage(props) {
  const [pokemons, setPokemons] = useState([]);
  const [nextList, setNextList] = useState();

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const { data } = res;

      const temp = data.results.map(({ url, name }) => {
        const n = url.split("/");
        const id = n[n.length - 2];

        return {
          name,
          url,
          id,
          image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
        };
      });

      setPokemons(temp);
      setNextList(data.next);
    });
  }, []);

  function renderList(data) {
    const temp = data.map((d) => {
      return (
        <Link key={`${d.id}-${d.name}`} to={`/homepage/${d.name}`}>
          <Card className="pokeCard" text={d.name} image={d.image} />
        </Link>
      );
    });
    if (temp.length > 0) {
      return temp;
    }

    return <span>I'm sorry, you have no pokemon</span>;
  }

  return (
    <Wrapper>
      <Container>
        <CardList>{renderList(pokemons)}</CardList>
      </Container>
    </Wrapper>
  );
}

const Wrapper = Styled.div`
  
`;

const CardList = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .pokeCard{
    margin-bottom: 16px;
  }
`;
