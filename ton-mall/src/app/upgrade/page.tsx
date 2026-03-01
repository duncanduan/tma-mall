'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import { Button } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

import { useUserData } from '@/hooks/useUserData';

export default function UpgradePage() {
  const router = useRouter();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const { userData, isConnected } = useUserData();

  const miningEquipment = [
    {
      id: 1,
      name: 'F1 SPECIAL',
      price: 1,
      dailyYield: '5.001696 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTAgOTAgMTAgOTAgOTAgMTAgOTAgMTAgMTB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI1IiBmaWxsPSIjMDBhN2ZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNTAgMzAgNTAgNzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=='
    },
    {
      id: 2,
      name: 'F1 SPECIAL',
      price: 2,
      dailyYield: '5.001696 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMTAgOTAgMTAgOTAgOTAgMTAgOTAgMTAgMTB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjI1IiBmaWxsPSIjMDBhN2ZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNTAgMzAgNTAgNzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg=='
    },
    {
      id: 3,
      name: 'ASLC MIENR XL2025',
      price: 5,
      dailyYield: '10.001664 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjAgOTAgMjAgOTAgODAgMTAgODAgMTAgMjB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzMCIgcj0iNSIgZmlsbD0iIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI3MCIgcj0iNSIgZmlsbD0iIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAgNDAgODAgNDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTIwIDYwIDgwIDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg=='
    },
    {
      id: 4,
      name: 'ASLC MIENR XL2025',
      price: 10,
      dailyYield: '10.001664 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjAgOTAgMjAgOTAgODAgMTAgODAgMTAgMjB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzMCIgcj0iNSIgZmlsbD0iIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI3MCIgcj0iNSIgZmlsbD0iIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAgNDAgODAgNDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTIwIDYwIDgwIDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg=='
    },
    {
      id: 5,
      name: 'ASLC MINER GLOBALMINE 4',
      price: 20,
      dailyYield: '20.000736 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMzAgOTAgMzAgOTAgNzAgMTAgNzAgMTAgMzB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAgNTAgODAgNTAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTQwIDMwIDQwIDcwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik02MCAzMCA2MCA3MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='
    },
    {
      id: 6,
      name: 'ASLC MINER GLOBALMINE 4',
      price: 50,
      dailyYield: '20.000736 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMzAgOTAgMzAgOTAgNzAgMTAgNzAgMTAgMzB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI0MCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAgNTAgODAgNTAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTQwIDMwIDQwIDcwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik02MCAzMCA2MCA3MCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4='
    },
    {
      id: 7,
      name: 'ASLC MINER GLOBALMINEMAX',
      price: 100,
      dailyYield: '300.000672 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjAgOTAgMjAgOTAgODAgMTAgODAgMTAgMjB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzMCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAgNDAgODAgNDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTIwIDYwIDgwIDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0zMCAyNSA3MCAyNSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMzAgNzUgNzAgNzUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iIi8+PC9zdmc+'
    },
    {
      id: 8,
      name: 'ASLC MINER GLOBALMINEMAX',
      price: 200,
      dailyYield: '300.000672 TON',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAgMjAgOTAgMjAgOTAgODAgMTAgODAgMTAgMjB6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxjaXJjbGUgY3g9IjIwIiBjeT0iNTAiIHI9IjUiIGZpbGw9IiNmZmYiLz48Y2lyY2xlIGN4PSI4MCIgY3k9IjUwIiByPSI1IiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSIzMCIgcj0iMTUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNMjAgNDAgODAgNDAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTIwIDYwIDgwIDYwIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0zMCAyNSA3MCAyNSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMzAgNzUgNzAgNzUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNSIgZmlsbD0iIi8+PC9zdmc+'
    }
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
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ 
                fontSize: 10, 
                color: 'rgba(255,255,255,0.6)',
                alignSelf: 'flex-start',
                marginBottom: '8px'
              }}>
                0/1
              </div>
              <div style={{ marginBottom: '12px' }}>
                <img 
                  src={equipment.image} 
                  alt={equipment.name} 
                  style={{ 
                    width: '100%', 
                    height: 100, 
                    objectFit: 'contain',
                    borderRadius: 8
                  }} 
                />
              </div>
              <div style={{ 
                fontSize: 14, 
                fontWeight: 'bold',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                {equipment.name}
              </div>
              <div style={{ 
                fontSize: 12, 
                color: 'rgba(255,255,255,0.8)',
                marginBottom: '8px'
              }}>
                Daily yield
              </div>
              <div style={{ 
                fontSize: 10, 
                color: 'rgba(255,255,255,0.6)',
                marginBottom: '12px'
              }}>
                {equipment.dailyYield}
              </div>
              <div style={{ 
                width: '100%',
                backgroundColor: 'rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '8px',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                {equipment.price} TON
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
