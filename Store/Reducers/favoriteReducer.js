
const initialState = { favoritesFilm: [] }

function toggleFavorite(state = initialState, action) {
    let nextState

    switch(action.type){
        case 'TOOGLE_FAVORITE':
            const favoriteFilmIndex = state.favoritesFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1){
                // supression
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex )
                }
                console.log('if')
            }
            else {
                // ajouter
                nextState = {
                    ...state,
                    favoritesFilm: [ ...state.favoritesFilm, action.value ]
                }
                console.log('else')
            }
            return nextState || state //revoie state si nextState est undefined
        default:
            return state
    }
}

export default toggleFavorite
