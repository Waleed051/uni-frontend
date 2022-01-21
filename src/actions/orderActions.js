import axios from 'axios'
import * as actions from '../constants/orderConstants'

export const createOrder=(order)=>async (dispatch,getState)=>{
    try{
        dispatch({
            type:actions.ORDER_CREATE_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.post(`/api/orders`,order,config)
        dispatch({
            type:actions.ORDER_CREATE_SUCCESS,
            payload:data
        })
    }catch(err){
        dispatch({
            type:actions.ORDER_CREATE_FAIL,
            payload:err.response && err.response.data.message ? err.response.data.message:err.message,
        })
    }
}
export const getOrderDetails=(id)=>async (dispatch,getState)=>{
    try{
        dispatch({
            type:actions.ORDER_DETAILS_REQUEST
        })
        const {userLogin:{userInfo}}=getState()
        const config={
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        const {data}=await axios.get(`/api/orders/${id}`,config)
        dispatch({
            type:actions.ORDER_DETAILS_SUCCESS,
            payload:data
        })
    }catch(err){
        dispatch({
            type:actions.ORDER_DETAILS_FAIL,
            payload:err.response && err.response.data.message ? err.response.data.message:err.message,
        })
    }
}
