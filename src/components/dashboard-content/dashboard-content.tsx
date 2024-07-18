import styles from './dashboard-content.module.scss';
import {FC, useEffect, useState} from 'react';
import {AddBlockContent} from '../add-block-content';
import {useGetContentDataQuery} from '../../api/endpoints';
import {BlockContentDashboard} from '../block-content-dashboard';
import {dashboardSearchParams, modalContent, userRoles} from '../../constants';
import {stateSelectors} from '../../store/store';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {ContentData} from '../../types/content';
import {ModalWindow} from '../modal-window';
import {EditTitleForm} from '../edit-title-form';
import {DeleteBlockForm} from '../delete-block-form';
import {useSearchParams} from 'react-router-dom';
import {TextEditor} from '../text-editor';
import {MouseEvent} from 'react';

export type SelectedTitleData = {
  contentData: ContentData;
  modalContent: string;
};

export const DashboardContent: FC = () => {
  const [modalContentOpen, setModalContentOpen] =
    useState<SelectedTitleData | null>(null);
  const {data: content} = useGetContentDataQuery();
  const {role} = useAppSelector(stateSelectors.currentUserSliceData);
  const isNotAllowed = role === userRoles.user;
  const [isTransparent, setTransparent] = useState(false);
  const [showActivityPopUpId, setShowActivityPopUpId] = useState('');
  const [textEditorContentId, setTextEditorContentId] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const onCloseFormHandler = () => {
    setModalContentOpen(null);
  };

  const onContentBlockClickHandler = (id: string) => {
    searchParams.set(dashboardSearchParams.textEditor, `${id}`);
    setSearchParams(searchParams);
  };

  const onChangeModalTransparent = (isTransparent: boolean) => {
    setTransparent(isTransparent);
  };

  const onClickPopUpTrigger = (
    contentId: string,
    e?: MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    if (e) {
      e.stopPropagation();
    }
    if (showActivityPopUpId === contentId) {
      setShowActivityPopUpId('');
    } else {
      setShowActivityPopUpId(contentId);
    }
  };

  useEffect(() => {
    const currentTextEditorIdParam = searchParams.get(
      dashboardSearchParams.textEditor,
    );
    if (currentTextEditorIdParam) {
      setTextEditorContentId(currentTextEditorIdParam);
    } else {
      setTextEditorContentId('');
    }
  }, [searchParams]);

  return textEditorContentId ? (
    <TextEditor id={textEditorContentId} />
  ) : (
    <>
      <div className={styles.wrapper}>
        <div className={styles['cards-container']}>
          <AddBlockContent />
          {content &&
            content.map((contentData: ContentData) => (
              <BlockContentDashboard
                contentData={contentData}
                key={contentData.id}
                isDisabled={isNotAllowed}
                onClickPopUpTrigger={onClickPopUpTrigger}
                onClosePopUp={() => setShowActivityPopUpId('')}
                isShowActivityPopUp={showActivityPopUpId === contentData.id}
                onOpenModal={({modalContent, contentData}: SelectedTitleData) =>
                  setModalContentOpen({modalContent, contentData: contentData})
                }
                onContentBlockClickHandler={onContentBlockClickHandler}
              />
            ))}
        </div>
      </div>
      {modalContentOpen && (
        <ModalWindow
          isVisible={true}
          isTransparent={isTransparent}
          isSmallForm={
            modalContentOpen.modalContent === modalContent.editTitleForm
          }
        >
          {modalContentOpen.modalContent === modalContent.editTitleForm && (
            <EditTitleForm
              onSetTransparent={onChangeModalTransparent}
              onClose={onCloseFormHandler}
              contentData={modalContentOpen.contentData}
            />
          )}
          {modalContentOpen.modalContent === modalContent.deleteBlockForm && (
            <DeleteBlockForm
              onClose={onCloseFormHandler}
              contentBlock={modalContentOpen.contentData}
            />
          )}
        </ModalWindow>
      )}
    </>
  );
};
