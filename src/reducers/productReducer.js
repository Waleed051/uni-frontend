import * as actions from '../constants/productConstants'
export const productReducer=(state={products:[]},action)=>{
    switch(action.type){
        case actions.PRODUCT_LIST_REQUEST:
            return {loading:true,products:[]}
        case actions.PRODUCT_LIST_SUCCESS:
            return {loading:false,products:action.payload}
        case actions.PRODUCT_LIST_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}

export const productDetailsReducer=(state={product:{reviews:[]}},action)=>{
    switch(action.type){
        case actions.PRODUCT_DETAIL_REQUEST:
            return {loading:true,...state}
        case actions.PRODUCT_DETAIL_SUCCESS:
            return {loading:false,product:action.payload}
        case actions.PRODUCT_DETAIL_FAIL:
            return {loading:false,error:action.payload}
        default:
            return state
    }
}