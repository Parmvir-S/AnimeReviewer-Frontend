import { Navbar, Nav, Container, Button, Image } from "react-bootstrap";
import "../Styling/navibar.css";
import APPLOGO from "../Assets/Images/applogo.png";

function Navibar() {
  let isLoggedIn = JSON.parse(localStorage.getItem("Token")) !== null ? true : false;

  const signoutFunc = () => {
    localStorage.clear();
    isLoggedIn = false;
    window.location.replace("/login");
  };

  return (
    <div className="navibar">
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand id="aniMedia" href="/"><img
            id="logoimg"
            src={APPLOGO}
          /></Navbar.Brand>
          <Nav className="me-auto">
            {!isLoggedIn ? (
              <>
                <Nav.Link href="/signup">Signup</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/topAnime">Top</Nav.Link>
                <Nav.Link href="/allAnime">All</Nav.Link>
                <Nav.Link href="/favourites">Favourites</Nav.Link>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Button
                  onClick={signoutFunc}
                  id="signoutButton"
                  variant="danger"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navibar;
