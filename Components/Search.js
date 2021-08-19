import React from 'react'
import { View, Button, TextInput, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component{

    constructor(props){
        super(props)
        this.page = 0
        this.totalPages = 0
        this.state = { 
            films: [],  
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {
            this.setState({ isLoading: true})//lancement du chargement
            console.log("avant-------------------------------"+this.page)
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => { //fonction peut etre longue a executer !!!
                this.page = data.page
                console.log("data-------------------------------"+data.page)
                this.totalPages = data.total_pages
                this.setState({
                    films: [ ...this.state.films, ...data.results ],// equivaut à : this.state.films.concat(data.results)
                    isLoading: false
                })
            })
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            )
             
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: [], //remise à 0 de la liste
        }, () =>{ // deuxieme paramètre de setState qui permet d'attendre que le premier soit fini
            this._loadFilms() 
        })
        
        
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render(){
        console.log(this.state.isLoading)
        return (
            <View style={{marginTop: 40, justifyContent: 'center', flex: 1}}>
                <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} placeholder="Titre du film" style={styles.Textinput}></TextInput>
                <Button title="Rechercher" onPress={() => this._searchFilms()} style={{ height: 50 }}></Button> 
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.4}//
                    onEndReached={() => {
                        if ( this.page < this.totalPages && this.state.isLoading == false) { //&& this.state.isLoading == false permet d'évité que le programme boucle et face plusieur fois la fonction car la fonction getFilmsFromApiWithSearchedText de _loadingFilms met du temps à s'exécuter
                            this._loadFilms()
                        }
                    }}
                    renderItem={({item}) => <FilmItem film={item}/>}//le rendu
                />
                {this._displayLoading()}
            </View>


        )// Deux syntaxe possible : () => {} est égale à function() {}
    }


}

const styles = StyleSheet.create({
    Textinput: {
        marginLeft: 5, 
        marginRight: 5, 
        height: 50, 
        borderColor: '#000000', 
        borderWidth: 1, 
        paddingLeft: 5
    },
    loading_container: {
        position: 'absolute',
        right: 0,
        left: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    }


})

export default Search