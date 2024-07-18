import styles from '../add-user-form/add-user-form.module.scss';
import {FC, useState} from 'react';
import {EmptyForm} from '../empty-form';
import {ModalWindow} from '../modal-window';
import {SubmitButton} from '../submit-button';
import {ConfirmForm} from '../confirm-form';
import {inputName} from '../../constants';
import {
  checkEmailField,
  checkFirstLastNameField,
} from '../../functions/validation/validators';
import {InputData} from '../../functions/utils/utils';
import {useInputs} from '../../hooks/inputs-hook';

type EditProfileFormProps = {
  onClose: (userName?: string) => void;
  onSetTransparent: (isTransparent: boolean) => void;
};

const inputs: InputData[] = [
  {
    name: inputName.lastName,
    label: 'Last Name',
    value: '',
    maxLength: 30,
    placeholder: 'Please enter last name',
    errorMessage: '',
    hint: '',
    validationFn: checkFirstLastNameField,
    isAfterError: false,
  },
  {
    name: inputName.firstName,
    label: 'First Name',
    value: '',
    maxLength: 30,
    placeholder: 'Please enter first name',
    errorMessage: '',
    hint: '',
    validationFn: checkFirstLastNameField,
    isAfterError: false,
  },
  {
    name: inputName.email,
    label: 'Email',
    value: '',
    maxLength: 64,
    placeholder: 'Please enter email',
    errorMessage: '',
    hint: '',
    validationFn: checkEmailField,
    isAfterError: false,
  },
];

export const EditProfileForm: FC<EditProfileFormProps> = ({
  onClose,
  onSetTransparent,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {inputData, setInputData, validate, inputsLayout, refs} =
    useInputs(inputs);
  const [isShowConfirm, setShowConfirm] = useState(false);

  const onCloseForm = () => {
    setShowConfirm(true);
    onSetTransparent(true);
  };

  const submitBtnHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    // VALIDATION
    if (validate()) {
      return;
    }

    // VALIDATION PASSED
    // TO DO (Natallia Shliapik): request handle in async/await style
  };

  return (
    <>
      <EmptyForm
        title="Edit Profile"
        isCloseButtonNeeded={true}
        onClose={onCloseForm}
      >
        <form className={styles.form}>
          <>
            {inputsLayout}
            <div className={styles['buttons-wrapper']}>
              <SubmitButton
                text={'Cancel'}
                onClick={onCloseForm}
                isSmall={true}
                isSecondary={true}
              />
              <SubmitButton
                text={'Save'}
                onClick={submitBtnHandler}
                type="submit"
                isSmall={true}
              />
            </div>
          </>
        </form>
      </EmptyForm>
      {isShowConfirm && (
        <ModalWindow isVisible={true}>
          <ConfirmForm
            onClose={() => {
              onClose();
              onSetTransparent(false);
            }}
            onCancel={() => {
              setShowConfirm(false);
              onSetTransparent(false);
            }}
          />
        </ModalWindow>
      )}
    </>
  );
};
