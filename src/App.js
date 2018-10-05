import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './components/books';
import Search from './components/search';
import Loader from './components/loader';
import './App.css';

class BooksApp extends React.Component {
  state = {
    myBooks: [],
    loader: true
  };

  componentDidMount() {
    this.getBooks(this.loader);
  }

  loader = (show = true) => {
    this.setState({ loader: show });
  };

  getBooks = (callback = null) => {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks }, () => {
        callback && callback(false);
      });
    });
  };

  getBookSearch = (word, callback) => {
    this.loader();
    BooksAPI.search(word).then(books => {
      this.loader(false);
      callback && callback(books);
    });
  };

  updateBook = obj => {
    if (obj.id && obj.type) {
      this.loader();

      BooksAPI.update(obj.id, obj.type).then(books => {
        this.getBooks(this.loader);
      });
    }
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
              render={() => (
                <Search
                  {...this.state}
                  searchBook={this.getBookSearch}
                  updateBook={this.updateBook}
                />
              )}
            />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

export default BooksApp;
