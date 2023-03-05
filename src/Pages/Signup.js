import { useState } from "react";
import { Card, ListGroup, ListGroupItem, Form, Button } from "react-bootstrap";
import "../Styling/signup.css";
import SIGNUPIMG from "../Assets/Images/signuplogo.png";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUpFunc = () => {
    const signupBody = { name: name, email: email, password: password };
    axios
      .post("http://localhost:3001/users", signupBody)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", JSON.stringify(res.data.token));
        localStorage.setItem("User", JSON.stringify(res.data.user));
        window.location.replace("/topAnime");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="signup">
      <Card style={{ width: "28rem", textAlign: "center" }}>
        <Card.Img variant="top" src={SIGNUPIMG} />
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Name:</ListGroupItem>
          <Form.Control
            value={name}
            onInput={(e) => setName(e.target.value)}
            type="text"
            placeholder="Naruto Uzumaki"
          />
          <ListGroupItem>Email:</ListGroupItem>
          <Form.Control
            value={email}
            onInput={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Akatsuki@gmail.com"
          />
          <ListGroupItem>Password:</ListGroupItem>
          <Form.Control
            value={password}
            onInput={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Konoha106"
          />
        </ListGroup>
        <Button onClick={signUpFunc} variant="danger">
          Signup
        </Button>
      </Card>
    </div>
  );
}

export default Signup;
