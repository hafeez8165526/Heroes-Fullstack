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
import { GrMenu } from "react-icons/gr";

function Navabar() {
  const nav = useNavigate();

  return (
    <>
      <div className="drawer absolute top-0 ">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <div className="w-full navbar bg-base-300">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">ECOM</div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                <li>
                  <Link to="/home">Home</Link>
                </li>
                <li>
                  <Link to="/showProducts">Show Products</Link>
                </li>
                <li onClick={() => {
                nav(`/${true}`);
              }}>
                <Link>
                  <BiLogOutCircle
                    className=" hover:text-orange-400 cursor-pointer"
                    size="35px"
                    onClick={() => {
                      nav(`/${true}`);
                    }}
                  />
                </Link>
                </li>
                <li onClick={() => {
                nav(`/cart`);
              }}>
                <Link>
                  <AiOutlineShoppingCart
                    size="35px"
                    className="pr-3  hover:text-orange-400 cursor-pointer"
                    onClick={() => {
                      nav(`/cart`);
                    }}
                    />
                    </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/showProducts" id="show-nav-tab">
                Show Products
              </Link>
            </li>
            <li
              onClick={() => {
                nav(`/${true}`);
              }}
            >
              <Link>
                <BiLogOutCircle
                  className=" hover:text-orange-400 cursor-pointer"
                  size="35px"
                />
              </Link>
            </li>
            <li
              onClick={() => {
                nav(`/cart`);
              }}
            >
              <Link>
                <AiOutlineShoppingCart
                  size="35px"
                  className="pr-3  hover:text-orange-400 cursor-pointer"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <Navbar bg="dark" expand="lg" variant="dark" className="">
        <Container>
        <Navbar.Brand href="#home">
            <Link to="/">Heroes</Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link>
            
            <Link to="/ShowProducts" id="show-nav-tab">
            Show Products
            </Link>
            </Nav.Link>
            
            <Nav.Link>
            <Link to="/home">Home</Link>
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
            </Navbar>  */}
    </>
  );
}

export default Navabar;
