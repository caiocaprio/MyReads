import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as ACTION from '../../actions';
import ListBooks, { getBooksType } from './list-books';

const Books = props => {
  return (
    <Fragment>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {ACTION.TYPES_BOOKS.map((item, a) => {
              const _books = getBooksType(props.myBooks, item.type);

              return (
                _books.length > 0 && (
                  <div className="bookshelf" key={a}>
                    <h2 className="bookshelf-title">{item.text}</h2>
                    <div className="bookshelf-books">
                      <ol className="books-grid">
                        {_books
                          ? ListBooks(_books, props.updateBook)
                          : 'No records.'}
                      </ol>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">
            <label>Search</label>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Books;
