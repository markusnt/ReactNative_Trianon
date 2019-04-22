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
                    grupos: responseJson,
                });
            })
    }

    renderGrupo = ({ item, index }) => {
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        return (
            <TouchableOpacity onPress={() => { }} style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_grupo}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const numColumns = 2

        const formatData = (grupos, numColumns) => {
            const numberOfFullRows = Math.floor(grupos.length / numColumns);

            let numberOfElementsLastRow = grupos.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                grupos.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }

            return grupos;
        };

        return (
            <SafeAreaView>
                <FlatList
                    data={formatData(this.state.grupos, numColumns)}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderGrupo}
                    numColumns={numColumns}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#0080FF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4,
        margin: 1.70,
        height: 85,
        width: 55,
        borderRadius: 5
    },
    itemInvisible: {
        backgroundColor: 'transparent'
    },
    text: {
        fontSize: 25,
        color: '#FFF',
    }
});