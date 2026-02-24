'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTonWallet } from '@tonconnect/ui-react';
import {
  Button,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

export default function WithdrawPage() {
  const router = useRouter();
  const wallet = useTonWallet();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawing, setWithdrawing] = useState(false);

  const handleBack = () => {
    router.push('/mining');
  };

  const handleWithdraw = async () => {
    if (!withdrawAmount || !withdrawAddress) {
      alert('Please enter amount and address');
      return;
    }

    setWithdrawing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Withdrawal successful!');
      router.push('/mining');
    } catch (error) {
      alert('Withdrawal failed');
    } finally {
      setWithdrawing(false);
    }
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
            onClick={handleBack}
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
          <Title level="2" style={{ color: '#fff', margin: 0 }}>Withdraw</Title>
          <div style={{ width: 50 }} />
        </div>

        {/* Balance Card */}
        <div style={{
          backgroundColor: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
          background: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad1%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23001f3f;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%230074d9;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grad1)%22 /%3E%3C/svg%3E")',
          borderRadius: 16,
          padding: '24px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ 
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>Available Balance</div>
            <div style={{ fontSize: 32, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>10.09392449</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>≈ $13.75 USD</div>
          </div>
        </div>

        {/* Withdraw Form */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>Amount (TON)</div>
            <input
              type="text"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Enter amount"
              style={{
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '12px',
                color: '#fff',
                fontSize: 16,
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>Withdrawal Address</div>
            <input
              type="text"
              value={withdrawAddress}
              onChange={(e) => setWithdrawAddress(e.target.value)}
              placeholder="Enter TON wallet address"
              style={{
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 8,
                padding: '12px',
                color: '#fff',
                fontSize: 16,
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>Network Fee</div>
            <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.6)' }}>0.01 TON</div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 8 }}>You will receive</div>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#4CD964' }}>
              {withdrawAmount ? (parseFloat(withdrawAmount) - 0.01).toFixed(9) : '0.000000000'} TON
            </div>
          </div>

          <Button
            size="l"
            stretched
            loading={withdrawing}
            onClick={handleWithdraw}
            style={{
              backgroundColor: '#4CD964',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: 8,
              padding: '16px'
            }}
          >
            {withdrawing ? 'Processing...' : 'Withdraw'}
          </Button>
        </div>

        {/* Withdrawal History */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '20px'
        }}>
          <div style={{ fontSize: 16, fontWeight: 'bold', marginBottom: '16px' }}>Recent Withdrawals</div>
          
          {[
            { amount: '5.000000000', date: '2024-01-15', status: 'Completed' },
            { amount: '3.500000000', date: '2024-01-10', status: 'Completed' },
            { amount: '2.000000000', date: '2024-01-05', status: 'Completed' }
          ].map((withdrawal, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none'
            }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: '500', marginBottom: 4 }}>{withdrawal.amount} TON</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{withdrawal.date}</div>
              </div>
              <div style={{
                backgroundColor: 'rgba(76, 217, 100, 0.2)',
                color: '#4CD964',
                padding: '4px 12px',
                borderRadius: 12,
                fontSize: 12,
                fontWeight: 'bold'
              }}>
                {withdrawal.status}
              </div>
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
            { icon: '🏠', label: 'Home' },
            { icon: '⚙️', label: 'Upgrade' },
            { icon: '👥', label: 'Friends' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
              color: 'rgba(255,255,255,0.6)'
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}