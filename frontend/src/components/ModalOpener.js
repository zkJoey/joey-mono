import React, { useState } from "react";
import Modal from "./ui/Modal";

const ModalOpener = ({ button, modal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {React.cloneElement(button, { onClick: handleOpenModal })}
      {isModalOpen &&<Modal onClose={handleCloseModal}>{modal}</Modal>}
    </>
  );
};

export default ModalOpener;
