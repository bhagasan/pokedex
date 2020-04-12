import React from "react";
import Styled from "styled-components";
import ImgLoading from "../../../assets/images/loading.gif";

export default function Loading(props) {
  return (
    <Wrapper isLoading={props.isLoading}>
      <img src={ImgLoading} alt="loading" />
    </Wrapper>
  );
}

const Wrapper = Styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
  background-color: #F3FCFF;
  transition-duration: .3s;


  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 1;
    pointer-events: auto;
  `}
  
  img{
    position: absolute;
    left: 50%;
    top: 50%;
    max-width: 100%;
    width: 300px;
    transform: translate(-50%, -50%);
    max-height: 80vh;
  }
`;
