import React from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component{
    render() {
        const film = this.props.film;
        return(
            <View style={styles.main_container}>
                <Image source={{uri: getImageFromApi(film.poster_path)}} style={styles.image}/>
                <View style={styles.view_content}> 
                    <View style={styles.view_header}>
                        <Text style={styles.title_text}>{film.title}</Text>
                        <Text style={styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <Text style={styles.description_text} numberOfLines={6}>{film.overview}</Text>
                    <Text style={styles.date_text}>Sorti le {film.release_date}</Text>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    main_container:{
        height: 190,
        flex: 1,

        flexDirection: 'row'
    },
    image: {
        flex: 1,
        width: 120,
        backgroundColor: 'grey',
        margin: 3
    },
    view_content: {

        flex: 2,
        flexDirection: 'column',
    },
    view_header: {

        flexDirection: 'row',
    },
    title_text: {

        flex: 1,
        fontSize: 20,
        flexWrap: 'wrap', // permet de revenir à la ligne
        textAlign: 'left',
        padding: 5,
    },
    vote_text: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: 5
    },
    description_text: {
        flex: 1,
        fontSize: 15,
        fontStyle: 'italic',
        color: 'gray',
        padding: 5,
    },
    date_text: {
        fontSize: 14,
        textAlign: 'right',
        padding: 5
    }

})

export default FilmItem