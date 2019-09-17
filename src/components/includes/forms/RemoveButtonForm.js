import React from 'react';

const RemoveButtonForm = ({ cols, title, onclick, index }) => {

  return (
    <React.Fragment>
      {(cols === "a1" && 
        <div className="form-group col-sm-1">
          { (index === 0) &&
            <label className="d-none d-sm-block">Rem</label>
          }
          <button className="btn btn-danger" type="button" title={title} onClick={onclick}><span className="icon-tray-item fas fa-trash-alt"></span></button>
        </div>
      )}
    </React.Fragment>
  )
}

export default RemoveButtonForm;