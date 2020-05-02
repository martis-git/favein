import React from 'react'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'
import './index.scss'

const Header = () => {
    const { current } = useSelector((state: IGlobalState) => state.auth)
    return (
        <Navbar
            className='header'
            expand="lg"
            variant="dark"
        >
            <Navbar.Brand href="/home">Favein</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/admin">Admin</Nav.Link>
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                    {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
                <a
                    href={`/users/${current.id}`}
                    className='text-white btn btn-outline-secondary'
                >
                    admin
                </a>
                {/* <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form> */}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
