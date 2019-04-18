import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions
} from 'react-native'

export default class Grupo extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            flex: 1
        },
        title: 'Grupos'
    };

    constructor() {
        super();
        this.state = {
          grupos: []
        }
      }

    componentDidMount() {
        this.getGruposApi();
    }

    getGruposApi = async () => {
        return await fetch('http://192.168.1.179:1337/grupo')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    dataSource: responseJson,
                });
            })
    }

    renderGrupo = ({ item }) => (
        <TouchableOpacity onPress={() => { }} style={styles.item}>
            <View >
                <Text style={styles.text}>{item.ds_grupo}</Text>
            </View>
        </TouchableOpacity>
    )

    render() {
        const numRow = 2
        return (
            <SafeAreaView>
                <FlatList
                    data={this.state.dataSource}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderGrupo}
                    numColumns={numRow}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
      flex: 1,
      backgroundColor: '#4D243D',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 4,
      margin: 1.70,
      height: 55,
      width: 55,
      borderRadius: 5
    },
    text: {
      color: '#fff',
    }
  });