import React from 'react';

export default function Cart() {
  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Your Shopping Cart</h1>
      
      <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
        <div style={{ backgroundColor: 'var(--bg-primary)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <span style={{ fontSize: '2rem' }}>🛒</span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.5rem' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Looks like you haven't added any premium items yet.</p>
      </div>
    </div>
  );
}
