import React from "react";
import Styled from "styled-components";

export default function Card(props) {
  const { image, text } = props;
  return (
    <Wrapper {...props}>
      <img src={image} alt="pokemon" />
      <span>{text}</span>
    </Wrapper>
  );
}

const Wrapper = Styled.div`
background-color: white;
border-radius: 8px;
width: 180px;
height: 120px;
position: relative;
/* transition-duration: .3s; */
/* border: 2px solid transparent; */
:hover{
  /* transform: scale(1.1); */
  /* border: 2px solid #e0e0e0; */
}
  img{
    width: 80px;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  span{
    position: absolute;
    font-size: 18px;
    top: 20px;
    left: 10px;
    text-transform: capitalize;
  }
`;
