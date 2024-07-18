import React, {FC, useState} from 'react';
import {EmptyForm} from '../empty-form';
import {ConfirmForm} from '../confirm-form';
import {ModalWindow} from '../modal-window';
import {useInputs} from '../../hooks/inputs-hook';
import {InputDataType} from '../../types/input-data';
import {inputName} from '../../constants';
import {checkTitleContentCard} from '../../functions/validation/validators';
import {SubmitButton} from '../submit-button';
import styles from '../add-user-form/add-user-form.module.scss';

type Props = {
  onSetTransparent: (isTransparent: boolean) => void;
  onClose: () => void;
  title: string;
};

export const EditTitleForm: FC<Props> = ({
  onSetTransparent,
  onClose,
  title,
}) => {
  const [isShowConfirm, setShowConfirm] = useState(false);
  const inputs: InputDataType[] = [
    {
      name: inputName.title,
      label: 'Title',
      value: title,
      maxLength: 30,
      placeholder: 'Please enter title',
      errorMessage: '',
      hint: '',
      validationFn: checkTitleContentCard,
      isAfterError: false,
    },
  ];

  const {inputsLayout, validate} = useInputs(inputs);

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
  };

  //TODO (Natallia Kancelarchyk): add validatioon

  return (
    <>
      <EmptyForm
        title="Edit title"
        isCloseButtonNeeded={true}
        onClose={onCloseForm}
      >
        <form className={styles.form}>
          <>
            {inputsLayout}
            <div className={styles['buttons-wrapper']}>
              <SubmitButton
                text="Cancel"
                onClick={onCloseForm}
                isSmall={true}
                isSecondary={true}
              />
              <SubmitButton
                text="Save"
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
