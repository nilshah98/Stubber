const languageReducer = (state = 'en', action) => {
    console.log(state)
    switch( action.type ) {
        case 'CHANGE':
            return action.data
        default:
            return state
    }
}

export const changeLanguage = (lng) => {
    return {
        type: 'CHANGE',
        data: lng
    }
}

export default languageReducer