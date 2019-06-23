import React from 'react';
import {Provider} from 'react-redux';
import GlobalStyle from './common/GlobalStyle/GlobalStyle';
import RootRouter from './pages/RootRouter';
import {store} from './store';

const App = () => (
    <Provider store={store}>
        <GlobalStyle/>
        <RootRouter/>
    </Provider>
);

export default App;
