import { useState } from "react";

export const useForgotPassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [email, setEmail] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsConfirmationOpen(false);
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleSubmit = (onSubmit: (email: string) => void) => {
    onSubmit(email);
    setIsConfirmationOpen(true);
  };

  return {
    isModalOpen,
    isConfirmationOpen,
    email,
    openModal,
    closeModal,
    handleEmailChange,
    handleSubmit,
  };
};
