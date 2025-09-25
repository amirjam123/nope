import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

interface PhoneInputProps {
  phoneNumber: string[];
  onPhoneChange: (index: number, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({
  phoneNumber,
  onPhoneChange,
  onSubmit,
  isLoading
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      onPhoneChange(index, value);
      
      // Auto-focus next input
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !phoneNumber[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter' && phoneNumber.every(digit => digit !== '')) {
      onSubmit();
    }
  };

  const isFormValid = phoneNumber.every(digit => digit !== '');

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Enter Your Phone Number
        </h2>
        <p className="text-white/80 text-sm mb-6">
          We'll send you a verification code
        </p>
        
        <div className="text-left mb-6">
          <label className="block text-white/90 font-medium mb-3">
            Cook Islands Phone Number
          </label>
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 rounded-lg px-4 py-3 border border-white/30">
              <span className="text-white font-medium">+682</span>
            </div>
            <div className="flex space-x-2">
              {phoneNumber.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-xl font-bold bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                  placeholder="0"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!isFormValid || isLoading}
        className="w-full bg-gradient-to-r from-white to-white/90 text-red-600 font-bold py-4 px-8 rounded-xl hover:from-white/90 hover:to-white/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <span>Get Verification Code</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};