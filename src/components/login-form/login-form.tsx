import {useState, FC} from 'react';
import {useNavigate} from 'react-router-dom';
import {EmptyForm} from '../empty-form';
import {SubmitButton} from '../submit-button';
import {ROUTE_PATH} from '../../routes/routes-paths';
import jwt_decode from 'jwt-decode';
import {LocalStorageService} from '../../services/local-storage-service';
import {useLoginMutation} from '../../api//endpoints';
import {errorMessages, inputName, userRoles} from '../../constants';
import {checkEmptyFields} from '../../functions/validation/validators';
import {DecodedUserToken} from '../../types/users';
import loginForm from './login-form.module.scss';
import {InputDataType} from '../../types/input-data';
import {useInputs} from '../../hooks/inputs-hook';
import {useAppDispatch} from '../../store/hooks/redux-hooks';
import {ToastType, toastsActions} from '../../store/slices/toasts-slice';

const inputs: InputDataType[] = [
  {
    name: inputName.userName,
    label: 'Username',
    value: '',
    maxLength: 20,
    placeholder: 'Please enter username',
    errorMessage: '',
    hint: '',
    validationFn: checkEmptyFields,
    isAfterError: false,
  },
  {
    name: inputName.password,
    label: 'Password',
    value: '',
    maxLength: 30,
    placeholder: 'Please enter password',
    errorMessage: '',
    hint: '',
    validationFn: checkEmptyFields,
    isAfterError: false,
    type: 'password',
  },
];
const USER_NAME_INDEX = 0;
const PASSWORD_INDEX = 1;

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [goToLogin, {isError, isLoading}] = useLoginMutation();

  const [isShowServerError, setIsShowServerError] = useState('');

  const {inputData, validate, inputsLayout} = useInputs(inputs, () =>
    setIsShowServerError(''),
  );

  const logInButtonHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    // validate all inputs
    if (validate()) {
      return;
    }

    //if no errors process back-end requests
    try {
      await goToLogin({
        username: inputData[USER_NAME_INDEX].value,
        password: inputData[PASSWORD_INDEX].value,
      }).unwrap();
      const decoded: DecodedUserToken = jwt_decode(
        LocalStorageService.getAccessToken(),
      );
      if (decoded.role === userRoles.superAdmin) {
        navigate(ROUTE_PATH.users);
      } else {
        navigate(ROUTE_PATH.profile);
      }
    } catch (e: any) {
      const {status} = e || {};
      const {title} = e.data || {};
      if (status === 400 && title === errorMessages.IncorrectCredentials) {
        setIsShowServerError(title);
      } else {
        dispatch(
          toastsActions.showToast({
            type: ToastType.Error,
            message: 'Something went wrong',
          }),
        );
      }
    }
  };

  return (
    <div className={loginForm['login-form-wrapper']}>
      <form>
        <EmptyForm title="Log in">
          <div className={loginForm['input-fields']}>
            {inputsLayout}
            {isShowServerError && isError && (
              <span>Incorrect username or password. Please try again</span>
            )}
          </div>

          <SubmitButton
            text={'Log in'}
            onClick={logInButtonHandler}
            type="submit"
            isLoading={isLoading}
          />
        </EmptyForm>
      </form>
    </div>
  );
};
