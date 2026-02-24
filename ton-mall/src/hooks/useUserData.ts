'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { useTonWallet } from '@tonconnect/ui-react';

interface UserData {
  address: string;
  balance: string;
  miningPower: number;
  totalEarned: string;
  lastClaim: number;
  referralCode: string;
  referrals: number;
}

// Simulated user data (in real app, this would come from backend)
const mockUserData: Record<string, UserData> = {
  'default': {
    address: '',
    balance: '0',
    miningPower: 100,
    totalEarned: '0',
    lastClaim: Date.now(),
    referralCode: 'MINING123',
    referrals: 0,
  }
};

export function useUserData() {
  const wallet = useTonWallet();
  const [userData, setUserData] = useState<UserData>(mockUserData['default']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (wallet?.account?.address) {
      // In real app, fetch from backend using wallet address
      setUserData({
        address: wallet.account.address,
        balance: '0',
        miningPower: 100 + Math.floor(Math.random() * 900),
        totalEarned: (Math.random() * 100).toFixed(2),
        lastClaim: Date.now() - Math.random() * 86400000,
        referralCode: 'MINING' + Math.random().toString(36).substring(2, 8).toUpperCase(),
        referrals: Math.floor(Math.random() * 20),
      });
    }
    setLoading(false);
  }, [wallet]);

  const claimMining = async () => {
    // In real app, this would be a transaction
    const earned = (userData.miningPower * 0.01).toFixed(4);
    setUserData(prev => ({
      ...prev,
      balance: (parseFloat(prev.balance) + parseFloat(earned)).toFixed(4),
      lastClaim: Date.now(),
    }));
    return earned;
  };

  return { userData, loading, claimMining, isConnected: !!wallet?.account };
}
