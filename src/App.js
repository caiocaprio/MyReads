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
    loader: false
  };

  /**
   * componentDidMount
   * Runs after first render by calling book listing.
   * @memberof BooksApp
   */
  componentDidMount() {
    this.loader(true);
    this.getBooks(() => {
      this.loader(false);
    });
  }

  /**
   * loader
   * set the visible or invisible loader.
   * @memberof BooksApp
   */
  loader = (show = true) => {
    this.setState({ loader: show });
  };

  /**
   * getBooks
   * Calls API by bringing the books listing from the bookshelf and arrows the state of the component with the books and triggers a callback.
   * @memberof BooksApp
   */
  getBooks = (callback = null) => {
    BooksAPI.getAll().then(myBooks => {
      this.setState({ myBooks }, () => {
        callback && callback();
      });
    });
  };

  /**
   * getBookSearch
   * Activates loader, calls search api and triggers callback with search books.
   * @memberof BooksApp
   */
  getBookSearch = (word, callback) => {
    this.loader();
    BooksAPI.search(word).then(books => {
      this.loader(false);
      callback && callback(books);
    });
  };

  /**
   * updateBook
   * Calls api to fill a book to his bookshelf, receives an object with `id` and `type`.
   * @memberof BooksApp
   */
  updateBook = obj => {
    if (obj.id && obj.type) {
      this.loader();

      BooksAPI.update(obj.id, obj.type).then(books => {
        this.getBooks(() => {
          this.loader(false);
        });
      });
    }
  };

  /**
   * render
   * Renders the visual component.
   * @returns
   * @memberof BooksApp
   */
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
