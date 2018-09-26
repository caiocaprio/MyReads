import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './components/books';
import Search from './components/search';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Books {...this.state} />} />
          <Route
            exact
            path="/search"
            render={() => <Search {...this.state} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default BooksApp;
