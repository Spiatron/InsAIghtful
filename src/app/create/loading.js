import React from "react";

const loading = () => {
  return <div className="d-flex align-items-center justify-content-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
};

export default loading;
