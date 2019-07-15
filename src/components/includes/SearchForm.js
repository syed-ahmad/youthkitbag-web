import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import useForm from '../hooks/useForm';
import { fetchKitbagKits } from '../../actions/KitbagKitActions';
import validate from './SearchFormValidationRules';

const Search = () => {

  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);
  const pagination = useSelector(state => state.pagination);

  const initialValues = {
    by: 'all',
    search: ''
  }

  const {
    handleChange,
    handleSubmit,
    values
  } = useForm(initialValues, searchItems, validate);
  
  function searchItems() {
    console.log(values)
    const { by, search } = values;
    dispatch(fetchKitbagKits(search, by, 1, pagination.itemsPerPage));
  }

  return (
    <div className="d-inline-block">
      <form onSubmit={handleSubmit}>
        <div className="form-group mr-3">
          <div className="input-group">
            <div className="input-group-prepend">
              <select name="by" className="custom-select" onChange={handleChange} value={values.by}>
                {filter.options.map(o => (<option key={o.key} value={o.key}>{o.value}</option>))}
              </select>
            </div>
            <input name="search" className="form-control" type="text" onChange={handleChange} value={values.search} id="search" arialabel="Search by text" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="submit" id="search">Search</button>
              <Link to="/kitbag/kits" className="btn btn-outline-secondary">Clear</Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Search;