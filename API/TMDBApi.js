const API_TOKEN = "ddca74edbdf27f8e195fd6e5ae96f8cd" //clé API

export function getFilmsFromApiWithSearchedText(text, page){
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page
    return fetch(url)
        .then((response) => response.json()) //dans le cas ou ça c'est bien passé
        .catch((error) => console.log(error)) // dans le cas où il y a une erreur
}

export function getImageFromApi(name){
    return 'https://image.tmdb.org/t/p/w300' + name
}