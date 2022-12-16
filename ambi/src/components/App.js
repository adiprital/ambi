import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getProductData } from '../utils/functions';
import rootReducer from '../store/reducers/index';
import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import HomePage from './HomePage';
import About from './About';
import Contact from './Contact';
import Products from './Products';
import Product from './Product';

const store = createStore(rootReducer);

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [productsArray, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const products = await axios.get(`http://localhost:8000/get-products?limit=5&page=1`);
        store.dispatch({ type: "fetchProducts", products: products.data.products });
        store.dispatch({ type: "cartInitialize", cartData: products.data.products });
        setProducts(products.data.products);
      }
      catch(error){
        console.log('error in fetch prodcuts', error)
      }
    }
    fetchProducts();
  }, []);

  const getRouteComponent = (productName) => {
    const productData = getProductData(productName, store.getState().productsList.products);
    return (
      <Product 
        setValue={setValue} 
        setSelectedIndex={setSelectedIndex} 
        productName={productName}
        productData={productData}
        />);
    }

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Header
            value={value}
            setValue={setValue}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <Routes>
            {/*-----HomePage----- */}
            <Route
              exact
              path='/'
              element={<HomePage
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />}
            />
            {/*-----About Us----- */}
            <Route
              exact
              path='/about'
              element={<About
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />}
            />
            {/*-----Products----- */}
            <Route
              exact
              path='/products'
              element={<Products
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />}
            />

            {productsArray.map((product, i) => {
              return (
                <Route
                  key={`${product}${i}`}
                  exact
                  path={`/${product.name.replace(/\s/g, '').toLowerCase()}`}
                  element={getRouteComponent(product.name)}
                />
              )
            })}

            {/*-----Contact Us----- */}
            <Route
              exact
              path='/contact'
              element={<Contact
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />}
            />
          </Routes>
          <Footer
            setValue={setValue}
            setSelectedIndex={setSelectedIndex}
          />
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
