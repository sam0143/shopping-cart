import { Button, ListGroup, Row, Col, Image,Form} from "react-bootstrap";
import { CartState } from "../context/Context";
import { useEffect, useState } from "react";
import Rating from "./Rating";
import { AiFillDelete } from "react-icons/ai"


const Cart = () => {
    const {
        state: { cart },
        dispatch,
    } = CartState()

    const [total, setTotal] = useState();

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
    }, [cart])
    
    return (
        <div className='home'>
            <div className='productContainer'>
                <ListGroup>
                    {cart.map((prod) => (
                        <ListGroup.Item  key={prod.id}>
                            <Row>
                                <Col md={2}><Image src={prod.avatar} alt={prod.name}  fluid rounded/></Col>
                                <Col md={2}>{prod.name}</Col>
                                <Col md={2}>${prod.price}</Col>
                                <Col md={2}><Rating rating={prod.rating} /></Col>
                                <Col md={2}> 
                                    <Form.Control 
                                        as='select' 
                                        value={prod.qty}
                                        onChange={(e)=>
                                            dispatch({
                                                type:"CHANGE_CART_QTY",
                                                payload:{
                                                    id:prod.id,
                                                    qty:e.target.value
                                                }
                                            })
                                        }
                                        >
                                        {[...Array(prod.inStock).keys()].map((x)=>(
                                            <option key={x+1}>{x+1}</option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button>
                                    <AiFillDelete 
                                            fontSize='20px'
                                            style = {{cursor : 'pointer'}}
                                            onClick={()=>{
                                                dispatch({
                                                    type : "REMOVE_FROM_CART",
                                                    payload:prod
                                                })
                                            }}
                                        />
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
            <div className='filters summary'>
                <span className="title">Subtotal ({cart.length}) items </span>
                <span style={{ fontWeight: 700, fontSize: 20 }}> Total : ${total}</span>
                <Button type='button' disable={cart.lenght === 0}>Proceed to Checkout</Button>
            </div>
        </div>
    )
}

export default Cart;