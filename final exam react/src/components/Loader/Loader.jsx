import React from 'react';
import { CSpinner } from '@coreui/react';

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100px' }}>
      <CSpinner color="primary" />
      <span className="ms-2">Loading...</span>
    </div>
  );
};

export default Loader;