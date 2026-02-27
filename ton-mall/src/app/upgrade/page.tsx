'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

import { useUserData } from '@/hooks/useUserData';

export default function UpgradePage() {
  const router = useRouter();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const { userData, isConnected } = useUserData();

  const miningEquipment = [
    { id: 1, name: 'ASLC MIENR XL2025', price: 1, dailyYield: '5.001696 TON', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mining%20equipment%20ASLC%20MIENR%20XL2025&size=512x512' },
    { id: 2, name: 'ASLC MIENR XL2025', price: 2, dailyYield: '5.001696 TON', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mining%20equipment%20ASLC%20MIENR%20XL2025&size=512x512' },
    { id: 3, name: 'ASLC MINER GLOBALMINE 4', price: 5, dailyYield: '10.001664 TON', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mining%20equipment%20ASLC%20MINER%20GLOBALMINE%204&size=512x512' },
    { id: 4, name: 'ASLC MINER GLOBALMINE 4', price: 10, dailyYield: '10.001664 TON', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mining%20equipment%20ASLC%20MINER%20GLOBALMINE%204&size=512x512' },
    { id: 5, name: 'ASLC MINER GLOBALMINEMAX', price: 20, dailyYield: '20.000736 TON', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mining%20equipment%20ASLC%20MINER%20GLOBALMINEMAX&size=512x512' },
    { id: 6, name: 'ASLC MINER GLOBALMINEMAX', price: 50, dailyYield: '300.000672 TON', image: 'https://neeko-copilot.bytedance.net/api/text2image?prompt=mining%20equipment%20ASLC%20MINER%20GLOBALMINEMAX&size=512x512' },
  ];

  const handlePurchase = (equipment: any) => {
    // 实现购买逻辑
    console.log('Purchasing:', equipment);
  };

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Page>
      <div style={{ 
        backgroundColor: '#000',
        minHeight: '100vh',
        padding: '16px',
        color: '#fff'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '24px'
        }}>
          <button 
            onClick={() => router.back()}
            style={{ 
              fontSize: 18, 
              fontWeight: 'bold', 
              color: '#fff',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            ← Back
          </button>
          <Title level="2" style={{ color: '#fff', margin: 0 }}>Upgrade</Title>
          <div style={{ width: 50 }} />
        </div>

        {/* Mining Equipment Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
          marginBottom: '80px'
        }}>
          {miningEquipment.map((equipment) => (
            <div key={equipment.id} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <div style={{ marginBottom: '12px' }}>
                <img 
                  src={equipment.image} 
                  alt={equipment.name} 
                  style={{ 
                    width: '100%', 
                    height: 120, 
                    objectFit: 'contain',
                    borderRadius: 8
                  }} 
                />
              </div>
              <div style={{ 
                fontSize: 12, 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: 4,
                textAlign: 'center'
              }}>
                {equipment.dailyYield}
              </div>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 'bold',
                marginBottom: '12px'
              }}>
                {equipment.price} TON
              </div>
              <div style={{ 
                fontSize: 10, 
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '16px'
              }}>
                0/1
              </div>
              <Button
                size="l"
                stretched
                onClick={() => handlePurchase(equipment)}
                style={{
                  backgroundColor: '#4CD964',
                  color: '#000',
                  fontWeight: 'bold',
                  borderRadius: 8,
                  padding: '8px'
                }}
              >
                Buy
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-around',
          borderTop: '1px solid rgba(255,255,255,0.1)'
        }}>
          {[
            { icon: '🏠', label: 'Home', path: '/mining' },
            { icon: '⚙️', label: 'Upgrade', path: '/upgrade' },
            { icon: '👥', label: 'Friends', path: '/friends' }
          ].map((item, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontSize: 12,
                color: index === 1 ? '#4CD964' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer'
              }}
              onClick={() => handleNavigate(item.path)}
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
