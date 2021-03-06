import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form,Button,Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {getUserDetails,updateUserProfile} from '../actions/userActions'

const ProfileScreen = ({location,history}) => {
    const dispatch=useDispatch()
    const userDetails=useSelector(state=>state.userDetails)
    const {loading,error,user} = userDetails
    const userLogin=useSelector(state=>state.userLogin)
    const {userInfo} = userLogin
    const userUpdateProfile=useSelector(state=>state.userUpdateProfile)
    const {success} = userUpdateProfile
    const [email,setEmail]=useState('')
    const [name,setName]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [message,setMessage]=useState(null)
    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        else{
            if(!user.name){
                dispatch(getUserDetails('profile'))
            }
            else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history,dispatch,user])
    const submitHandler=(e)=>{
        e.preventDefault()
        if(password!==confirmPassword){
            setMessage('Password do not match')
        }
        else{
             dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    
    }
    return (
            
            <Row className='py-3'>
                <Col md={3}>
                <h1>User Profile </h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={e=>setName(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={e=>setEmail(e.target.value)}></Form.Control></Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Password' value={password} onChange={e=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter Confirm Password' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Update
                </Button>
            </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                </Col>
            </Row>
    )
}

export default ProfileScreen
