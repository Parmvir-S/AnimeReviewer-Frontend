import axios from "axios";
import React from "react";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import "../Styling/profile.css";

function Profile() {
  let userData = localStorage.getItem("User");
  let parsedUserData = JSON.parse(userData);

  let token = JSON.parse(localStorage.getItem("Token"));

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");

  const updateName = () => {
    const data = { name: name };
    axios
      .patch("https://ps-animedia.herokuapp.com/users/profile", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let userDataLS = JSON.parse(localStorage.getItem("User"));
        userDataLS.name = name;
        localStorage.setItem("User", JSON.stringify(userDataLS));
        console.log("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="profile">
      <Container>
        <Row>
          <Col>
            <Card
              style={{
                width: "18rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "5%",
                textAlign: "center",
              }}
              id="cardImg"
            >
              <Card.Img
                variant="top"
                src={`https://avatars.dicebear.com/api/avataaars/${parsedUserData.name}.svg`}
              />
              <Card.Body>
                <Card.Title>{parsedUserData.name}</Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>Email: {parsedUserData.email}</ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button variant="danger" onClick={handleShow}>
                  Change Name
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please Enter Your Preferred Name Below:</Modal.Body>
        <Form.Control
          id="updateInput"
          value={name}
          onInput={(e) => setName(e.target.value)}
          type="text"
          placeholder="....."
        />
        <Modal.Footer>
          <Button variant="danger" onClick={()=>{
            updateName();
            handleClose();
            }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Profile;
