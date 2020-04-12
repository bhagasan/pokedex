import React, { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Axios from "axios";
import Styled from "styled-components";
import { Color } from "../../commons/Library";
import Bar from "../../commons/Bar";

export default function ItemDetailPage(props) {
  const { id } = useParams();
  const img = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  const [profile, setProfile] = useState();
  const [bgColor, setBgColor] = useState();

  useEffect(() => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => {
      const { data } = res;
      setProfile(data);
      setBgColor(data.types[0].type.name);
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
          <Fragment>
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
    <div className="transition-item detail-page">
      <Wrapper bgColor={bgColor}>
        <Thumbnail>
          <img src={img} alt="pokemon" />
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
          Back
        </Link>
      </Wrapper>
    </div>
  );
}

const Layout = Styled.div`
  display: grid;
  grid-template-columns: calc(40% - 20px) 60%;
  grid-gap: 20px;
  label, span{
    text-transform: capitalize;
  }
`;

const Thumbnail = Styled.div`
  margin-left: 10%;
  img{
    width: 420px;
  }
`;

const Details = Styled.div`
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  width: 45%;
  min-height: 300px;
  border-radius: 8px;
  background-color: white;
  padding: 30px;
`;

const Wrapper = Styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background-color: ${({ bgColor }) => Color[bgColor]};

  .back{
    position: absolute;
    top: 30px;
    left: 40px;
  }
`;
