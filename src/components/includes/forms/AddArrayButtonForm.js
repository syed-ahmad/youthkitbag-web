import React from "react";

const AddArrayButtonForm = ({ label, onClick }) => {
  return (
    <React.Fragment>
      <button className="btn btn-secondary" type="button" onClick={onClick}>
        {label}
      </button>
    </React.Fragment>
  );
};

export { AddArrayButtonForm };
