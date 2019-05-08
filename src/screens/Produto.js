import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { connect } from 'react-redux'

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions,
} from 'react-native'

width = Dimensions.get('window').width
class Produto extends Component {

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
        return await fetch('http://192.168.1.179:1337/produtoS/' + cd_subgrupo) //cd_subgrupo
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    produtos: responseJson,
                });
            })
    }

    renderProduto = ({ item, index }) => {

        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.textStyle} onPress={this.props.addItemToCart}>
                    <Text style={styles.text}>{item.ds_produto}</Text>
                    <View style={styles.priceStyle}>
                        <Text style={styles.textPr}>R${item.pr_produto.toFixed(2)}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.itemList}
                    data={this.state.produtos}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderProduto}
                />

                <ActionButton buttonColor="#ED3237">
                    <ActionButton.Item buttonColor='#0d5151' title="Enviar Pedido" onPress={() => this.props.navigation.navigate('Pedido', {
                        nr_mesa: nr_mesa
                    })}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#0d5151' title="Solicitar Pre-Conta" onPress={() => this.props.navigation.navigate('PreConta', {
                        nr_mesa: nr_mesa
                    })}>
                        <Icon name="md-bookmarks" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                </ActionButton>

            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addItemToCart: (produt) => dispatch({ type: 'ADD_TO_CART', payload: produt })
    }
}

export default connect(null, mapDispatchToProps)(Produto);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    textoProduto: {
        flex: 1
    },
    icone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    textPr: {
        color: '#2e2f30',
        fontSize: 16,
    },
    textStyle: {
        width: width - 55,
        height: 45,
        borderRadius: 10,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: `#1fa3a3`,
        color: `#000`,
        marginHorizontal: 25,
        marginTop: 10
    },
    priceStyle: {
        backgroundColor: '#ddd',
        width: 88,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    fab: {
        marginBottom: 50
    },
});