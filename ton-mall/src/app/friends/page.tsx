'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import { Button, Title } from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

import { useUserData } from '@/hooks/useUserData';

export default function FriendsPage() {
  const router = useRouter();
  const wallet = useTonWallet();
  const userFriendlyAddress = useTonAddress();
  const { userData, isConnected } = useUserData();

  const handleShare = (platform: string) => {
    // 实现分享逻辑
    console.log('Sharing to:', platform);
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
          <Title level="2" style={{ color: '#fff', margin: 0 }}>Friends</Title>
          <div style={{ width: 50 }} />
        </div>

        {/* Affiliate Programs */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            marginBottom: '12px',
            textAlign: 'center'
          }}>
            Affiliate programs
          </div>
          <div style={{ 
            fontSize: 14, 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '16px',
            textAlign: 'center',
            lineHeight: 1.4
          }}>
            After successfully inviting a friend, you will receive 15% of that friend's recharge amount as a commission, ongoing.
          </div>
          <div style={{ 
            fontSize: 32, 
            fontWeight: 'bold', 
            marginBottom: '16px',
            textAlign: 'center'
          }}>
            $0
          </div>
          <Button
            size="l"
            stretched
            style={{
              backgroundColor: '#4CD964',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: 8,
              padding: '12px',
              marginBottom: '8px'
            }}
          >
            Withdrawal
          </Button>
          <div style={{ 
            fontSize: 12, 
            color: 'rgba(255,255,255,0.6)',
            textAlign: 'center'
          }}>
            Commission details
          </div>
        </div>

        {/* Share with Friends */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '20px',
          marginBottom: '24px'
        }}>
          <Button
            size="l"
            stretched
            style={{
              backgroundColor: '#4CD964',
              color: '#000',
              fontWeight: 'bold',
              borderRadius: 8,
              padding: '16px',
              marginBottom: '16px'
            }}
          >
            Share with friends
          </Button>
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            justifyContent: 'center'
          }}>
            {[
              { icon: '💬', color: '#4CD964' },
              { icon: '📱', color: '#007AFF' },
              { icon: '💚', color: '#34C759' },
              { icon: '❌', color: '#FF3B30' },
              { icon: '🔗', color: '#8E8E93' }
            ].map((item, index) => (
              <div 
                key={index} 
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 8,
                  backgroundColor: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  cursor: 'pointer'
                }}
                onClick={() => handleShare(item.icon)}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        {/* My Friends */}
        <div style={{
          marginBottom: '80px'
        }}>
          <div style={{ 
            fontSize: 16, 
            fontWeight: 'bold', 
            marginBottom: '16px'
          }}>
            My Friends (0)
          </div>
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '20px',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 14, 
              color: 'rgba(255,255,255,0.6)'
            }}>
              No friends yet
            </div>
            <Button
              size="l"
              stretched
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: 8,
                padding: '12px',
                marginTop: '16px'
              }}
            >
              Invite Friends
            </Button>
          </div>
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
                color: index === 2 ? '#4CD964' : 'rgba(255,255,255,0.6)',
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
