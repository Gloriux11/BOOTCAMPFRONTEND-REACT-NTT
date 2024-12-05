export interface ForgotPasswordProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (email: string) => void;
  }