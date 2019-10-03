import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../hooks/useForm';
import { createGroup, editGroup } from '../../actions/GroupActions';
import validate from './GroupFormValidationRules';
import { TextForm, TextAreaForm, ImagesForm } from '../includes/forms';

const GroupForm = ({ group }) => {
  const dispatch = useDispatch();
  const newErrors = useSelector(state => state.toast.errors);
  const userPackage = useSelector(state => state.user.package);

  const initialValues = { ...group, groupAdmin: true, exists: false };

  const {
    setChange,
    handleChange,
    handleSubmit,
    addArrayItem,
    values,
    setValues,
    errors,
    setErrors
  } = useForm(initialValues, updateGroup, validate);

  useEffect(() => {
    if (newErrors) {
      setErrors(newErrors);
    }
  }, [newErrors, setErrors]);

  useEffect(() => {
    if (group) {
      group.topImage =
        group.images && group.images.filter(i => i.state !== 'D').length > 0
          ? group.images.filter(i => i.state !== 'D')[0].imageUrl
          : '/images/default.png';
      setValues(group);
    }
  }, [group, setValues]);

  function updateGroup() {
    if (values._id) {
      dispatch(editGroup(values._id, values));
    } else {
      dispatch(createGroup(values));
    }
  }

  function isReadOnly() {
    return !values._id || values.appAdmin ? false : true;
  }

  function showSaveCancelButtons() {
    if (!userPackage || !values) return null;

    const hasGrouAdmin =
      userPackage.max.groupadmins > userPackage.size.groupadmins;

    return (
      <div>
        {((!values._id && hasGrouAdmin) ||
          values.appAdmin ||
          values.groupAdmin) && (
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        )}
        <Link className="btn btn-link" to="/settings/groups">
          Cancel
        </Link>
      </div>
    );
  }

  return (
    <div className="row">
      <ImagesForm
        values={values}
        setChange={setChange}
        addArrayItem={addArrayItem}
        error={errors.images}
      />
      <div className="col-12 col-lg-6 order-2 order-lg-1" role="main">
        <form className="mb-3" onSubmit={handleSubmit}>
          <TextForm
            colFormat="3-9"
            label="Name"
            value={values.name}
            field="name"
            readOnly={isReadOnly()}
            handleChange={handleChange}
            error={errors.name}
          />
          <TextForm
            colFormat="3-9"
            label="Tagline"
            value={values.tagline}
            field="tagline"
            readOnly={isReadOnly()}
            handleChange={handleChange}
            error={errors.tagline}
          />
          <TextAreaForm
            colFormat="3-9"
            label="Description"
            value={values.description}
            field="description"
            readOnly={isReadOnly()}
            handleChange={handleChange}
            error={errors.description}
          />
          <TextForm
            colFormat="3-9"
            type="email"
            label="Email"
            value={values.email}
            field="email"
            readOnly={isReadOnly()}
            handleChange={handleChange}
            error={errors.email}
          />
          <TextForm
            colFormat="3-9"
            label="Website"
            value={values.website}
            field="website"
            readOnly={isReadOnly()}
            handleChange={handleChange}
            error={errors.website}
          />
          <hr />
          <TextForm
            colFormat="3-9"
            label="Activities"
            value={values.activitys}
            field="activitys"
            readOnly={isReadOnly()}
            handleChange={handleChange}
            error={errors.activitys}
          />
          <hr />
          <div>
            {values.images &&
              values.images.map((item, index) => (
                <div key={`${item._id}-${index}`}>
                  <input
                    name={`images[${index}]._id`}
                    type="hidden"
                    value={values.images[index]._id}
                  />
                  <input
                    name={`images[${index}].image`}
                    type="hidden"
                    value={values.images[index].image}
                  />
                  <input
                    name={`images[${index}].imageUrl`}
                    type="hidden"
                    value={values.images[index].imageUrl}
                  />
                  <input
                    name={`images[${index}].state`}
                    type="hidden"
                    value={values.images[index].state}
                  />
                  <input
                    name={`images[${index}].photoId`}
                    type="hidden"
                    value={values.images[index].photoId}
                  />
                </div>
              ))}
            {values.deletedImages &&
              values.deletedImages.map((item, index) => (
                <div key={`${item._id}-${index}`}>
                  <input
                    name={`deletedImages[${index}]._id`}
                    type="hidden"
                    value={values.deletedImages[index]._id}
                  />
                </div>
              ))}
          </div>
          {showSaveCancelButtons()}
          {(values.appAdmin || values.groupAdmin) && values._id && (
            <div>
              <Link
                className="btn btn-primary"
                to={`/settings/groups/${values._id}/members`}
              >
                Members
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default GroupForm;
