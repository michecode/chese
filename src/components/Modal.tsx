import React, { useRef, useEffect, useCallback } from 'react';
import CloseIcon from '../icons/CloseIcon';

interface ModalProps {
  showModal: boolean;
  setShowModal: Function;
  children?: JSX.Element | JSX.Element[];
}

const Modal: React.FC<ModalProps> = ({ showModal, setShowModal, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      console.log('ref = e.target');
      setShowModal(false);
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    },
    [setShowModal, showModal],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPress);
    return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div
          className="w-screen h-screen bg-black/70 fixed left-0 top-0 flex justify-center items-center"
          onClick={closeModal}
          ref={modalRef}
        >
          <div className="h-[85%] w-[65%] shadow-2xl rounded-2xl bg-white relative border-10 overflow-y-auto z-50">
            <div
              className="cursor-pointer absolute top-[20px] right-[20px] w-[32px] h-[32px] p-0"
              onClick={() => setShowModal((prev: boolean) => !prev)}
            >
              <CloseIcon aria-label="Close Modal" />
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
