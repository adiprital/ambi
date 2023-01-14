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
import Account from './Account';

const store = createStore(rootReducer);

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);
  const [productsArray, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/get-products?limit=0&page=1`);
        store.dispatch({ type: "initialProducts", products: response.data.products });
        store.dispatch({ type: "cartInitialize", cartData: response.data.products });
        store.dispatch({ type: "wishListInitialize", wishListData: response.data.products });
        store.dispatch({ type: "initialTotalPages", pages: response.data.totalPages });
        setProducts(response.data.products);
      }
      catch(error){
        console.log('error in fetch prodcuts', error)
      }
    }
  
    const validateAuthToken = async () => {
      let token = localStorage.getItem('token');
      console.log('token', token);
      if (token) {
        let result = await axios.post('http://localhost:8000/auth/validatetoken', { token });
        if (!result.data.user) {
            localStorage.setItem('token', undefined);
        } else {
            store.dispatch({ type: 'updateCurrentUser',  
            user: {
              email: result.data.user.email,
              balance: result.data.user.balance
          }});
        }
      }
    }

    fetchProducts();
    validateAuthToken();
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

              {/*-----Account----- */}
            <Route
              exact
              path='/account'
              element={<Account/>}
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
