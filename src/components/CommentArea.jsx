import { Component, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

function CommentArea(props) {
  const [state, setState] = useState({
    comments: [],
    isLoading: false,
    isError: false,
  });

  // state = {
  //   comments: [],
  //   isLoading: false,
  //   isError: false,
  // };

  // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization:
  //             'Bearer inserisci-qui-il-tuo-token',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // }

  const componentDidUpdate = async (prevProps) => {
    if (prevProps.asin !== this.props.asin) {
      this.setState({
        isLoading: true,
      });
      try {
        let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + this.props.asin, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWY5YThiNDA0NTg5ZjAwMTk0OGU2MGYiLCJpYXQiOjE3MTA4NjA0NjgsImV4cCI6MTcxMjA3MDA2OH0.ssaXUIrFNYIKeVjfYMCYrQR8PlPh32Gt2mFzAM3Utdk",
          },
        });
        console.log(response);
        if (response.ok) {
          let comments = await response.json();
          this.setState({
            comments: comments,
            isLoading: false,
            isError: false,
          });
        } else {
          this.setState({ isLoading: false, isError: true });
        }
      } catch (error) {
        console.log(error);
        this.setState({ isLoading: false, isError: true });
      }
    }
  };

  return (
    <div className="text-center">
      {state.isLoading && <Loading />}
      {state.isError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={state.comments} />
    </div>
  );
}

export default CommentArea;
