'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Page } from '@/components/Page';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to mining page after 2 seconds
    const timer = setTimeout(() => {
      router.push('/mining');
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Page>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        backgroundColor: '#000',
        color: '#4CD964',
        position: 'relative',
        padding: '20px'
      }}>
        {/* Loading Animation */}
        <div style={{
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: '2px solid rgba(76, 217, 100, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'spin 2s linear infinite'
        }}>
          <div style={{
            width: 60,
            height: 60,
            background: '#4CD964',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: 40,
              height: 40,
              background: '#000',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
            }} />
          </div>
        </div>
        
        {/* Loading Text */}
        <div style={{
          marginTop: 24,
          fontSize: 18,
          color: '#4CD964',
          fontWeight: '500'
        }}>
          Loading...
        </div>
        
        {/* Add animation keyframes */}
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </Page>
  );
}
