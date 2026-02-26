'use client';

import { useEffect, useState } from 'react';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import { User } from '@/types/user';

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
  const userFriendlyAddress = useTonAddress();
  const [userData, setUserData] = useState<UserData>(mockUserData['default']);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleWalletConnection = async () => {
      if (userFriendlyAddress) {
        setIsConnected(true);
        setLoading(true);
        
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ walletAddress: userFriendlyAddress }),
          });

          const data = await response.json();
          
          if (data.user) {
            setUserData({
              address: data.user.walletAddress,
              balance: data.user.walletBalance.toString(),
              miningPower: 100 + Math.floor(Math.random() * 900),
              totalEarned: (Math.random() * 100).toFixed(2),
              lastClaim: Date.now() - Math.random() * 86400000,
              referralCode: 'MINING' + Math.random().toString(36).substring(2, 8).toUpperCase(),
              referrals: Math.floor(Math.random() * 20),
            });
          }
        } catch (error) {
          console.error('Failed to create/fetch user:', error);
          setUserData({
            address: userFriendlyAddress,
            balance: '0',
            miningPower: 100,
            totalEarned: '0',
            lastClaim: Date.now(),
            referralCode: 'MINING123',
            referrals: 0,
          });
        } finally {
          setLoading(false);
        }
      } else {
        setIsConnected(false);
        setUserData(mockUserData['default']);
        setLoading(false);
      }
    };

    handleWalletConnection();
  }, [userFriendlyAddress]);

  const claimMining = async () => {
    const earned = (userData.miningPower * 0.01).toFixed(4);
    setUserData(prev => ({
      ...prev,
      balance: (parseFloat(prev.balance) + parseFloat(earned)).toFixed(4),
      lastClaim: Date.now(),
    }));
    return earned;
  };

  return { userData, loading, claimMining, isConnected };
}
