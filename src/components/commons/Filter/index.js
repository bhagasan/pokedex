import React, { Fragment, useRef, useEffect, useState } from "react";
import Styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { Color } from "../Library";

import IconFilter from "../../../assets/icons/filter.svg";

export default function Filter(props) {
  const { data, filterHandler, labels } = props;
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef(null);

  function useOutsideHandler(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsActive(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideHandler(wrapperRef);

  function renderList(data) {
    const temp = Object.keys(data).map((d) => {
      const title = <Title>{d}</Title>;
      const items = data[d].map((x) => (
        <Label key={x}>
          <input type="checkbox" name={x} id={x} onChange={filterHandler} />
          <span>{x}</span>
        </Label>
      ));
      return (
        <Fragment key={data[d]}>
          {title}
          <div className="layout">{items}</div>
        </Fragment>
      );
    });
    return temp;
  }

  function renderLabelOutSide(data) {
    if (data) {
      return data.map((d) => (
        <Label key={d} htmlFor={d}>
          <input
            type="checkbox"
            name={d}
            id={d}
            onChange={filterHandler}
            checked
          />
          <span>{d}</span>
        </Label>
      ));
    }
  }

  return (
    <Wrapper isActive={isActive} ref={wrapperRef} labels={labels}>
      <Icon onClick={() => setIsActive(!isActive)}>
        <img src={IconFilter} alt="filter" />
      </Icon>
      {labels && <LabelActived>{renderLabelOutSide(labels)}</LabelActived>}

      <Dropdown>{renderList(data)}</Dropdown>
    </Wrapper>
  );
}

Filter.propTypes = {
  data: PropTypes.object.isRequired,
  filterHandler: PropTypes.func.isRequired,
  labels: PropTypes.array,
};

Filter.defaultProps = {
  labels: [],
};

const LabelActived = Styled.div`
  position: absolute;
  left: -5px;
  top: -5px;
  height: 42px;
  width: 800px;
  max-width: max-content;
  background-color: white;
  z-index: -1;
  border-radius: 50px;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);
  transition-duration: .3s;
  display: flex;
  align-items: center;
  overflow: hidden;
  label{
    :first-child{
      margin-left: 50px;
    }
    :last-child{
      margin-right: 10px;
    }
    :not(:last-child){
      margin-right: 5px;
    }
  }
`;

const Title = Styled.div`
  border-bottom: 1px solid #eaeaea;
  font-size: 16px;
  font-weight: 800;
  color: ${Color.black};
  padding-bottom: 10px;
  margin-bottom: 15px;
  text-transform: capitalize;
`;

const Label = Styled.label`
  cursor: pointer;
  span{
    display: block;
    font-size: 16px;
    color: white;
    background-color: rgba(0, 0, 0, 0.15);
    width: max-content;
    border-radius: 30px;
    padding: 4px 20px;
    line-height: 1;
    text-transform: capitalize;
    transition-duration: .3s;

    :hover{
      background-color: rgba(0, 0, 0, 0.25);
    }
  }
  input{
    display: none;
  }
  input:checked + span{
    background-color: #F66C6C;
  }
`;

const Dropdown = Styled.div`
  position: absolute;
  left: -5px;
  top: 100%;
  background-color: white;
  border-radius: 8px;
  width: 420px;
  padding: 16px 16px;
  z-index: -1;
  transition-duration: .3s;
  opacity: 0;
  pointer-events: none;
  :before{
    content: "";
    position: absolute;
    width: 44px;
    height: 44px;
    left: 0;
    bottom: calc(100% - 3px);
    background-color: white;
    border-top-right-radius: 50%;
    border-top-left-radius: 50%;
  }
  .layout{
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;

    label{
      margin: 5px;
    }
  }
`;

const Wrapper = Styled.div`
  position: relative;
  width: max-content;
  z-index: 10;

  ${({ isActive }) =>
    isActive &&
    css`
      ${Icon} {
        box-shadow: none;
        background-color: #f6f8fc;
      }
      ${LabelActived} {
        width: 40px;
        box-shadow: none;
        overflow: hidden;
        label {
          span {
            /* opacity: 0; */
          }
        }
      }
      ${Dropdown} {
        opacity: 1;
        pointer-events: auto;
      }
    `}

    
`;
const Icon = Styled.button`
  border: none;
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.15);
  border-radius: 100%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  cursor: pointer;
  transition-duration: .3s;
  :active{
    transform: scale(.9);
  }
  :hover{
    transform: scale(1.1);
  }
  img{
    width: 12px;
    opacity: .5;
  }
`;
