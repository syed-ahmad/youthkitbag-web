import React from 'react';

const RemoveArrayButtonForm = ({ colFormat, title, onClick, index }) => {
  return (
    <React.Fragment>
      {colFormat === 'a-1' && (
        <div className="form-group col-sm-1">
          {index === 0 && <label className="d-none d-sm-block">Rem</label>}
          <button
            className="btn btn-danger"
            type="button"
            title={title}
            onClick={onClick}
          >
            <span className="icon-tray-item fas fa-trash-alt"></span>
          </button>
        </div>
      )}
    </React.Fragment>
  );
};

export { RemoveArrayButtonForm };
