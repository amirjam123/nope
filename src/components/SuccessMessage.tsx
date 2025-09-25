import React, { useState } from 'react';
import { CheckCircle, Copy, Check, ExternalLink } from 'lucide-react';

export const SuccessMessage: React.FC = () => {
  const [isCopied, setIsCopied] = useState(false);
  const referralLink = 'vodafonefreecredit.vercel.app';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl p-8 text-center">
      <div className="mb-8">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-6">
          Congratulations! 🎉
        </h2>
      </div>

      <div className="bg-white/10 rounded-xl p-6 border border-white/20 mb-8">
        <p className="text-white/90 text-lg leading-relaxed mb-6">
          Dear user, due to heavy traffic on the website, your credit will be sent within the next few hours. 
          Your invitation link is <span className="font-bold text-yellow-300">vodafonefreecredit.vercel.app</span>. 
          Each referral grants you $20 in free credit. Referrals are counted after 00:00.
        </p>
        
        <div className="bg-white/10 rounded-lg p-4 border border-white/20">
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 text-left">
              <p className="text-white/70 text-sm mb-1">Your Referral Link:</p>
              <p className="text-white font-mono text-sm bg-white/10 rounded px-3 py-2">
                {referralLink}
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium px-6 py-3 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="text-center">
            <h3 className="font-semibold text-white mb-2">💰 Earn $20 Per Referral</h3>
            <p className="text-white/70 text-sm">Share your link and earn free credit for each successful referral</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="text-center">
            <h3 className="font-semibold text-white mb-2">⏰ Referrals Count After 00:00</h3>
            <p className="text-white/70 text-sm">New referrals are processed daily after midnight</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <div className="text-center">
            <h3 className="font-semibold text-white mb-2">📱 Your Credit is Coming</h3>
            <p className="text-white/70 text-sm">Due to high demand, expect your credit within a few hours</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4 border border-white/20">
        <p className="text-white font-medium mb-2">
          Thank you for choosing Vodafone Cook Islands! 🏝️
        </p>
        <p className="text-white/70 text-sm">
          Start sharing your referral link to earn even more free credit!
        </p>
      </div>
    </div>
  );
};