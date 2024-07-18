import styles from './block-content-dashboard.module.scss';
import {FC} from 'react';
import {ActivityButton} from '../activity-button';
import {ActivityPopUp} from '../activity-pop-up';
import {DeleteIcon} from '../icon-components/delete-icon';
import {Note} from '../icon-components/note';
import {modalContent} from '../../constants';
import {SelectedTitleData} from '../dashboard-content';
import {ContentData} from '../../types/content';

export type Props = {
  contentData: ContentData;
  isDisabled: boolean;
  onOpenModal: ({modalContent, contentData}: SelectedTitleData) => void;
  onClosePopUp: () => void;
  onClickPopUpTrigger: (contentId: string) => void;
  isShowActivityPopUp: boolean;
};

export const BlockContentDashboard: FC<Props> = ({
  contentData,
  isDisabled,
  onOpenModal,
  onClickPopUpTrigger,
  onClosePopUp,
  isShowActivityPopUp,
}) => {
  return (
    <div className={styles['block__wrapper']}>
      <h3 className={styles['block__title']}>{contentData.title}</h3>
      <ActivityButton
        isDisabled={isDisabled}
        id={contentData.id}
        onClick={onClickPopUpTrigger}
      />
      {isShowActivityPopUp && (
        <div
          className={styles['pop-up-wrapper']}
          onClick={() => {
            onClickPopUpTrigger(contentData.id);
          }}
          data-target-id={contentData.id}
        >
          <ActivityPopUp id={contentData.id} onClose={onClosePopUp}>
            <>
              <button
                type="button"
                onClick={() =>
                  onOpenModal({
                    modalContent: modalContent.editTitleForm,
                    contentData: contentData,
                  })
                }
              >
                <Note />
                Edit title
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenModal({
                    modalContent: modalContent.deleteBlockForm,
                    contentData: contentData,
                  })
                }
              >
                <DeleteIcon />
                Delete
              </button>
            </>
          </ActivityPopUp>
        </div>
      )}
    </div>
  );
};
