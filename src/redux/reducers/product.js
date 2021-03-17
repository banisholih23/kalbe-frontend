const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataProduct: [],
  pageInfo: []
}

const product = (state=initialState, action) => {
  switch(action.type){
    case 'GETPRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETPRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETPRODUCT_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataProduct: action.payload.data.data,
        pageInfo: action.payload.data.pageInfo
      }
    }
    default: {
      return {
        ...state
      }
    }
  }
}

export default product