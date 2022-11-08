import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Card, Modal } from "react-bootstrap";
import {Link} from 'react-router-dom';
import "../Styling/allAnime.css";

function AllAnime() {
  const [animeList, setAnimeList] = useState([]);
  const [searchAnime, setSearchAnime] = useState("");
  const [modalData, setModalData] = useState({});
  const [characterData, setCharacterData] = useState([]);
  const [score, setScore] = useState(0);
  const [review, setReview] = useState("");

  const token = JSON.parse(localStorage.getItem("Token"));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getAnime = async (animeTitle) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime?q=${animeTitle}&sfw&limit=14`
    ).then((res) => res.json());
    setAnimeList(temp.data);
  };

  const addReview = (anime) => {
    const url = "https://ps-animedia.herokuapp.com/users/postReview";
    const animeData = {
      title: anime.title,
      image: anime.images.jpg.image_url,
      reviewCount: 1,
      reviewSum: score,
      review: review,
    };
    axios
      .post(url, animeData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const addToFavourites = async (anime) => {
    const url = "https://ps-animedia.herokuapp.com/users/favourites";
    const data = { title: anime.title, img_url: anime.images.jpg.image_url };
    console.log(data);
    axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getCharactersById = async (id) => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/anime/${id}/characters`
    ).then((res) => res.json());
    const mains = temp.data.filter((character) => character.role === "Main");
    setCharacterData(mains);
  };

  const renderAnimeCard = (anime, index) => {
    return (
      <Card id="card" style={{ width: "11rem" }} key={index}>
        <Card.Img variant="top" src={anime.images.jpg.image_url} />
        <Card.Body>
          <Card.Title>
            <a href={anime.url} id="link" target="_blank" rel="noreferrer">
              {anime.title}
            </a>
          </Card.Title>
          <Button
            id="rateButton"
            variant="danger"
            onClick={() => {
              getCharactersById(anime.mal_id);
              setModalData(anime);
              handleShow();
            }}
          >
            Rate
          </Button>
        </Card.Body>
      </Card>
    );
  };

  return (
    <>
      <div className="allAnime">
        <Form.Control
          id="searchInput"
          value={searchAnime}
          onInput={(e) => setSearchAnime(e.target.value)}
          type="text"
          placeholder="Naruto..."
        />
        <Button
          onClick={() => getAnime(searchAnime)}
          id="searchButton"
          variant="danger"
        >
          Search
        </Button>
        <div className="animeList">{animeList.map(renderAnimeCard)}</div>
      </div>
      <Modal id="modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalData.synopsis}</Modal.Body>
        <marquee
          behavior="scroll"
          scrollamount="5"
          loop="infinite"
          direction="left"
        >
          <div className="characterWrapper">
            {characterData.map((character, id) => {
              return (
                <div className="characterCard" key={id}>
                  <Link to={`character/${character.character.mal_id}`}><img
                    className="charImg"
                    src={character.character.images.jpg.image_url}
                    alt="Main Characters"
                  ></img></Link>
                  {character.character.name}
                </div>
              );
            })}
          </div>
        </marquee>
        <Modal.Body>Episodes: {modalData.episodes}</Modal.Body>
        <Modal.Body>MyAnimeList Score: {modalData.score}</Modal.Body>

        <Modal.Body>Enter A Score Out Of 10:</Modal.Body>
        <Form.Control
          id="scoreInput"
          value={score}
          onInput={(e) => {
            setScore(e.target.value);
          }}
          type="text"
          placeholder="10"
        />

        <Modal.Body>Leave A Review:</Modal.Body>
        <Form.Control
          id="reviewInput"
          value={review}
          onInput={(e) => {
            setReview(e.target.value);
          }}
          type="text"
          placeholder={`${modalData.title} is amazing because...`}
        />

        <Modal.Footer>
          <Button
            id="favButton"
            onClick={() => {
              addToFavourites(modalData);
              handleClose();
            }}
            variant="danger"
          >
            Favourite
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              addReview(modalData);
              handleClose();
            }}
          >
            Rate
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AllAnime;
