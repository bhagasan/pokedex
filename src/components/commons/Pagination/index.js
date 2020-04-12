import React from "react";
import Styled, { css } from "styled-components";

export default function Pagination(props) {
  const { onNext } = props;
  return (
    <Wrapper>
      <Btn onClick={onNext}>Load more...</Btn>
    </Wrapper>
  );
}

const Btn = Styled.button`
  position: relative;
  border: none;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);
  border-radius: 8px;
  width: 300px;
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
  width: max-content;
`;
