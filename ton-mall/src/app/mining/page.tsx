'use client';

import { useState, useEffect } from 'react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import {
  Button,
  Text,
  Title,
} from '@telegram-apps/telegram-ui';
import { Page } from '@/components/Page';

import { useUserData } from '@/hooks/useUserData';

export default function MiningPage() {
  const wallet = useTonWallet();
  const { userData, loading, claimMining, isConnected } = useUserData();
  const [claiming, setClaiming] = useState(false);
  const [earned, setEarned] = useState<string | null>(null);

  const handleClaim = async () => {
    setClaiming(true);
    try {
      const amount = await claimMining();
      setEarned(amount);
      setTimeout(() => setEarned(null), 3000);
    } finally {
      setClaiming(false);
    }
  };

  if (!isConnected) {
    return (
      <Page>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#000'
        }}>
          <div style={{ 
            fontSize: 80, 
            marginBottom: 20 
          }}>💎</div>
          <Title level="1" style={{ marginBottom: 8, color: '#fff' }}>TON Mining</Title>
          <Text style={{ color: '#999', marginBottom: 24 }}>
            Connect your wallet to start mining TON
          </Text>
          <TonConnectButton />
        </div>
      </Page>
    );
  }

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
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginRight: 8 }}>Close</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginRight: 8 }}>Free TON</span>
            <span style={{ color: '#4CD964' }}>✅</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: '#fff' }}>▼</span>
            <span style={{ color: '#fff' }}>⋮</span>
          </div>
        </div>

        {/* Notification */}
        <div style={{
          backgroundColor: 'rgba(76, 217, 100, 0.2)',
          borderRadius: 8,
          padding: '12px',
          marginBottom: '16px',
          fontSize: 14
        }}>
          @Madella Withdrawal has been received 16
        </div>

        {/* Main Mining Card */}
        <div style={{
          backgroundColor: 'linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%)',
          background: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad1%22 x1=%220%25%22 y1=%220%25%22 x2=%22100%25%22 y2=%22100%25%22%3E%3Cstop offset=%220%25%22 style=%22stop-color:%23001f3f;stop-opacity:1%22 /%3E%3Cstop offset=%22100%25%22 style=%22stop-color:%230074d9;stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width=%22100%25%22 height=%22100%25%22 fill=%22url(%23grad1)%22 /%3E%3Cpath d=%22M0,0 L100,100 M100,0 L0,100%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%222%22 /%3E%3C/svg%3E")',
          borderRadius: 16,
          padding: '24px',
          marginBottom: '24px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Circuit Board Background Elements */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%25%22 height=%22100%25%22%3E%3Cpath d=%22M10,10 L90,10 L90,90 L10,90 Z%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%221%22 fill=%22none%22 /%3E%3Cpath d=%22M20,20 L80,20 M20,40 L80,40 M20,60 L80,60 M20,80 L80,80%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%221%22 /%3E%3Cpath d=%22M20,20 L20,80 M40,20 L40,80 M60,20 L60,80 M80,20 L80,80%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%221%22 /%3E%3Ccircle cx=%2220%22 cy=%2220%22 r=%222%22 fill=%22rgba(76,217,100,0.5)%22 /%3E%3Ccircle cx=%2280%22 cy=%2220%22 r=%222%22 fill=%22rgba(76,217,100,0.5)%22 /%3E%3Ccircle cx=%2220%22 cy=%2280%22 r=%222%22 fill=%22rgba(76,217,100,0.5)%22 /%3E%3Ccircle cx=%2280%22 cy=%2280%22 r=%222%22 fill=%22rgba(76,217,100,0.5)%22 /%3E%3C/svg%3E")',
            opacity: 0.5
          }} />

          {/* TON Balance */}
          <div style={{ 
            textAlign: 'center',
            marginBottom: '24px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', marginBottom: 4 }}>TON</div>
            <div style={{ fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 8 }}>0.003935160</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Total Power: 0.000019290 TON/s</div>
          </div>

          {/* Mining Icon */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '32px',
            position: 'relative',
            zIndex: 1
          }}>
            <div style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 122, 255, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(0, 122, 255, 0.5)'
            }}>
              <div style={{
                width: 60,
                height: 60,
                backgroundColor: '#fff',
                clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                transform: 'rotate(180deg)'
              }} />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px',
            position: 'relative',
            zIndex: 1
          }}>
            <Button
              size="l"
              stretched
              loading={claiming}
              onClick={handleClaim}
              style={{
                backgroundColor: '#fff',
                color: '#000',
                fontWeight: 'bold',
                borderRadius: 8,
                padding: '16px'
              }}
            >
              Claim
            </Button>
            <Button
              size="l"
              stretched
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: '#fff',
                fontWeight: 'bold',
                borderRadius: 8,
                padding: '16px'
              }}
            >
              Upgrade
            </Button>
          </div>
        </div>

        {/* Wallet Balance */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '12px', fontSize: 16, fontWeight: 'bold' }}>Wallet Balance</div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 122, 255, 0.8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12
              }}>
                <div style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#fff',
                  clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)',
                  transform: 'rotate(180deg)'
                }} />
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 'bold' }}>10.09392449</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>≈ $13.75</div>
              </div>
            </div>
            <Button
              style={{
                backgroundColor: '#4CD964',
                color: '#000',
                fontWeight: 'bold',
                borderRadius: 8,
                padding: '8px 16px'
              }}
            >
              Withdraw
            </Button>
          </div>
        </div>

        {/* Invite Friends */}
        <div style={{
          marginBottom: '24px'
        }}>
          <div style={{ marginBottom: '12px', fontSize: 16, fontWeight: 'bold' }}>Invite friends</div>
          <div style={{ 
            fontSize: 14, 
            color: 'rgba(255,255,255,0.8)',
            marginBottom: '16px',
            lineHeight: 1.4
          }}>
            Share to group chat or friends, for each successful invitation of 1 friend, you can receive 1 TON. You can also share to platforms like Facebook, Twitter, Instagram, YouTube, etc., to increase your earnings!
          </div>
          <div style={{ 
            display: 'flex', 
            gap: '12px',
            marginBottom: '16px'
          }}>
            {['📧', '💬', '📱', '🌐', '🐦', '🔗'].map((icon, index) => (
              <div key={index} style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: index === 0 ? '#007AFF' : 
                                  index === 1 ? '#4CD964' : 
                                  index === 2 ? '#FF3B30' : 
                                  index === 3 ? '#FF9500' : 
                                  index === 4 ? '#1DA1F2' : 
                                  '#8E8E93',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20
              }}>
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Daily Tasks */}
        <div style={{
          marginBottom: '80px'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '16px'
          }}>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>Daily tasks</div>
            <div style={{ 
              width: 32,
              height: 32,
              borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              🔄
            </div>
          </div>

          {[
            { title: 'Boost News', reward: '+1 $TON', icon: '⭐' },
            { title: 'Invitation Tasks (0/5)', reward: '+10 $TON', icon: '📨' },
            { title: 'Free to claim', reward: '+0.5 $TON', icon: '🎁' }
          ].map((task, index) => (
            <div key={index} style={{
              backgroundColor: 'rgba(255,255,255,0.1)',
              borderRadius: 12,
              padding: '16px',
              marginBottom: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: 8,
                  backgroundColor: 'rgba(0, 122, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 12,
                  fontSize: 20
                }}>
                  {task.icon}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: '500', marginBottom: 4 }}>{task.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>{task.reward}</div>
                </div>
              </div>
              <Button
                style={{
                  backgroundColor: '#4CD964',
                  color: '#000',
                  fontWeight: 'bold',
                  borderRadius: 8,
                  padding: '8px 16px'
                }}
              >
                GO
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
            { icon: '🏠', label: 'Home' },
            { icon: '⚙️', label: 'Upgrade' },
            { icon: '👥', label: 'Friends' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              fontSize: 12,
              color: index === 0 ? '#4CD964' : 'rgba(255,255,255,0.6)'
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
