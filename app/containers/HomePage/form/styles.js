import styled from 'styled-components';

export const StyledQuestion = styled.div`
  margin: 22px 0;
  border: 1px solid rgba(0, 0, 0, 0);
  padding: 6px;

  &:hover,
  &:active {
    border: 1px dotted black;
  }

  label {
    font-size: 14px;
    font-weight: bold;
    font-family: sans-serif;
    margin-bottom: 2px;
    display: block;
  }

  input {
    display: block;
    width: 100%;
    border: 1px solid #ebebeb;
    padding: 11px 20px;
    box-sizing: border-box;
    font-family: sans-serif;
    font-weight: 500;
    font-size: 13px;
  }
`;
