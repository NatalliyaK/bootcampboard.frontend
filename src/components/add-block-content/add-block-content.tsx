import {FC, useState} from 'react';
import {AddButton} from '../add-button';
import {AddBlockForm} from '../add-block-form';
import {ModalWindow} from '../modal-window';
import {userRoles} from '../../constants';
import {useAppSelector} from '../../store/hooks/redux-hooks';
import {stateSelectors} from '../../store/store';
import {AddButtonTypes} from '../add-button/types';

export const AddBlockContent: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransparent, setTransparent] = useState(false);
  const {role} = useAppSelector(stateSelectors.currentUserSliceData);
  const isNotAllowed = role === userRoles.user;

  const onChangeModalTransparent = (isTransparent: boolean) => {
    setTransparent(isTransparent);
  };

  const onCloseFormHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <AddButton
        type={AddButtonTypes.AddBlock}
        text="Add block"
        onClick={() => setIsModalOpen(true)}
        isDisabled={isNotAllowed}
      />
      {isModalOpen && (
        <ModalWindow
          isVisible={true}
          isTransparent={isTransparent}
          isSmallForm={true}
        >
          <AddBlockForm
            onClose={onCloseFormHandler}
            onSetTransparent={onChangeModalTransparent}
          />
        </ModalWindow>
      )}
    </>
  );
};
