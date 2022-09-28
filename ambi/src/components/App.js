import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { legacy_createStore as createStore} from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import rootReducer from '../store/reducers/index';
import theme from './ui/Theme';
import Header from './ui/Header';
import Footer from './ui/Footer';
import Products from './Products';
import Caliper from './Caliper';
import HomePage from './HomePage';
import About from './About';
import Contact from './Contact';

const store = createStore(rootReducer);

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {

    const fetchProducts = async () => {
      const products = await axios.get(`http://localhost:8000/get-products`);
      store.dispatch({ type: "fetchProducts", products: products.data })
    }

    fetchProducts();
  }, []);

  console.log("store", store)

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
              // render={props => <Products
              //        {...props}
              //        setValue={setValue}
              //        setSelectedIndex={setSelectedIndex}
              //       />}
            />


            {console.log("store.getState", store.getState())}


            {/*-----Caliper----- */}
            <Route
              exact
              path='/caliper'
              element={<Caliper
                setValue={setValue}
                setSelectedIndex={setSelectedIndex}
              />}
            />
            <Route exact path='/measuretape' element={<div style={{height: '1000px'}}>Measure Tape</div>} />
            <Route exact path='/ruler' element={<div style={{height: '1000px'}}>Ruler</div>} />
            <Route exact path='/scissors' element={<div style={{height: '1000px'}}>Scissors</div>} />
            <Route exact path='/utilityknife' element={<div style={{height: '1000px'}}>Utility Knife</div>} />

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
