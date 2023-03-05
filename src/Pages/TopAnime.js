import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import axios from "axios";
import "../Styling/topAnime.css";

function TopAnime() {
  const [modalData, setModalData] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderAnimeCard = (anime, index) => {
    return (
      <Card id="card" style={{ width: "11rem" }} key={index}>
        <Card.Img variant="top" src={anime.image} />
        <Card.Body>
          <Card.Title>{anime.title}</Card.Title>
          <Card.Body>Rating: {(anime.reviewSum / anime.reviewCount).toFixed(1)}</Card.Body>
          <Button
            variant="danger"
            onClick={() => {
              setModalData(anime["writtenReviews"]);
              handleShow();
            }}
          >
            Reviews
          </Button>
        </Card.Body>
      </Card>
    );
  };

  let token = JSON.parse(localStorage.getItem("Token"));
  const [topAnimeList, setTopAnimeList] = useState([]);

  useEffect(() => {
    const getTopAnime = async () => {
      const url = "http://localhost:3001/users/getTopAnime";
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setTopAnimeList(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getTopAnime();
  },[]);

  return (
    <>
      <div className="topAnime">{topAnimeList.map(renderAnimeCard)}</div>
      <Modal id="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Reviews</Modal.Title>
        </Modal.Header>
        {modalData.map((anime) => {
          return <p id="reviews">{anime.review}</p>;
        })}

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TopAnime;
