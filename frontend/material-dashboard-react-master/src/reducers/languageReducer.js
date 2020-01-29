const languageReducer = (state = 'en', action) => {
    switch( action.type ) {
        case 'CHANGE':
            state = action.data
            return state
        default:
            return state
    }
}

export default languageReducer