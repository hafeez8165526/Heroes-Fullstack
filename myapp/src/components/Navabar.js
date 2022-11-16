import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  Dropdown,
  NavbarBrand,
  ModalHeader,
  Container,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";

function Navabar() {
  const nav = useNavigate();

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <Link to="/">Heroes</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/home">Home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/ShowHeroes" id="show-nav-tab">
                  Show Heroes
                </Link>
              </Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link className="pr-3  hover:text-orange-400 cursor-pointer">
              <AiOutlineShoppingCart
                size="35px" 
                onClick={() => {
                  nav(`/cart`);
                }}
              />
              
            </Nav.Link>
            <Nav.Link className=" hover:text-orange-400 cursor-pointer">
                <BiLogOutCircle
                  size="35px"
                  onClick={() => {
                    nav(`/${true}`);
                  }}
                />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navabar;
