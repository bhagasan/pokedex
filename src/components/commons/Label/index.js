import React from "react";
import Styled, { css } from "styled-components";
import PropTypes from "prop-types";

export default function Label(props) {
  const { children, size } = props;
  return (
    <Wrapper size={size} {...props}>
      {children}
    </Wrapper>
  );
}
Label.propTypes = {
  children: PropTypes.string,
  size: PropTypes.oneOf(["default", "large"]),
};

Label.defaultProps = {
  size: "default",
  children: "undefined",
};

const Wrapper = Styled.div`
  font-size: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.15);
  width: max-content;
  border-radius: 10px;
  padding: 4px 10px;
  line-height: 1;
  text-transform: capitalize;

  ${({ size }) =>
    size === "large" &&
    css`
      font-size: 24px;
      border-radius: 30px;
      padding: 8px 20px;
    `}
`;
