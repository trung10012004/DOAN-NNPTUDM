import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import api from '../api/axios';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>Loading...</div>;
  if (!product) return <div className="container" style={{ padding: '3rem 1rem', textAlign: 'center' }}>Product not found.</div>;

  return (
    <div className="container animate-fade-in" style={{ padding: '3rem 1rem' }}>
      <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="card" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden' }}>
        <div style={{ flex: '1 1 400px', backgroundColor: '#f1f5f9', minHeight: '400px' }}>
          <img 
            src={product.images && product.images[0] ? product.images[0] : 'https://placehold.co/800x800'} 
            alt={product.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ flex: '1 1 400px', padding: '3rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem' }}>{product.title}</h1>
          <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '1.5rem' }}>${product.price}</p>
          
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{product.description || 'No description available for this premium product.'}</p>
          </div>

          <button className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}>
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
