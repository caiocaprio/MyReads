import React from 'react';
import * as ACTION from '../../actions';

const getBooksType = (books, type) => {
  const _books = books.filter((item, x) => {
    return item.shelf === type;
  });
  return _books.length > 0 ? _books : false;
};

const ListBooks = (books, onUpdate) => {
  return ACTION.TYPES_BOOKS.map((item, a) => {
    const _books = getBooksType(books, item.type);

    return (
      <div className="bookshelf" key={a}>
        <h2 className="bookshelf-title">{item.text}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {_books
              ? _books.map((item, i) => {
                  console.log(item);
                  return (
                    <li key={i}>
                      <div className="book">
                        <div className="book-top">
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 193,
                              backgroundImage:
                                'url("' + item.imageLinks.smallThumbnail + '")'
                            }}
                          />
                          <div className="book-shelf-changer">
                            <select
                              id={item.id}
                              onChange={e => {
                                onUpdate({
                                  id: e.currentTarget.id,
                                  type: e.currentTarget.value
                                });
                              }}
                              defaultValue={item.shelf}
                            >
                              <option value="move" disabled>
                                Move to...
                              </option>
                              {ACTION.TYPES_BOOKS.map((opt, i) => {
                                return (
                                  <option key={i} value={opt.type}>
                                    {opt.text}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{item.title}</div>
                        <div className="book-authors">{item.authors}</div>
                      </div>
                    </li>
                  );
                })
              : 'No records.'}
          </ol>
        </div>
      </div>
    );
  });
};

export default ListBooks;
