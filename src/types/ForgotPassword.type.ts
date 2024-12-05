export interface ForgotPasswordProps {
  isOpen: boolean;
  email: string;
  isConfirmationOpen: boolean;
  onClose: () => void;
  onEmailChange: (email: string) => void;
  onSubmit: (email: string) => void;
  }