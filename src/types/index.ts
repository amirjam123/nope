export interface AppData {
  phoneNumber: string[];
  verificationCode: string[];
  currentState: 'phone-entry' | 'code-verification' | 'validating' | 'success' | 'error';
  isLoading: boolean;
}

export interface PhoneInputProps {
  phoneNumber: string[];
  onPhoneChange: (index: number, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export interface CodeInputProps {
  verificationCode: string[];
  onCodeChange: (index: number, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isError: boolean;
  isPending: boolean;
}
