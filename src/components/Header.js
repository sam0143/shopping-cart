import { Container, Navbar, Form, Dropdown, Nav, Badge, Button} from "react-bootstrap"
import { FaShoppingCart } from "react-icons/fa"
import {Link} from 'react-router-dom'
import { CartState } from "../context/Context"

const Header = () => {
   const {
     state : {cart},
     dispatch,
     productDispatch
    } =CartState()
    console.log(dispatch);
    
    return (
        <Navbar bg="dark" variant="dark" style={{ height: 80 }}>
            <Container>
                <Navbar.Brand>
                    <Link to='/'>Shopping Cart</Link>
                </Navbar.Brand>
                <Navbar.Text className="search">
                    <Form.Control
                        style={{ width: 400 }}
                        type="search"
                        placeholder="Search A Product"
                        className="m-auto"
                        aria-label="Search"
                        onChange={(e)=>
                            productDispatch ({
                                type:'FILTER_BY_SEARCH',
                                payload: e.target.value 
                            })
                        }

                    />
                </Navbar.Text>
                <Nav>
                    <Dropdown style={{marginRight : "50px"}}>
                        <Dropdown.Toggle variant="success">
                            <FaShoppingCart color="white" fontSize="20px" />
                            <Badge>{cart.length}</Badge>
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ minWidth: "370" }}>
                            {cart.length > 0 ? (
                                <>
                                {cart.map((prod)=>(
                                    <span id={prod.id} className='cartitems'>
                                        <img
                                            src={prod.avatar}
                                            alt={prod.name} 
                                            className='cartItemImg'
                                        />
                                        <div>
                                            <span>{prod.name}</span>
                                            <span>${prod.price.split('.')[0]}</span>
                                        </div>
                                      
                                    </span>
                                ))}
                                <Link to='/cart'>
                                    <Button style={{width : '90%' , margin: '0px 10px'}}>
                                        Go to Cart
                                    </Button>
                                </Link>
                                </>
                            ) : 
                            ( <span style={{ padding: 10}}>Cart is empty</span> )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header