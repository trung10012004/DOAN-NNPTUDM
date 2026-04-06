import React, { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import api from '../../api/axios';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: ''
  });

  const fetchData = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
      // Fetch roles if we had an endpoint. Since we don't standardly expose roles in routes, 
      // we might need to hardcode the USER role ID or just let the backend handle it during register.
      // But admin POST /users requires role. So we need the role endpoint.
      // Fortunately /roles may exist. Let's try.
      try {
        const roleRes = await api.get('/roles');
        setRoles(roleRes.data);
      } catch (e) {
        // Fallback or ignore
      }
    } catch (err) {
      console.error(err);
      alert('Lỗi khi tải người dùng');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditId(user._id);
      setFormData({
        username: user.username,
        email: user.email,
        password: '', // Không hiện password cũ
        role: user.role?._id || ''
      });
    } else {
      setEditId(null);
      setFormData({
        username: '',
        email: '',
        password: '',
        role: roles.length > 0 ? roles[0]._id : ''
      });
    }
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn vô hiệu hóa tài khoản này?')) return;
    try {
      await api.delete(`/users/${id}`);
      fetchData();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (editId) {
        if (!payload.password) delete payload.password; // không update pass nếu rỗng
        await api.put(`/users/${editId}`, payload);
      } else {
        await api.post('/users', payload);
      }
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Lỗi: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>Quản lý Người dùng</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
          <Plus size={18} /> Thêm Người dùng
        </button>
      </div>
      
      <div className="card" style={{ overflowX: 'auto', position: 'relative', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Đang tải danh sách người dùng...</div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '2px solid var(--border)' }}>
              <tr>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Tên đăng nhập</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Email</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Vai trò</th>
                <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--text-primary)' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid var(--border)', opacity: u.isDeleted ? 0.5 : 1, transition: 'background-color 0.2s ease' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{u.username} {u.isDeleted && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>(Đã vô hiệu hóa)</span>}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      padding: '0.25rem 0.5rem', 
                      borderRadius: '4px', 
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: u.role?.name === 'ADMIN' ? 'var(--primary-light)' : 'var(--bg-secondary)',
                      color: u.role?.name === 'ADMIN' ? 'var(--primary)' : 'var(--text-secondary)',
                      border: '1px solid',
                      borderColor: u.role?.name === 'ADMIN' ? 'rgba(var(--primary-rgb), 0.2)' : 'var(--border)'
                    }}>
                      {u.role?.name || 'USER'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleOpenModal(u)} className="btn" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.5rem', borderRadius: 'var(--radius-md)' }} title="Sửa"><Edit size={16} /></button>
                    {u.role?.name !== 'ADMIN' && !u.isDeleted && (
                      <button onClick={() => handleDelete(u._id)} className="btn btn-danger" style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)' }} title="Vô hiệu hóa">
                        <Trash2 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {users.length === 0 && <tr><td colSpan="4" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Không tìm thấy người dùng nào.</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2rem', maxHeight: '85vh', display: 'flex', flexDirection: 'column', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', flexShrink: 0 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{editId ? 'Sửa Người dùng' : 'Thêm Người dùng'}</h2>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', padding: '0.5rem' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}><X size={24} /></button>
            </div>
            
            <div style={{ overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
              <form id="user-form" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Tên đăng nhập</label>
                  <input required type="text" className="input-field" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Email</label>
                  <input required type="email" className="input-field" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Mật khẩu {editId && <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(để trống nếu không đổi)</span>}</label>
                  <input required={!editId} type="password" className="input-field" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }} />
                </div>

                {roles.length > 0 && (
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Vai trò</label>
                    <select required className="input-field" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--bg-primary)' }}>
                      <option value="" disabled>-- Chọn vai trò --</option>
                      {roles.map(r => (
                        <option key={r._id} value={r._id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </form>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexShrink: 0, paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
              <button type="button" onClick={() => setShowModal(false)} className="btn" style={{ flex: 1, border: '1px solid var(--border)', padding: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', transition: 'background-color 0.2s' }} onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-secondary)'} onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>Hủy</button>
              <button type="submit" form="user-form" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem', fontWeight: 600, boxShadow: '0 4px 6px -1px var(--primary-light)' }}>Lưu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
