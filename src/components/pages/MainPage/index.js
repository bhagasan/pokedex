import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Route } from "react-router-dom";
import { Color } from "../../commons/Library";

import { Container } from "../../commons/Layouts";
import Card from "../../commons/Card";
import Pagination from "../../commons/Pagination";
import Filter from "../../commons/Filter";
import DetailPage from "../Detail";
import Loading from "../../commons/Loading";
import PokeBall from "../../../assets/icons/pokeball.svg";

export default function MainPage() {
  const [pokemons, setPokemons] = useState([]);
  const [pokeDetail, setPokeDetail] = useState([]);
  const [nextList, setNextList] = useState();
  const [dataFilter, setDataFilter] = useState({});
  const [dataFilterApplied, setDataFilterApplied] = useState();
  const [filterSelected, setFilterSelected] = useState([]);
  const [filterLabels, setFilterLabels] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSmall, setIsLoadingSmall] = useState(false);

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const { data } = res;

      setPokemons(data.results);
      setNextList(data.next);

      setIsLoading(false);
    });

    Axios.get("https://pokeapi.co/api/v2/type/").then((res) => {
      const { data } = res;
      const temp = data.results.map(({ name }) => name);
      setDataFilter({
        types: temp,
      });
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
        <Link key={`${d.id}-${d.name}`} to={`/details/${d.id}`}>
          <Card text={d.name} image={d.image} label={d.types[0].type.name} />
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
      setIsLoadingSmall(true);
      Axios.get(url).then((res) => {
        const { data } = res;

        if (dataFilterApplied) {
          applyFilter(dataFilterApplied);
        }

        setPokemons(data.results);
        setNextList(data.next);
        setIsLoadingSmall(false);
      });
    };
  }

  function selectFilterItem(event) {
    const { name } = event.target;
    const temp = filterSelected;
    const index = temp.indexOf(name);
    if (index > -1) {
      temp.splice(index, 1);
    } else {
      temp.push(name);
    }
    applyFilter(temp);
    setFilterLabels(temp);
    setFilterSelected(temp);
  }

  function applyFilter(data) {
    const temp = [];
    pokeDetail.forEach((list) => {
      if (data.includes(list.types[0].type.name)) {
        temp.push(list);
      }
    });
    if (data.length > 0) {
      setDataFilterApplied(temp);
    } else {
      setFilterLabels();
      setDataFilterApplied(null);
    }
  }

  return (
    <Wrapper>
      <Loading isLoading={isLoading} type="full" />
      <Container>
        <Title>Pokedex</Title>
        <Filter
          data={dataFilter}
          filterHandler={selectFilterItem}
          labels={filterLabels}
        />
        <CardList>{renderList(dataFilterApplied || pokeDetail)}</CardList>
        <PaginationWrapper>
          {isLoadingSmall ? (
            <Loading isLoading={isLoadingSmall} />
          ) : (
            <Pagination onNext={paginationHandler(nextList)} />
          )}
        </PaginationWrapper>
        <img
          className="pokeball-main"
          src={PokeBall}
          alt="pokebal background"
        />
      </Container>
      <Route path="/details/:id" component={DetailPage} />
    </Wrapper>
  );
}

const PaginationWrapper = Styled.div`
  position: relative;
  margin: auto;
  margin-top: 30px;
  width: max-content;
`;

const Wrapper = Styled.div`
  position: relative;
  .pokeball-main{
    position: absolute;
    top: -80px;
    left: -162px;
    filter: invert(1);
    opacity: .05;
    width: 390px;
    z-index: -1;
    pointer-events: none;
  }
`;

const Title = Styled.h1`
  font-size: 32px;
  color: ${Color.black};
`;

const CardList = Styled.div`
  display: grid;
  grid-template-columns: repeat(5, max-content);
  grid-gap: 12px;
  margin-top: 50px;
`;
