import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import Nav from "./src/navigation";

export default App = () => {
  return (
    <Provider store={store}>
      <Nav />
    </Provider>
  );
};
