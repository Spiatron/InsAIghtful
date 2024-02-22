import React from "react";

const Progressbar = ({ progress }) => {
  return (
    <>
      <div className="container-fluid">
        {/* Progress bar */}
        <div className="row">
          <div className="col-md-12 mt-4">
            <div className="container">
              <div
                className="progress"
                style={{ width: `100%` }}
                role="progressbar"
                aria-label="Animated striped example"
                aria-valuenow={`${progress}`}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated bg-warning text-black fw-bold"
                  style={{ width: `${progress}%` }}
                >
                  {parseInt(progress)}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Progressbar;
