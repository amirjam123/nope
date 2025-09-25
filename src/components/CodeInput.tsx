import React, { useRef, useEffect } from 'react';
import { ArrowRight, AlertCircle } from 'lucide-react';

interface CodeInputProps {
  verificationCode: string[];
  onCodeChange: (index: number, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  isError: boolean;
}

export const CodeInput: React.FC<CodeInputProps> = ({
  verificationCode,
  onCodeChange,
  onSubmit,
  isLoading,
  isError
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      onCodeChange(index, value);
      
      // Auto-focus next input
      if (value && index < 4) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter' && verificationCode.every(digit => digit !== '')) {
      onSubmit();
    }
  };

  const isFormValid = verificationCode.every(digit => digit !== '');

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Enter Verification Code
        </h2>
        <p className="text-white/80 text-sm mb-6">
          Check your SMS for the 5-digit code
        </p>
        
        <div className="text-center mb-6">
          <label className="block text-white/90 font-medium mb-3">
            Verification Code
          </label>
          <div className="flex justify-center space-x-2 mb-4">
            {verificationCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-12 h-12 text-center text-xl font-bold bg-white/20 border rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all ${
                  isError ? 'border-red-400 bg-red-500/20' : 'border-white/30'
                }`}
                placeholder="0"
              />
            ))}
          </div>
          
          {/* Status Messages */}
          <div className="min-h-[24px] mb-4">
            {!isError && (
              <p className="text-white/70 text-sm">
                validation code
              </p>
            )}
            {isError && (
              <div className="flex items-center justify-center space-x-2 text-red-300">
                <AlertCircle className="w-4 h-4" />
                <p className="text-sm font-medium">
                  Wrong code, enter correct code
                </p>
              </div>
            )}
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
            <span>Verify Code</span>
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </div>
  );
};