export interface ForgotPasswordProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onEmailChange: (email: string) => void;
  onSubmit: (email: string) => void;
}
