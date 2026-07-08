import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiArrowLeft } from 'react-icons/fi';

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      textAlign: 'center',
      padding: '2rem',
      animation: 'slideIn 0.4s ease-out',
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
      }}>
        <FiLock size={32} color="#ef4444" />
      </div>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--text-primary)',
        marginBottom: '0.5rem',
      }}>
        Access Denied
      </h2>
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-secondary)',
        maxWidth: '400px',
        marginBottom: '1.5rem',
        lineHeight: '1.6',
      }}>
        You don't have permission to access this page. Contact your administrator for access.
      </p>
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.7rem 1.5rem',
          background: 'linear-gradient(135deg, #0f62fe, #3b82f6)',
          color: '#fff',
          border: 'none',
          borderRadius: '10px',
          fontSize: '0.85rem',
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.3s ease',
        }}
      >
        <FiArrowLeft size={16} />
        Back to Dashboard
      </button>
    </div>
  );
};

export default AccessDenied;
