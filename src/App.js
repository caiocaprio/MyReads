import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './components/books';
import Search from './components/search';
import Loader from './components/loader';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    loader: true
  };

  componentDidMount() {
    this.getBooks(this.loader);
  }

  loader = () => {
    this.setState({ loader: !this.state.loader });
  };

  getBooks = (callback = null) => {
    BooksAPI.getAll().then(books => {
      this.setState({ books }, () => {
        callback && callback();
      });
    });
  };

  updateBook = (id, type) => {
    this.loader();
    BooksAPI.update(id, type).then(books => {
      this.getBooks(this.loader);
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.loader && <Loader />}
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <Books {...this.state} updateBook={this.updateBook} />
              )}
            />
            <Route
              exact
              path="/search"
              render={() => <Search {...this.state} />}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default BooksApp;
