import React from "react";
import Styled, { css } from "styled-components";
import { Color } from "../Library";

export default function Bar(props) {
  const { value } = props;
  return (
    <Wrapper>
      <span>{value}</span>
      <Statistic value={value} />
    </Wrapper>
  );
}

const Wrapper = Styled.div`
  position: relative;
  display: flex;
  span{
    display: inline-block;
    width: 30px;
    margin-right: 10px;
  }
`;

const Statistic = Styled.div`
  position: relative;
  width: 100%;
  height: 5px;
  overflow: hidden;
  border-radius: 5px;
  background-color: ${Color.cream};

  :after{
    content: "";
    width: ${({ value }) => value}%;
    height: 110%;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
  }

  ${({ value }) => {
    if (value < 60) {
      return css`
        :after {
          background-color: ${Color.red};
        }
      `;
    } else if (value < 85) {
      return css`
        :after {
          background-color: ${Color.green};
        }
      `;
    } else {
      return css`
        :after {
          background-color: ${Color.blue};
        }
      `;
    }
  }}
`;
