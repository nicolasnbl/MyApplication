import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'

class FilmDetail extends React.Component{

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.navigation.state.params.idFilm).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayFilm() {
        const film = this.state.film
        if(film != undefined) { //pour attendre car si on lance l'appli ca va crache car le film est pas encore récupéré
            return (
                <ScrollView style={styles.scrollview_container}>
                    <Image style={styles.image} source={{uri: getImageFromApi(film.backdrop_path)}} />
                    <Text style={styles.title}>{film.title}</Text>
                    <View style={styles.view_main}>
                        <Text style={styles.description_text}>{film.overview}</Text>
                        <View style={styles.view_footer}>
                            <Text style={styles.date, styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.note, styles.default_text}>Note : {film.vote_average} / 10 </Text>
                            <Text style={styles.nombre_de_vote, styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                            <Text style={styles.budget, styles.default_text}>Budget : {numeral(film.budget).format('0,0')} $ </Text>
                            <Text style={styles.genre, styles.default_text}>Genre(s) : {film.genres.map(function(genre){
                                    return genre.name;
                                }).join(" / ")} 
                            </Text>
                            <Text style={styles.compagnie, styles.default_text}>Compagnie(s) : {film.production_companies.map(function(compagnie){
                                    return compagnie.name;
                                }).join(" / ")}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }

    _displayLoading() { // un cercle de chargement
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
             
        }
    }

    render() {
        const idFilm = this.props.navigation.state.params.idFilm
        return (
            <View style={styles.main_container}>
                {this._displayFilm()}
                {this._displayLoading()}
            </View>
            
        )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    image: {
        flex: 1,
        height: 200,
        margin: 3
    },
    title: {
        flex: 1,
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        margin: 7
    },
    view_main: {
        flex: 1,
    },
    description_text: {
        margin: 5,
        fontSize: 14,
        fontStyle: 'italic',
        color: '#777777',
        
    },
    view_footer: {
        flex: 1,
        margin: 7
    },
    default_text: {
        fontSize: 14,
        fontWeight: 'bold',
        margin: 2
    },
    loading_container: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollview_container: {
        flex: 1
    }
})

export default FilmDetail