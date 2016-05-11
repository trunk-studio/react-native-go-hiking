import React from 'react-native';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import AppRoutes from './routes';

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}
