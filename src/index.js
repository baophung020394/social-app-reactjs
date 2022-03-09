import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en.json';
// import ru from 'javascript-time-ago/locale/ru.json';

// TimeAgo.addDefaultLocale(en);
// TimeAgo.addLocale(ru);

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
