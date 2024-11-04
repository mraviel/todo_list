import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


import Logo from './Logo';

export default function PageNavbar() {
    return (
        <>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Navbar.Brand href="#Home"><Logo /></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#Home">Home</Nav.Link>
                <Nav.Link href="#About">About</Nav.Link>
                <Nav.Link href="#Pricing">Pricing</Nav.Link>
                <Nav.Link href="#Login">Login</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
    )
}