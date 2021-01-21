import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../reducers/userReducer";
import { Navbar, Nav } from "react-bootstrap";

const Menu = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const user = useSelector((state) => state.user);

  const padding = {
    paddingRight: 5,
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedBlogappUser");
    history.push("/");
    dispatch(clearUser());
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/blogs">
              home
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              users
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {props.user ? (
              <>
                <em>{props.user.name} logged in</em>

                <button id="logout" onClick={handleLogout}>
                  logout
                </button>
              </>
            ) : (
              <Link style={padding} to="/login">
                login
              </Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <div>
    //   <Link style={padding} to="/blogs">
    //     blogs
    //   </Link>
    //   <Link style={padding} to="/users">
    //     users
    //   </Link>
    //   {props.user ? (
    //     <>
    //       <em>{props.user.name} logged in</em>

    //       <button id="logout" onClick={handleLogout}>
    //         logout
    //       </button>
    //     </>
    //   ) : (
    //     <Link style={padding} to="/login">
    //       login
    //     </Link>
    //   )}
    // </div>
  );
};

export default Menu;
