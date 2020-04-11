import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from "axios";

import Card from "../../commons/Card";
import { Container } from "../../commons/Layouts";
import Pagination from "../../commons/Pagination";

export default function MainPage(props) {
  const [pokemons, setPokemons] = useState([]);
  const [pokeDetail, setPokeDetail] = useState([]);
  const [nextList, setNextList] = useState();
  const [prevList, setPrevList] = useState();

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const { data } = res;

      setPokemons(data.results);
      setNextList(data.next);
      setPrevList(data.previous);
    });
  }, []);

  useEffect(() => {
    pokemons.forEach(({ url }) => {
      Axios.get(url).then((res) => {
        const { data } = res;
        const { id, name, types } = data;
        setPokeDetail((prev) => [
          ...prev,
          {
            id,
            name,
            types,
            image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          },
        ]);
      });
    });
  }, [pokemons]);

  function renderList(data) {
    const temp = data.map((d) => {
      return (
        <Link key={`${d.id}-${d.name}`} to={`/homepage/${d.name}`}>
          <Card
            className="pokeCard"
            text={d.name}
            image={d.image}
            label={d.types[0].type.name}
          />
        </Link>
      );
    });
    if (temp.length > 0) {
      return temp;
    }

    return <span>I'm sorry, you have no pokemon</span>;
  }

  function paginationHandler(url) {
    if (!url) return null;
    return () => {
      Axios.get(url).then((res) => {
        const { data } = res;

        setPokemons(data.results);
        setNextList(data.next);
        setPrevList(data.previous);
      });
    };
  }

  return (
    <Wrapper>
      <Container>
        <CardList>{renderList(pokeDetail)}</CardList>
        <PaginationWrapper>
          <Pagination
            onPrev={paginationHandler(prevList)}
            onNext={paginationHandler(nextList)}
          />
        </PaginationWrapper>
      </Container>
    </Wrapper>
  );
}

const PaginationWrapper = Styled.div`
  position: relative;
  margin-left: auto;
  margin-top: 30px;
  width: max-content;
`;

const Wrapper = Styled.div`
  position: relative;
`;

const CardList = Styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 100px;

  .pokeCard{
    margin-bottom: 16px;
  }
`;
