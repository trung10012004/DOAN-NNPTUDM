import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../../api/axios';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    images: 'https://placehold.co/400',
    stock: 10
  });

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        api.get('/products'),
        api.get('/categories')
      ]);
      setProducts(prodRes.data);
      setCategories(catRes.data);
      
      // Default category if exists
      if (catRes.data.length > 0 && !formData.category) {
        setFormData(prev => ({ ...prev, category: catRes.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditId(product._id);
      setFormData({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category?._id || '',
        images: product.images?.[0] || '',
        stock: 10 // stock usually from inventory, simplifying here
      });
    } else {
      setEditId(null);
      setFormData({
        title: '',
        price: '',
        description: '',
        category: categories.length > 0 ? categories[0]._id : '',
        images: 'https://placehold.co/400',
        stock: 10
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Xóa sản phẩm này?')) return;
    try {
      await api.delete(`/products/${id}`);
      fetchData();
    } catch(err) {
      alert('Lỗi xóa sản phẩm');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        images: [formData.images]
      };
      
      if (editId) {
        await api.put(`/products/${editId}`, payload);
      } else {
        await api.post('/products', payload);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Lỗi lưu sản phẩm: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Quản lý Sản phẩm</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
          <Plus size={18} /> Thêm Sản phẩm
        </button>
      </div>
      
      <div className="card" style={{ overflowX: 'auto', position: 'relative', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Tên sản phẩm</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Danh mục</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Giá</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{p.title}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{p.category?.name || 'N/A'}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>${p.price}</td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenModal(p)} className="btn" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }} title="Sửa"><Edit size={16} /></button>
                    <button onClick={() => handleDelete(p._id)} className="btn btn-danger" style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)' }} title="Xóa"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Không có sản phẩm nào.</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '600px', padding: '2rem', maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexShrink: 0 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{editId ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm'}</h2>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: '0.5rem' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}><X size={24} /></button>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              <form id="product-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Tên điện thoại</label>
                  <input required type="text" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} placeholder="Ví dụ: iPhone 15 Pro Max" />
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Giá ($)</label>
                    <input required type="number" min="0" className="input-field" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Tồn kho</label>
                    <input required type="number" min="0" className="input-field" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Danh mục thư mục (Mặc định chọn iPhone)</label>
                  <select required className="input-field" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)' }}>
                    <option value="" disabled>-- Chọn danh mục là điện thoại iPhone --</option>
                    {categories.map(c => (
                      <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Đường dẫn hình ảnh</label>
                  <input required type="url" className="input-field" value={formData.images} onChange={e => setFormData({...formData, images: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Mô tả</label>
                  <textarea className="input-field" style={{ minHeight: '120px', width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', resize: 'vertical' }} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                </div>
              </form>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexShrink: 0, paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ flex: 1, border: '1px solid var(--border)', padding: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Hủy</button>
              <button type="submit" form="product-form" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem', fontWeight: 600, boxShadow: '0 4px 6px -1px var(--primary-light)' }}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
