import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Toaster } from 'react-hot-toast';
import { ProductState } from './Context/Product';
import { AuthenticationState } from './Context/AuthContext';
import { BrainTreeState } from './Context/BrainTreeContext';
import { ViewState } from './Context/ViewContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationState>
      <BrainTreeState>
        <ProductState>
          <ViewState>

            <Toaster position="top-center" />
            <App />

          </ViewState>
        </ProductState>
      </BrainTreeState>
    </AuthenticationState>
  </React.StrictMode>
);

reportWebVitals();
