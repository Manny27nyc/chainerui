import React from 'react';
import { Button } from 'reactstrap';
// import PropTypes from 'prop-types';
import * as uiPropTypes from '../store/uiPropTypes';

const SelectedResultTools = (props) => {
  const { resultsStatus } = props;
  const checkedResults = Object.keys(resultsStatus).filter((key) => resultsStatus[key].checked);

  return (
    <div>
      {checkedResults.length > 0 ? <Button color="danger">Delete results</Button> : null}
    </div>
  );
};

SelectedResultTools.propTypes = {
  resultsStatus: uiPropTypes.resultsStatus,
};

SelectedResultTools.defaultProps = {
  resultsStatus: {},
};

export default SelectedResultTools;
