import React, { useState } from 'react';

const ActionResponse = ({ isError, isSuccess, title, desc, OnClose }) => {

  return (
    <>
      {isError && !isSuccess && (
        <div className="alert-containerAction">
          <div className="error-alertAction">
            <div className="flexAction">
              <div className="icon-containerAction">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="iconAction"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                  ></path>
                </svg>
              </div>
              <div className="alert-MainDescAction">
                <p className="alert-titleAction">{title}</p>
                <p className="alert-descriptionAction">{desc}</p>
              </div>
            </div>
            <button onClick={OnClose} className="close-buttonAction">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="iconAction isErrorAction"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {isSuccess && !isError && (
        <div className="alert-containerAction">
          <div className="error-alertAction">
            <div className="flexAction">
              <div className="icon-containerAction">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="iconAction isVerifiedAction"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  ></path>
                </svg>
              </div>
              <div className="alert-MainDescAction">
                <p className="alert-titleAction">{title}</p>
                <p className="alert-descriptionAction">{desc}</p>
              </div>
            </div>
            <button onClick={OnClose} className="close-buttonAction">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="iconAction"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ActionResponse;
