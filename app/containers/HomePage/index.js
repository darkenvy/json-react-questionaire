import React from 'react';
import PropTypes from 'prop-types';
import Form from 'containers/HomePage/form';
import MultiLineInput from 'containers/HomePage/multi-line-input';

const HomePage = props => {
  return (
    <div>
      <MultiLineInput />

      <Form />
    </div>
  );
}

export default HomePage;
