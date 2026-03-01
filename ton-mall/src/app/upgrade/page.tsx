'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import { Button } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';
import { useTonPay } from '@ton-pay/ui-react';
import { createTonPayTransfer } from '@ton-pay/api';

import { useUserData } from '@/hooks/useUserData';

export default function UpgradePage() {
  const router = useRouter();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const { userData, isConnected } = useUserData();
  const [showPurchaseModal, setShowPurchaseModal] = useState<boolean>(false);
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null);
  const { pay } = useTonPay();

  const miningEquipment = [
    {
      id: 1,
      name: 'F1 SPECIAL',
      price: 1,
      dailyYield: '2.001696 TON',
      image: '/miner_f1_special_v2_4x3.png'
    },
    {
      id: 2,
      name: 'F1 SPECIAL',
      price: 2,
      dailyYield: '2.001696 TON',
      image: '/miner_f1_special_v2_4x3.png'
    },
    {
      id: 3,
      name: 'ASLC MIENR XL2025',
      price: 3,
      dailyYield: '6.001664 TON',
      image: '/miner_aslc_xl2025_v2_4x3.png'
    },
    {
      id: 4,
      name: 'ASLC MIENR XL2025',
      price: 8,
      dailyYield: '10.001664 TON',
      image: '/miner_aslc_xl2025_v2_4x3.png'
    },
    {
      id: 5,
      name: 'ASLC MINER GLOBALMINE 4',
      price: 12,
      dailyYield: '15.000736 TON',
      image: '/miner_globalmine_4_4x3.png'
    },
    {
      id: 6,
      name: 'ASLC MINER GLOBALMINE 4',
      price: 20,
      dailyYield: '20.000736 TON',
      image: '/miner_globalmine_4_4x3.png'
    }
  ];

  const handlePurchase = (equipment: any) => {
    setSelectedEquipment(equipment);
    setShowPurchaseModal(true);
  };

  const handleCloseModal = () => {
    setShowPurchaseModal(false);
    setSelectedEquipment(null);
  };

  const handleConfirmPurchase = () => {
    if (!selectedEquipment || !userFriendlyAddress) return;
    
    const createMessage = async (senderAddr: string) => {
      try {
        const { message, reference } = await createTonPayTransfer(
          {
            amount: selectedEquipment.price,
            asset: "TON",
            recipientAddr: "UQAuQG-DPxana3mUrZvd6YsqPv5-p8Fo5Nyr4bKPJzjf0mcs",
            senderAddr,
            commentToSender: `Purchase ${selectedEquipment.name}`,
          },
          {
            chain: "mainnet",
            apiKey: "test_api_key" // 这里需要替换为实际的TonPay API密钥
          }
        );
        return { message, reference };
      } catch (error) {
        console.error('Failed to create TonPay transfer:', error);
        throw error;
      }
    };
    
    pay(createMessage).then(() => {
      console.log('Transaction sent successfully:', selectedEquipment);
    }).catch((error) => {
      console.error('Transaction failed:', error);
    }).finally(() => {
      setShowPurchaseModal(false);
      setSelectedEquipment(null);
    });
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

        {/* Purchase Modal */}
        {showPurchaseModal && selectedEquipment && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: '#111',
              borderRadius: 16,
              padding: '24px',
              width: '80%',
              maxWidth: '400px',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
                <button
                  onClick={handleCloseModal}
                  style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'rgba(255,255,255,0.6)',
                    fontSize: 18,
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                <img
                  src={selectedEquipment.image}
                  alt={selectedEquipment.name}
                  style={{
                    width: 120,
                    height: 120,
                    objectFit: 'contain',
                    borderRadius: 8
                  }}
                />
              </div>
              
              <div style={{ 
                fontSize: 18, 
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '16px'
              }}>
                {selectedEquipment.name}
              </div>
              
              <div style={{ 
                fontSize: 14, 
                color: 'rgba(255,255,255,0.8)',
                textAlign: 'center',
                marginBottom: '24px',
                lineHeight: '1.5'
              }}>
                After upgrade, you will get {selectedEquipment.dailyYield} per day for {selectedEquipment.id} days
              </div>
              
              <div style={{ 
                fontSize: 16, 
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '24px',
                color: '#4CD964'
              }}>
                {selectedEquipment.price} TON
              </div>
              
              <Button
                size="l"
                stretched
                onClick={handleConfirmPurchase}
                style={{
                  backgroundColor: '#4CD964',
                  color: '#000',
                  fontWeight: 'bold',
                  borderRadius: 8,
                  padding: '12px',
                  marginBottom: '12px'
                }}
              >
                Confirm Purchase
              </Button>
              
              <Button
                size="l"
                stretched
                onClick={handleCloseModal}
                style={{
                  backgroundColor: 'transparent',
                  color: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 8,
                  padding: '12px'
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </Page>
  );
}
