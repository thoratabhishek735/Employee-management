
import './App.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Homepage from './Views/Homepage';

function App() {
  return (
    <Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
        <Route path={'/'} exact component={(props) => <Homepage {...props} />} />
        </Switch>
      </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
