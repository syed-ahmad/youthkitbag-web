import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useForm from '../../hooks/useForm';
import { fetchKitbagWanteds } from '../../../actions/KitbagWantedActions';
import validate from '../../includes/FormEmptyValidationRules';
import queryString from 'query-string';

const WantedSearchForm = props => {

  const qsvalues = queryString.parse(props.search);
  const search = qsvalues.search ? qsvalues.search : '';
  const by = qsvalues.by ? qsvalues.by : '';

  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const pagination = useSelector(state => state.pagination);
  const [isClearing, setIsClearing] = useState(false);

  const initialValues = {
    by: by,
    search: search
  }

  const {
    setValues,
    handleChange,
    handleSubmit,
    values
  } = useForm(initialValues, searchItems, validate);
  
  function searchItems() {
    const { by, search } = values;
    dispatch(fetchKitbagWanteds(search, by, 1, pagination.itemsPerPage));
  }

  function clearSearch() {
    setValues({ by: '', search: '' });
    setIsClearing(true);
  }

  useEffect(() => {
    if (isClearing) {
      handleSubmit();
      setIsClearing(false);
    }
  }, [isClearing, handleSubmit]);

  return (
    <div className="d-inline-block">
      <form onSubmit={handleSubmit}>
        <div className="form-group mr-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <select name="by" className="custom-select" onChange={handleChange} onBlur={handleChange} value={values.by}>
                {filter.options.map(o => (<option key={o.key} value={o.key}>{o.value}</option>))}
              </select>
            </div>
            <input name="search" className="form-control" type="text" onChange={handleChange} value={values.search} id="search" arialabel="Search by text" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="submit">Search</button>
              <button className="btn btn-outline-secondary" type="button" onClick={clearSearch}>Clear</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default WantedSearchForm;