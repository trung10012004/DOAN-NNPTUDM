import React from 'react';

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-primary)' }}>Bảng Điều Khiển Admin</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
        <div className="card" style={{ padding: '1.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tổng số người dùng</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>1,024</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tổng số sản phẩm</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.5rem' }}>48</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Đơn hàng đang chờ</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--warning)', marginTop: '0.5rem' }}>12</p>
        </div>
        <div className="card" style={{ padding: '1.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'all 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Doanh thu</h3>
          <p style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.5rem' }}>$12,450</p>
        </div>
      </div>
    </div>
  );
}
