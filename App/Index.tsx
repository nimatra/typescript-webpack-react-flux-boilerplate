/// <reference path="../typings/tsd.d.ts" />

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Store, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import {Card, CardActions, CardHeader, CardText, CardTitle, AppBar} from 'material-ui';
import {Route, Router, Link, browserHistory} from 'react-router';

import { App } from './components/app';
import MemoList from './components/MemoList/MemoList';
import { counterApp } from './reducers';
import thunkMiddleware from 'redux-thunk';

declare const requires: (name: String) => any;

interface IHotModule {
  hot?: { accept: (path: string, callback: () => void) => void };
};

declare const module: IHotModule;

function configureStore(): Store {
  const store: Store = createStore(counterApp, applyMiddleware(
    thunkMiddleware
  ));

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer: any = requires('./reducers').counterApp;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

const store: Store = configureStore();


class Main extends React.Component<{}, {}> {
  public render(): React.ReactElement<Provider> {
    // return (<Provider store={store}>
    //   <Router >
    //     <Route path='*' component={App}>
    //     </Route>
    //   </Router>
    // </Provider>);
    return (<Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/list' component={MemoList}/>
        <Route path='/memo' component={App}>
          <Route path='/:itemId' component={App}/>
        </Route>
      </Router>
    </Provider>);
  }
}

ReactDOM.render(<Main />, document.getElementById('app'));
