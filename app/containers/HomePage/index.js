import React from 'react';
import Form from 'containers/HomePage/form';
import MultiLineInput from 'containers/HomePage/multi-line-input';
import { StyledContainer } from './styles';

const HomePage = (/* props */) => (
  <StyledContainer>
    <MultiLineInput />

    <Form />
  </StyledContainer>
);

export default HomePage;
