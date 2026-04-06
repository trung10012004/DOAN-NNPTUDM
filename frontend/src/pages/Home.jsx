import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, ShieldCheck, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '6rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Chất lượng cao cấp,<br /> Giá cả tuyệt vời.
          </h1>
          <p style={{ fontSize: '1.125rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            Khám phá bộ sưu tập sản phẩm cao cấp được tuyển chọn kỹ lưỡng, thiết kế để nâng tầm cuộc sống của bạn.
          </p>
          <Link to="/products" className="btn" style={{ backgroundColor: 'white', color: 'var(--primary)', fontSize: '1.125rem', padding: '0.75rem 2rem', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            Mua Ngay <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '5rem 1rem', backgroundColor: 'var(--bg-primary)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ padding: '2rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ backgroundColor: 'var(--primary-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Truck size={32} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Giao Hàng Nhanh</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Nhận sản phẩm ngay trước cửa nhà bạn chỉ trong 48 giờ đối với thành viên cao cấp.</p>
          </div>
          
          <div className="card" style={{ padding: '2rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ backgroundColor: 'var(--primary-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShieldCheck size={32} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Thanh Toán An Toàn</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Thông tin thanh toán của bạn được mã hóa an toàn. Hỗ trợ đa dạng phương thức.</p>
          </div>

          <div className="card" style={{ padding: '2rem', textAlign: 'center', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', transition: 'transform 0.3s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ backgroundColor: 'var(--primary-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <ShoppingBag size={32} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Sản Phẩm Cao Cấp</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Chúng tôi chỉ mang đến những sản phẩm chất lượng cao nhất cho những khách hàng thượng đế.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
