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
        title: 'Produtos'
    };

    constructor() {
        super();
        this.state = {
            produtos: []
        }
    }

    componentDidMount() {
        this.getProdutosApi();
    }


    getProdutosApi = async () => {
        const { navigation } = this.props;
        const cd_subgrupo = navigation.getParam('cd_subgrupo', 'NO-ID');
        return await fetch('http://192.168.1.179:1337/subgrupoW/'+ cd_subgrupo)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    produtos: responseJson,
                });
            })
    }

    renderProduto = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_produto}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        return (
                <FlatList
                    data={this.state.produtos}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderProduto}
                />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        marginTop: 4,
    },
    text: {
        fontSize: 25,
    }
});