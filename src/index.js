import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from './styles/theme';

import App from './App';
import store from './store/index';
import { registerInterceptors } from './services/axios.service';

registerInterceptors();

console.log('Preview from GitHub Actions works!');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
