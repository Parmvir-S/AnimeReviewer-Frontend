import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';
import { Card, ListGroup, Tabs, Tab } from "react-bootstrap";
import "../Styling/characterPage.css";

function CharacterPage() {
    const [characterData, setCharacterData] = useState({});
    const params = useParams();

    useEffect(() => {
        const getCharacterDataById = async () => {
            const temp = await fetch(
                `https://api.jikan.moe/v4/characters/${params.id}/full`
              ).then((res) => res.json());
            setCharacterData(temp.data);
        }
        getCharacterDataById();
    }, [])

    function NewlineText(props) {
        const text = props.text;
        return text?.split('\n').map(str => <p>{str}</p>);
      }
    
      const renderAnimeCard = (anime, index) => {
        return (
          <Card id="card" style={{ width: "11rem" }} key={index}>
            <Card.Img variant="top" src={anime.anime.images.jpg.image_url} />
            <Card.Body>
              <Card.Title id="title">{anime.anime.title}</Card.Title>
            </Card.Body>
          </Card>
        );
      };
      
    return (
        <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
            <Card style={{ width: '15rem', marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            <Card.Img variant="top" src={characterData?.images?.jpg?.image_url}/>
            <Card.Body>
                <Card.Title>{characterData?.name}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Kanji Name: {characterData?.name_kanji}</ListGroup.Item>
                <ListGroup.Item>Nickname: {characterData?.nicknames?.[0] ? characterData?.nicknames?.[0] : "None"}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href={`${characterData?.url}`}>More Info</Card.Link>
            </Card.Body>
            </Card>
        </Tab>
        <Tab eventKey="info" title="Info">
            <NewlineText text={characterData?.about} />
        </Tab>
        <Tab eventKey="anime" title="Anime">
            <div className="topAnime">
            {characterData.anime?.map(renderAnimeCard)}  
            </div>
        </Tab>
      </Tabs>
      );
}

export default CharacterPage