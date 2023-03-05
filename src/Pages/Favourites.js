import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import "../Styling/favourites.css";

function Favourites() {
  const renderAnimeCard = (anime, index) => {
    return (
      <Card id="card" style={{ width: "11rem" }} key={index}>
        <Card.Img variant="top" src={anime.img_url} />
        <Card.Body>
          <Card.Title id="title">{anime.title}</Card.Title>
        </Card.Body>
      </Card>
    );
  };

  let token = JSON.parse(localStorage.getItem("Token"));
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      const url = "http://localhost:3001/users/getFavourites";
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setFavourites(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getFavourites();
  },[]);

  return <div className="favourites">{favourites.map(renderAnimeCard)}</div>;
}

export default Favourites;
