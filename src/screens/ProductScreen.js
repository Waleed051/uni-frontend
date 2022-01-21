import React,{useEffect, useState} from 'react'
import { Row, Col, Card, Button, Image,ListGroup, Form} from 'react-bootstrap'
import { Link} from 'react-router-dom'
import { useDispatch,useSelector} from 'react-redux'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import products from '../products'
import { withRouter } from "react-router";
import {listProductDetails} from '../actions/productActions'

const ProductScreen = ({match, history}) => {
    const dispatch=useDispatch()

    const productDetailList=useSelector(state=>state.productDetailList)
    const {error,loading,product}=productDetailList

    const [qty, setQty]=useState(1)

    useEffect(()=>{
        dispatch(listProductDetails(match.params.id))
     },[dispatch,match]) 

     const addToCartHandler=()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)
     }
    // const product=products.find)(p=>p._id==match.params.id)
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
        </Link>
        {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating
                        text={`${product.numReviews} reviews`}
                        value={product.rating}
                        ></Rating>
                </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                </ListGroup.Item>
                    <ListGroup.Item>
                        Description: ${product.description}
                </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                <ListGroup variant='flush'>
                <ListGroup.Item>
                        <Row>
                            <Col>
                                Price:
                            </Col>
                            <Col>
                                <strong>${product.price}</strong>
                            </Col>
                        </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                        <Row>
                            <Col>
                                Status:
                            </Col>
                            <Col>
                                <strong>{product.countInStock>0?'In Stock':'Out of Stock'}</strong>
                            </Col>
                        </Row>
                </ListGroup.Item>
                {
                    product.countInStock>0 && (
                        <ListGroup.Item>
                        <Row>
                            <Col>
                                Qty:
                            </Col>
                            <Col>
                                <Form.Control as='select' value={qty} onChange={e=>{
                                    setQty(e.target.value)
                                }}>
                                    {[...Array(product.countInStock).keys()].map(e=>
                                    (
                                       <option key={e+1} value={e+1}>
                                           {e+1}
                                       </option> 
                                    )
                                    )}
                                </Form.Control>
                            </Col>
                        </Row>
                </ListGroup.Item>
                    )
                }
                <ListGroup.Item>
                        <Button onClick={addToCartHandler} className='btn-block' type='button' disabled={product.countInStock==0}>
                            Add to Cart
                        </Button>
                </ListGroup.Item>   
                </ListGroup>
                </Card>
            </Col>
        </Row>
}
        </>
    )
}

export default withRouter(ProductScreen)
