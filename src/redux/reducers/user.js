const initialState = {
  isLoading: false,
  isError: false,
  errorMsg: '',
  dataUser: [],
  pageInfo: []
}

const user = (state=initialState, action) => {
  switch(action.type){
    case 'GETUSER_PENDING': {
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    }
    case 'GETUSER_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMsg: action.payload.response.data.message,
      }
    }
    case 'GETUSER_FULFILLED': {
      return {
        ...state,
        isLoading: false,
        isError: false,
        dataUser: action.payload.data.data,
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

export default user