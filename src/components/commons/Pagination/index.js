import React from "react";
import Styled, { css } from "styled-components";

import IconPrev from "../../../assets/icons/back.svg";
import IconNext from "../../../assets/icons/next.svg";

export default function Pagination(props) {
  const { onPrev, onNext } = props;
  return (
    <Wrapper>
      <Btn onClick={onPrev}>
        <img src={IconPrev} alt="prev" />
      </Btn>
      <Btn onClick={onNext}>
        <img src={IconNext} alt="next" />
      </Btn>
    </Wrapper>
  );
}

const Btn = Styled.button`
  position: relative;
  border: none;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);
  border-radius: 100%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  transition-duration: .3s;
  :hover{
    transform: scale(1.1);
  }
  img{
    width: 16px;
    opacity: .5;
  }

  ${(props) =>
    props.onClick
      ? css`
          opacity: 1;
          pointer-events: auto;
        `
      : css`
          opacity: 0.2;
          pointer-events: none;
        `}

`;

const Wrapper = Styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  grid-gap: 20px;
`;
