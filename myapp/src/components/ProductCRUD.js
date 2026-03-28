import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../features/productsSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const ProductCRUD = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ title: '', price: '', category: '' });

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct.id, productData: formData }));
      setEditingProduct(null);
    } else {
      dispatch(addProduct(formData));
    }
    setFormData({ title: '', price: '', category: '' });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({ title: product.title, price: product.price, category: product.category });
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Product CRUD - Total Records: {products.length}</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/products')}>View Products</button>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <button type="submit">{editingProduct ? 'Update' : 'Add'} Product</button>
        {editingProduct && <button type="button" onClick={() => { setEditingProduct(null); setFormData({ title: '', price: '', category: '' }); }}>Cancel</button>}
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCRUD;