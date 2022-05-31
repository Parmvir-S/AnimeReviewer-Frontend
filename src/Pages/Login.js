import { useState } from "react";
import { Card, ListGroup, ListGroupItem, Form, Button } from "react-bootstrap";
import SIGNUPIMG from "../Assets/Images/signuplogo.png";
import "../Styling/login.css";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginFunc = () => {
    const loginBody = { email: email, password: password };
    axios
      .post("https://ps-animedia.herokuapp.com/users/login", loginBody)
      .then((res) => {
        console.log(res);
        localStorage.setItem("Token", JSON.stringify(res.data.token));
        localStorage.setItem("User", JSON.stringify(res.data.user));
        window.location.replace("/topAnime");
      })
      .catch((e) => {
        alert("Unable To Login");
        console.log(e);
      });
  };

  return (
    <div className="login">
      <Card style={{ width: "28rem", textAlign: "center" }}>
        <Card.Img variant="top" src={SIGNUPIMG} />
        <Card.Body>
          <Card.Title>Login</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
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
        <Button onClick={loginFunc} variant="danger">
          Login
        </Button>
      </Card>
    </div>
  );
}

export default Login;
