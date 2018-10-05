import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import ListBooks, { getBooksType } from '../books/list-books';
import * as ACTION from '../../actions';
class Search extends Component {
  state = {
    query: '',
    books: [],
    timerKey: 0
  };

  updateQuery = query => {
    clearTimeout(this.state.timerKey);
    if (query !== '') {
      this.setState({
        timerKey: setTimeout(() => {
          this.onSearchBook(query);
        }, 500)
      });
    } else {
      this.setState({ books: [], query: '' });
    }
  };

  onSearchBook = query => {
    this.props.searchBook &&
      this.props.searchBook(query, books => {
        this.setState({ query: query.trim(), books });
      });
  };

  clearQuery = () => {
    this.setState({ query: '' });
  };

  onChangeInput = e => {
    this.updateQuery(e.target.value);
  };

  render() {
    const { query, books } = this.state;
    const { myBooks, updateBook } = this.props;

    let showingBooks;
    if (query !== '') {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = myBooks.filter(book =>
        match.test(book.title, book.categories)
      );
      showingBooks.sort(sortBy('name'));
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books && books.length > 0 && this.state.query !== ''
              ? ListBooks(books, updateBook, myBooks)
              : (books.error || books.length === 0) && <li>No records.</li>}
          </ol>
          <div>
            {showingBooks &&
              ACTION.TYPES_BOOKS.map((item, a) => {
                const _books = getBooksType(showingBooks, item.type);
                if (_books) {
                  return (
                    <div className="bookshelf" key={a}>
                      <h2 className="bookshelf-title">{item.text}</h2>
                      <div className="bookshelf-books">
                        <ol className="books-grid">
                          {ListBooks(_books, updateBook)}
                        </ol>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
