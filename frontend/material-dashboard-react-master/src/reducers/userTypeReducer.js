const userTypeReducer = (state = 'farmer', action) => {
    switch( action.type ) {
        case 'SET':
            state = action.data
            return state
        default:
            return state
    }
}

export default userTypeReducer