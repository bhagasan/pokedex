import React from "react";
import Styled from "styled-components";

import { Color } from "../Library";

export default function Card(props) {
  const { image, text, label } = props;

  return (
    <Wrapper label={label} {...props}>
      <img src={image} alt="pokemon" />
      <span>{text}</span>
      <Label>{label}</Label>
    </Wrapper>
  );
}

const Label = Styled.div`
  font-size: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.15);
  width: max-content;
  border-radius: 10px;
  padding: 4px 10px;
  line-height: 1;
  position: absolute;
  top: 40px;
  left: 10px;
  text-transform: capitalize;
`;

const lightColor = ["electric", "normal", "fairy"];

const Wrapper = Styled.div`
  border-radius: 8px;
  width: 180px;
  height: 120px;
  position: relative;
  background-color: ${({ label }) => Color[label]};
  :hover{
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
      top: 15px;
      left: 10px;
      text-transform: capitalize;
      color: ${({ label }) =>
        lightColor.includes(label) ? Color.black : "white"} ;
      font-weight: 800;
    }
`;
