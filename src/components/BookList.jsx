import SingleBook from "./SingleBook";
import { Col, Form, Row } from "react-bootstrap";
import CommentArea from "./CommentArea";
import { useState } from "react";

function BookList(props) {
  const [State, setState] = useState({
    searchQuery: "",
    selectedBook: null,
  });
  // state = {
  //   searchQuery: '',
  //   selectedBook: null,
  // }

  const changeSelectedBook = (asin) => {
    setState((prevState) => ({
      ...prevState,
      selectedBook: asin,
    }));
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={4} className="text-center">
              <Form.Group>
                <Form.Control
                  type="search"
                  placeholder="Cerca un libro"
                  value={State.searchQuery}
                  onChange={(e) => setState({ searchQuery: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="g-2 mt-3">
            {props.books
              .filter((b) => b.title.toLowerCase().includes(State.searchQuery))
              .map((b) => (
                <Col xs={12} md={4} key={b.asin}>
                  <SingleBook book={b} selectedBook={State.selectedBook} changeSelectedBook={changeSelectedBook} />
                </Col>
              ))}
          </Row>
        </Col>
        <Col md={4}>
          <CommentArea asin={State.selectedBook} />
        </Col>
      </Row>
    </>
  );
}

export default BookList;
