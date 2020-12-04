import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../reducers/userReducer";
import { Nav, Navbar, Button } from "react-bootstrap";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);

  const padding = {
    paddingRight: 5,
  };

  if (!user) return null;

  return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding}>
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
          </Nav.Link>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          Signed in as: <a href="#">{user.name}</a>
          <Button
              style={{marginLeft: '10px'}}
              onClick={() => {
                history.push("/");
                return dispatch(logOut());
              }}
            >
              logout
            </Button>
        </Navbar.Text>
      </Navbar.Collapse>
      </Navbar>
  );
};

export default NavBar;
