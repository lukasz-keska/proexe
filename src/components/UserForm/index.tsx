import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateUserForm } from './Validators';

import './UserForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, editUserData } from '../../store/actions/app.actions';

import { RootState } from '../../store/reducers/root.state';
import { UserDataInterface } from '../../store/models/app.model';

interface FormFieldInterface {
  title: string;
  fieldName: string;
  fieldValue: string;
  isError: boolean;
}

const FormField: FunctionComponent<FormFieldInterface> = ({
  title,
  fieldName,
  fieldValue,
  isError
}): JSX.Element => {
  const classNames = ['input-field'];
  if (isError) {
    classNames.push('error');
  }

  return (
    <label htmlFor={fieldName}>
      <span>
        {title} <span className="required">*</span>
      </span>
      <input
        type="text"
        className={classNames.join(' ')}
        name={fieldName}
        defaultValue={fieldValue}
      />
      {isError && <p className="error-msg">{title} is required</p>}
    </label>
  );
};

const UserFormComponent: FunctionComponent = () => {
  const defaultErrorFlags = { userName: false, userEmail: false };
  const defaultFormValues = { userId: 0, userName: '', userEmail: '' };
  const [fieldErrors, setFieldErrors] = useState(defaultErrorFlags);
  const [fieldValues, setFieldValues] = useState(defaultFormValues);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formParams = useParams();
  const userData = useSelector((st: RootState) =>
    st.appList.data.filter((el: UserDataInterface) => el.id === Number(formParams?.userid))
  );
  useEffect(() => {
    if (userData.length) {
      setFieldValues({
        userId: userData[0].id,
        userName: userData[0].name,
        userEmail: userData[0].email
      });
    }
  }, []);

  const handleCancel = () => navigate('/');
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const form = document.querySelector('form');
    const data = new FormData(form as HTMLFormElement);
    const jsonData = { userName: `${data.get('userName')}`, userEmail: `${data.get('userEmail')}` };

    const errors = validateUserForm(jsonData);
    const errs = { ...defaultErrorFlags };
    errors?.forEach((err) => (errs[err.instancePath.substring(1) as keyof typeof errs] = true));
    setFieldErrors(errs);

    if (!errors) {
      if (fieldValues.userId > 0) {
        dispatch(
          editUserData({
            id: fieldValues.userId,
            email: jsonData.userEmail,
            name: jsonData.userName,
            username: jsonData.userName.replace(/\s/g, '_')
          })
        );
      } else {
        dispatch(
          addUserData({
            email: jsonData.userEmail,
            name: jsonData.userName,
            username: jsonData.userName.replace(/\s/g, '_')
          })
        );
      }
      navigate('/');
    }
  };

  return (
    <form>
      <div className="user-form">
        <div className="user-form-heading">User Form</div>
        <FormField
          title="User Name"
          fieldName="userName"
          fieldValue={fieldValues.userName}
          isError={fieldErrors.userName}
        />
        <FormField
          title="User Email"
          fieldName="userEmail"
          fieldValue={fieldValues.userEmail}
          isError={fieldErrors.userEmail}
        />
        <label>
          <span> </span>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </label>
      </div>
    </form>
  );
};

export default UserFormComponent;
