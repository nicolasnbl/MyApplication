import React from 'react'
import { View, Button, TextInput, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Seach extends React.Component{

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
            getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                this.page = data.page
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

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render(){
        console.log(this.state.isLoading)
        return (
            <View style={{marginTop: 40, justifyContent: 'center', flex: 1}}>
                <TextInput onSubmitEditing={() => this._loadFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} placeholder="Titre du film" style={styles.Textinput}></TextInput>
                <Button title="Rechercher" onPress={() => this._loadFilms()} style={{ height: 50}}></Button> 
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReachedThreshold={0.5}//
                    onEndReached={() => {
                        if ( this.page < this.totalPages ) {
                            this._loadFilms()
                           
                            console.log('TEST IF')
                        }
                        console.log('onEndReached') 
                        console.log(this.page)
                        console.log(this.totalPages)
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

export default Seach