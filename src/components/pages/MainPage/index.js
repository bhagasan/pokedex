import React, { useEffect, useState } from "react";
import Styled from "styled-components";
import { Link } from "react-router-dom";
import Axios from "axios";

import Card from "../../commons/Card";
import { Container } from "../../commons/Layouts";
import Pagination from "../../commons/Pagination";
import Filter from "../../commons/Filter";

export default function MainPage(props) {
  const [pokemons, setPokemons] = useState([]);
  const [pokeDetail, setPokeDetail] = useState([]);
  const [nextList, setNextList] = useState();
  const [prevList, setPrevList] = useState();
  const [dataFilter, setDataFilter] = useState({});
  const [dataFilterApplied, setDataFilterApplied] = useState();
  const [filterSelected, setFilterSelected] = useState([]);
  const [filterLabels, setFilterLabels] = useState();

  useEffect(() => {
    Axios.get("https://pokeapi.co/api/v2/pokemon/").then((res) => {
      const { data } = res;

      setPokemons(data.results);
      setNextList(data.next);
      setPrevList(data.previous);
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
            // image: `https://pokeres.bastionbot.org/images/pokemon/${id}.png`,
          },
        ]);
      });
    });
  }, [pokemons]);

  function renderList(data) {
    const temp = data.map((d) => {
      return (
        <Link key={`${d.id}-${d.name}`} to={`/homepage/${d.name}`}>
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
      Axios.get(url).then((res) => {
        const { data } = res;

        if (dataFilterApplied) {
          applyFilter(dataFilterApplied);
        }

        setPokemons(data.results);
        setNextList(data.next);
        setPrevList(data.previous);
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
      <Container>
        <Filter
          data={dataFilter}
          filterHandler={selectFilterItem}
          labels={filterLabels}
        />
        <CardList>{renderList(dataFilterApplied || pokeDetail)}</CardList>
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
  display: grid;
  grid-template-columns: repeat(5, max-content);
  grid-gap: 12px;
  margin-top: 50px;
`;
