import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as ACTION from '../../actions';
import ListBooks from './list-books';

const Books = props => {
  return (
    <Fragment>
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {props.books
              ? ListBooks(props.books, props.updateBook)
              : 'No records.'}
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
