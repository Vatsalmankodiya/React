import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/productsSlice';
import { logout } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector((state) => state.products);
  const { token } = useSelector((state) => state.auth);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Product List</h2>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/crud')}>Manage Products</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;