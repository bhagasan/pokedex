import React from "react";
import Styled, { css } from "styled-components";
import PropTypes from "prop-types";

import Label from "../Label";
import { Color } from "../Library";
import PokeBall from "../../../assets/icons/pokeball.svg";

export default function Card(props) {
  const { image, text, label } = props;

  return (
    <Wrapper label={label} {...props}>
      <img src={image} alt="pokemon" />
      <span>{text}</span>
      {label && <Label className="label">{label}</Label>}
      <img className="pokeball" src={PokeBall} alt="pokeball" />
    </Wrapper>
  );
}

Card.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  label: PropTypes.string,
};

Card.defaultProps = {
  label: null,
};

const Wrapper = Styled.div`
  border-radius: 8px;
  width: 180px;
  height: 120px;
  position: relative;
  background-color: ${({ label }) => Color[label]};

  .label{
    position: absolute;
    top: 40px;
    left: 10px;
  }
  :hover{
    transform: scale(1.02);
  }
    img:not(.pokeball){
      width: 80px;
      position: absolute;
      bottom: 10px;
      right: 10px;
      z-index: 1;
    }
    .pokeball{
      position: absolute;
      bottom: -30px;
      right: -20px;
      width: 100px;
      z-index: 0;
      opacity: .3;
    }
    span{
      position: absolute;
      font-size: 18px;
      top: 15px;
      left: 10px;
      text-transform: capitalize;
      font-weight: 800;
    }

    ${({ label }) =>
      label &&
      css`
        span {
          color: ${Color.lightColors.includes(label) ? Color.black : "white"};
        }
      `}
`;
