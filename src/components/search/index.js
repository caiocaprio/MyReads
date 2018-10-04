import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import ListBooks from '../books/list-books';

class Search extends Component {
  state = {
    query: ''
  };

  updateQuery = query => {
    this.setState({ query: query.trim() });
  };

  clearQuery = () => {
    this.setState({ query: '' });
  };

  onChangeInput = e => {
    this.updateQuery(e.target.value);
  };

  render() {
    console.log('render', this.props);
    const { query } = this.state;
    const { books } = this.props;

    let showingBooks;
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i');
      showingBooks = this.props.books.filter(book =>
        match.test(book.title, book.categories)
      );
    } else {
      showingBooks = books;
    }

    showingBooks.sort(sortBy('name'));

    console.log(showingBooks, this.state.query, showingBooks.length);

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.onChangeInput}
            />
          </div>
        </div>
        <div className="search-books-results">
          {showingBooks && showingBooks.length > 0 && this.state.query != ''
            ? ListBooks(showingBooks, this.props.onUpdate)
            : showingBooks.length == 0 && <li>No records.</li>}
        </div>
      </div>
    );
  }
}

export default Search;
