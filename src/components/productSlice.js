import { createSlice, createAsyncThunk, createActionCreatorInvariantMiddleware } from "@reduxjs/toolkit";

export const fetchProducts= createAsyncThunk(

    'products/fetchProducts',
    async()=>{
        const rest = await fetch('https://fakestoreapi.com/products');
        return await rest.json();
    }
);

const initialState= {
    allProducts : [],
    filteredProducts:[],
    status: 'idle',
    search: '',
    category: '',
    priceRange: [0,1000],
    visibleCount:8
};

const productSlice =createSlice({
    name: 'products',
    initialState,
    reducers : {
        setSearch(state, action) {
            state.search =action.payload;
            state.visibleCount=8;
        },
        setCategory(state, action) {
            state.search =action.payload;
            state.visibleCount=8;
        },
        setPriceRange(state, action) {
            state.search =action.payload;
            state.visibleCount=8;
        },
        clearFilters(state){
            state.search='';
            state.category= '';
            state.priceRange=[0,1000];
            state.visibleCount=8;
        },
        loadMore(state){
            state.visibleCount += 8;
        },
        applyFilters(state){
            let data =state.allProducts;
            if(state.search){
                data= data.filter(product=>product.category=== state.category);
            }
            data = data.filter(
                p=> p.price >= state.priceRange[0] && p.price<= state.priceRange[1]
            );
            state.filteredProducts =data;
        },

    },
     
    extraReducers: builder =>{
        builder.addCase(fetchProducts.pending, 
            state => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled,
                (state,action) => {
                    state.allProducts = action.payload;
                    state.status= 'succeeded';
                    state.filteredProducts = action.payload;
                })
                .addCase(fetchProducts.rejected, state =>{
                    state.status='failed';
                });
    },
});

export const {
    setSearch,
    setCategory,
    setPriceRange,
    clearFilters,
    loadMore,
    applyFilters,
} =productSlice.actions;

export default productSlice.reducer;