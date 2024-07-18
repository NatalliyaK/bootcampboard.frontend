import {FC, useState} from 'react';
import styles from '../add-user-form/add-user-form.module.scss';
import {EmptyForm} from '../empty-form';
import {useInputs} from '../../hooks/inputs-hook';
import {errorMessages, inputName, successMessages} from '../../constants';
import {checkTitleContentCard} from '../../functions/validation/validators';
import {InputDataType} from '../../types/input-data';
import {SubmitButton} from '../submit-button';
import {ModalWindow} from '../modal-window';
import {ConfirmForm} from '../confirm-form';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';
import {useAddBlockMutation} from '../../api/endpoints';
import {useAppDispatch} from '../../store/hooks/redux-hooks';
import {AddContentBlock} from '../../types/content';
import {getNewInputData} from '../../functions/utils/utils';

type Props = {
  onClose: (message?: string) => void;
  onSetTransparent: (isTransparent: boolean) => void;
};

const inputs: InputDataType[] = [
  {
    name: inputName.title,
    label: 'Title',
    value: '',
    maxLength: 30,
    placeholder: 'Please enter title',
    errorMessage: '',
    hint: '',
    validationFn: checkTitleContentCard,
    isAfterError: false,
  },
];

const TITLE_INDEX = 0;

export const AddBlockForm: FC<Props> = ({onClose, onSetTransparent}) => {
  const [isShowConfirm, setShowConfirm] = useState(false);
  const [addBlockTrigger, {isLoading}] = useAddBlockMutation();
  const dispatch = useAppDispatch();

  const {
    inputData,
    inputsLayout,
    validate,
    validateApiErrors,
    setInputData,
    focusInput,
  } = useInputs(inputs);

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
    try {
      const requestData: AddContentBlock = {
        title: inputData[TITLE_INDEX].value,
        text: '',
      };
      await addBlockTrigger(requestData).unwrap();
      const title = inputData[TITLE_INDEX].value;

      onClose();
      dispatch(
        toastsActions.showToast({
          type: ToastType.Success,
          message: successMessages.addBlockForm(title),
        }),
      );
    } catch (e: any) {
      const {title, errors} = e;

      if (title === errorMessages.titleTaken) {
        //RERENDER ALL FORM
        setInputData(
          getNewInputData(inputData, TITLE_INDEX, {
            errorMessage: errorMessages.titleTaken,
          }),
        );
        //SET ERROR FOCUS
        focusInput(inputData[TITLE_INDEX].name);
      }
      //IF THERE IS BACKEND VALIDATION ERRORS
      if (errors && title === errorMessages.validationErrors) {
        validateApiErrors(errors);
      }
    }
  };

  return (
    <>
      <EmptyForm
        title="Add block"
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
                text={'Add'}
                onClick={submitBtnHandler}
                type="submit"
                isSmall={true}
                isLoading={isLoading}
              />
            </div>
          </>
        </form>
      </EmptyForm>
      {isShowConfirm && (
        <ModalWindow isVisible={true}>
          <ConfirmForm
            onClose={() => {
              onClose('');
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
