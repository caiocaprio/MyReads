import React from 'react';
import * as ACTION from '../../actions';

/**
 * getBooksType
 * Filter the books on the shelf
 * @param {*} books
 * @param {*} type
 * @returns
 */
export const getBooksType = (books, type) => {
  const _books = books.filter((item, x) => {
    return item.shelf === type;
  });
  return _books.length > 0 ? _books : false;
};

/**
 * ListBooks
 * Renders the visual component with the listing of the books in case the book already exists in myBooks would not repeat in the listing.
 * @param {*} books
 * @param {*} onUpdate
 * @param {*} [myBooks=[]]
 * @returns
 */
const ListBooks = (books, onUpdate, myBooks = []) => {
  return books
    ? books.map((item, i) => {
        let myBookExist = [];

        if (myBooks) {
          myBookExist = myBooks.filter(myBook => {
            if (myBook.id === item.id) {
              return true;
            }
          });
        }
        if (!myBookExist.length > 0) {
          return (
            <li key={i}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={(() => {
                      if (item.imageLinks && item.imageLinks.smallThumbnail) {
                        return {
                          width: 128,
                          height: 193,
                          backgroundImage:
                            'url("' + item.imageLinks.smallThumbnail + '")'
                        };
                      } else {
                        return {
                          width: 128,
                          height: 193
                        };
                      }
                    })()}
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
                      defaultValue={(() => {
                        return item.shelf ? item.shelf : ACTION.NONE;
                      })()}
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
        }
      })
    : 'No records.';
};

export default ListBooks;
