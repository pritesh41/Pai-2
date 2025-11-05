import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  setSearch,
  setCategory,
  setPriceRange,
  clearFilters,
  loadMore,
  applyFilters,
} from './productSlice';

function HomePage() {
  const dispatch = useDispatch();
  const {
    filteredProducts,
    status,
    search,
    category,
    priceRange,
    visibleCount,
    allProducts
  } = useSelector(state => state.products);

  const [searchInput, setSearchInput] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearch(searchInput));
      dispatch(applyFilters());
    }, 500);
    return () => clearTimeout(handler);
  }, [searchInput, dispatch]);

  useEffect(() => {
    dispatch(applyFilters());
  }, [search, category, priceRange, allProducts, dispatch]);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div>
      <input
        placeholder="Search..."
        value={searchInput}
        onChange={e => setSearchInput(e.target.value)}
      />
      <button onClick={() => dispatch(clearFilters())}>Clear Filters</button>

      {status === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <>
          <ul>
            {filteredProducts.slice(0, visibleCount).map(product => (
              <li key={product.id}>
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
          {visibleCount < filteredProducts.length && (
            <button onClick={() => dispatch(loadMore())}>Load More</button>
          )}
        </>
      )}
    </div>
  );
}

export default HomePage;
