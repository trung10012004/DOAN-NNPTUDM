import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--primary)' }}>Our Products</h1>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading products...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '2rem' }}>
          {products.map(product => (
            <Link to={`/products/${product._id}`} key={product._id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '200px', backgroundColor: '#f1f5f9', overflow: 'hidden' }}>
                <img 
                  src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/600x400'} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>{product.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem', flex: 1 }}>
                  {product.description?.substring(0, 50)}...
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem' }}>${product.price}</span>
                  <span style={{ fontSize: '0.875rem', padding: '0.25rem 0.75rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '99px' }}>
                    View Details
                  </span>
                </div>
              </div>
            </Link>
          ))}
          {products.length === 0 && <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-muted)' }}>No products found.</div>}
        </div>
      )}
    </div>
  );
}
