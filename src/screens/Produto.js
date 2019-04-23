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

export default class Produto extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            flex: 1
        },
        title: 'Produto'
    };

    constructor() {
        super();
        this.state = {
            produtos: []
        }
    }

    componentDidMount() {
        this.getGruposApi();
    }

    getGruposApi = async () => {
        return await fetch('http://192.168.1.179:1337/produto')
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    produtos: responseJson,
                });
            })
    }

    renderGrupo = ({ item, index }) => {
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        return (
            <TouchableOpacity style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_produto}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const numColumns = 2

        const formatData = (produtos, numColumns) => {
            const numberOfFullRows = Math.floor(produtos.length / numColumns);

            let numberOfElementsLastRow = produtos.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                produtos.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }

            return produtos;
        };

        return (
            <SafeAreaView>
                <FlatList
                    data={formatData(this.state.produtos, numColumns)}
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