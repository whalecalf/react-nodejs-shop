import React from 'react';
import {createRoot} from 'react-dom/client';
import "./assets/css/common.less";
import "./assets/css/font.css";
import "./assets/css/iconfont.css";
import AppRouter from './router';
import { Provider } from 'react-redux';
import store from './redux/store';
import "../src/utils/init"

const rootnode=document.getElementById('root');
const root = createRoot(rootnode);
root.render(
  <React.StrictMode >
    <Provider store={store}>
      <AppRouter />
    </Provider>
    
  </React.StrictMode>
);

// console.log(AppRouter);

