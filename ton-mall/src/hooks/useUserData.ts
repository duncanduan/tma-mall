'use client';

import { useEffect, useState, useCallback } from 'react';
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
  activeUpgrades: Upgrade[];
}

interface Upgrade {
  id: string;
  name: string;
  powerBoost: number;
  duration: number; // in milliseconds
  startTime: number;
  endTime: number;
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
    activeUpgrades: [],
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
              activeUpgrades: data.user.activeUpgrades || [],
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
            activeUpgrades: [],
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

  const getEffectiveMiningPower = useCallback(() => {
    const now = Date.now();
    const activeUpgrades = userData.activeUpgrades.filter(upgrade => upgrade.endTime > now);
    const boost = activeUpgrades.reduce((total, upgrade) => total + upgrade.powerBoost, 0);
    return userData.miningPower + boost;
  }, [userData]);

  const claimMining = async (amount?: string) => {
    // 如果没有提供金额，则使用基于挖矿功率的计算值
    const earned = amount || (getEffectiveMiningPower() * 0.01).toFixed(4);
    const newBalance = (parseFloat(userData.balance) + parseFloat(earned)).toFixed(4);
    
    setUserData(prev => ({
      ...prev,
      balance: newBalance,
      lastClaim: Date.now(),
    }));

    // Save to database
    if (userFriendlyAddress) {
      try {
        await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: userFriendlyAddress,
            walletBalance: parseFloat(newBalance),
          }),
        });
      } catch (error) {
        console.error('Failed to save balance:', error);
      }
    }

    return earned;
  };

  const addUpgrade = useCallback((upgrade: Omit<Upgrade, 'id' | 'startTime' | 'endTime'>) => {
    const now = Date.now();
    const newUpgrade: Upgrade = {
      ...upgrade,
      id: Date.now().toString(),
      startTime: now,
      endTime: now + upgrade.duration,
    };

    setUserData(prev => ({
      ...prev,
      activeUpgrades: [...prev.activeUpgrades, newUpgrade],
    }));

    // Save to database
    if (userFriendlyAddress) {
      try {
        fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: userFriendlyAddress,
            activeUpgrades: [...userData.activeUpgrades, newUpgrade],
          }),
        });
      } catch (error) {
        console.error('Failed to save upgrade:', error);
      }
    }
  }, [userFriendlyAddress, userData.activeUpgrades]);

  return { 
    userData, 
    loading, 
    claimMining, 
    isConnected,
    getEffectiveMiningPower,
    addUpgrade
  };
}
