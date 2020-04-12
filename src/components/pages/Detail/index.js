import React, { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import "react-tabs/style/react-tabs.css";
import Axios from "axios";
import Styled, { css } from "styled-components";
import { Color } from "../../commons/Library";
import Loading from "../../commons/Loading";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Bar from "../../commons/Bar";
import Label from "../../commons/Label";
import IconBack from "../../../assets/icons/back-arrow.svg";
import PokeBall from "../../../assets/icons/pokeball.svg";

export default function ItemDetailPage() {
  const { id } = useParams();
  const img = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const [profile, setProfile] = useState();
  const [bgColor, setBgColor] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [imgLoading, setImgLoading] = useState(false);

  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      const { data } = res;
      setProfile(data);
      setBgColor(data.types[0].type.name);
      setIsLoading(false);
    });
  }, [id]);

  function renderAbout(data) {
    if (data) {
      let abilities = data.abilities.map(({ ability }) => ability.name);
      return (
        <Layout>
          <label>Species</label>
          <span>{data.species.name}</span>
          <label>Height</label>
          <span>{data.height} ft</span>
          <label>Weight</label>
          <span>{data.weight} lbs</span>
          <label>Abilities</label>
          {<span>{abilities.toString()}</span>}
        </Layout>
      );
    }
    return null;
  }

  function renderStats(data) {
    if (data) {
      const { stats } = data;
      let total = 0;
      const temp = stats.map((d) => {
        total += d.base_stat;
        return (
          <Fragment key={d}>
            <label>{d.stat.name}</label>
            <Bar value={d.base_stat} />
          </Fragment>
        );
      });
      return (
        <Layout>
          {temp}
          <label>Total</label>
          <span>{total}</span>
        </Layout>
      );
    }
  }

  return (
    <Wrapper bgColor={bgColor}>
      <Loading isLoading={isLoading || imgLoading} />
      <MainInfo bgColor={bgColor}>
        <h1>{profile && profile.name}</h1>
        <Label size="large">{profile && profile.types[0].type.name}</Label>
      </MainInfo>
      <Thumbnail>
        <img src={img} alt="pokemon" onLoad={() => setImgLoading(false)} />
      </Thumbnail>
      <Details>
        <Tabs>
          <TabList>
            <Tab>About</Tab>
            <Tab>Base Stats</Tab>
          </TabList>
          <TabPanel>{renderAbout(profile)}</TabPanel>
          <TabPanel>{renderStats(profile)}</TabPanel>
        </Tabs>
      </Details>
      <Link className="back" to="/">
        <img src={IconBack} alt="back" /> Back
      </Link>
      <img className="pokeball" src={PokeBall} alt="pokeball" />
    </Wrapper>
  );
}

const MainInfo = Styled.div`
  position: absolute;
  top: 50px;
  right: 10vw;
  *{
    text-transform: capitalize;
  }
  h1{
    font-size: 72px;
    line-height: 1;
    margin-bottom: 10px;
  }

  ${({ bgColor }) =>
    bgColor &&
    css`
      h1 {
        color: ${Color.lightColors.includes(bgColor) ? Color.black : "white"};
      }
    `}

`;

const Layout = Styled.div`
  display: grid;
  grid-template-columns: calc(40% - 20px) 60%;
  grid-gap: 20px;
  label, span{
    text-transform: capitalize;
  }
`;

const Thumbnail = Styled.div`
  margin-left: 5vw;
  img{
    width: 40vw;
  }
`;

const Details = Styled.div`
  position: absolute;
  top: 50%;
  right: 10vw;
  transform: translateY(-50%);
  width: 45vw;
  min-height: 300px;
  border-radius: 8px;
  background-color: rgba(255,255,255, 1);
  padding: 30px;
  z-index: 2;
`;

const Wrapper = Styled.div`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${({ bgColor }) => Color[bgColor]};

  .back{
    position: absolute;
    top: 30px;
    left: 40px;
    display: flex;
    align-items: center;
    img{
      display: inline-block;
      margin-right: 10px;
      width: 16px;
    }
  }

  .pokeball{
    position: fixed;
    right: -10%;
    bottom: -15%;
    opacity: .25;
    width: 55vw;
  }
`;
