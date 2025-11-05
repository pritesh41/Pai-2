import React, {useState,useEffect}from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts, setSearch, setCategory, setPriceRange, clearFilters, loadMore, applyFilters} from './productSlice'

function Home() {
    const dispatch= useDispatch();
    const { fetchProducts, setSearch, setCategory, setPriceRange, clearFilters, loadMore, applyFilters} =useSelector(state => state.products);

    const [searchInput, setSearchInput] = useState('');
    useEffect(()=> {
        const handler = setTimeout(()=> {
            dispatch(setSearch(searchInput));
            dispatch(applyFilters);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchInput, dispatch]);

    useEffect(()=>{
        dispatch(applyFilters());
    }, [search, category. priceRange, allProducts, dispatch]);
    useEffect(()=> {
        dispatch(fetchProducts());
    }, [dispatch])

  return (
    <div>
      
    </div>
  )
}

export default Home
