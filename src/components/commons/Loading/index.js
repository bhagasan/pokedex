import React from "react";
import Styled from "styled-components";
import PropTypes from "prop-types";
import ImgLoading from "../../../assets/images/loading.gif";
import ImgLoadingSmall from "../../../assets/images/loading-small.gif";

export default function Loading(props) {
  const { isLoading, type } = props;
  return (
    <Wrapper isLoading={isLoading} type={type} {...props}>
      {type === "full" ? (
        <img src={ImgLoading} alt="loading" />
      ) : (
        <img src={ImgLoadingSmall} alt="loading" />
      )}
    </Wrapper>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(["small", "full"]),
};

Loading.defaultProps = {
  type: "small",
};

const Wrapper = Styled.div`
  
  opacity: 0;
  pointer-events: none;
  z-index: 9999;
  transition-duration: .3s;
  ${({ type }) => {
    if (type === "full") {
      return `
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: #F3FCFF;
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
    } else {
      return `
        img{
          width: 42px;
        }
      `;
    }
  }}


  ${({ isLoading }) =>
    isLoading &&
    `
    opacity: 1;
    pointer-events: auto;
  `}
  
`;
