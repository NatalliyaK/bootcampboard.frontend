import {FC} from 'react';
import {EmptyForm} from '../empty-form';
import styles from '../delete-form/delete-form.module.scss';
import {SubmitButton} from '../submit-button';
import {toastsActions, ToastType} from '../../store/slices/toasts-slice';
import {successMessages} from '../../constants';
import {useDeleteBlockMutation} from '../../api/endpoints';
import {ContentData} from '../../types/content';
import {useAppDispatch} from '../../store/hooks/redux-hooks';

type Props = {
  onClose: () => void;
  contentBlock: ContentData;
};

export const DeleteBlockForm: FC<Props> = ({onClose, contentBlock}) => {
  const dispatch = useAppDispatch();
  const [deleteBlock, {isLoading}] = useDeleteBlockMutation();
  const {id, title} = contentBlock;
  const deleteBlockHandler = async () => {
    try {
      await deleteBlock(id).unwrap();
      onClose();
      dispatch(
        toastsActions.showToast({
          type: ToastType.Success,
          message: successMessages.deleteTitleBlock(title),
        }),
      );
    } catch (e) {
      return;
    }
  };

  return (
    <EmptyForm>
      <p className={styles.question}>
        Are you sure you want to delete the Content block {title}?
      </p>
      <p className={styles.warning}>
        This action cannot be undone and all data associated with this block will be deleted
      </p>
      <div className={styles.buttons}>
        <SubmitButton
          text="Cancel"
          isSmall={true}
          isSecondary={true}
          onClick={() => {
            onClose();
          }}
        />
        <SubmitButton
          text="Delete"
          isSmall={true}
          isLoading={isLoading}
          onClick={() => {
            deleteBlockHandler();
          }}
        />
      </div>
    </EmptyForm>
  );
};
