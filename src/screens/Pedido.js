import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Dimensions, FlatList
} from "react-native";

import { connect } from 'react-redux'
import { Button } from "react-native-elements";
import cartItems from '../reducers/cartItems'
width = Dimensions.get('window').width

class Pedido extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            flex: 1
        },

        title: 'Pedido'
    };

    constructor() {
        super();
        this.state = {
            pedidos: []
        }
    }

    alteracaoEstadoMesa() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        this.props.navigation.navigate('Home')
        return fetch('http://192.168.1.179:1337/mesaAtendimento/' + nr_mesa, {
            method: 'PUT'
        })

    }

    renderProduto = ({ item, index }) => {

        return (
            <View style={styles.lista_pedido}>

                <Text style={{ fontSize: 18 }}> {this.props.cartItems.item} </Text>
                <Text style={{ fontSize: 18 }}> {this.props.cartItems.length} </Text>
                <Text style={{ fontSize: 18 }}> {item.ds_produto} </Text>
                <Text style={{ fontSize: 18 }}> {this.props.products} </Text>
                <Text style={{ fontSize: 18 }}> {cartItems.ds_produto} </Text>
                <Text style={{ fontSize: 18 }}> {item.products} </Text>
                <Text style={{ fontSize: 18 }}> {item.length} </Text>
                <Text style={{ fontSize: 18 }}> R$ 10.00 </Text>

            </View>


        )
    }

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');

        return (
            <View style={styles.container}>
                {this.props.cartItems.length > 0 ?
                    <View>
                        <View style={styles.titulo_mesa}>
                            <Text style={{ fontSize: 30 }}> Mesa {nr_mesa} </Text>
                        </View>


                        <FlatList
                            style={styles.itemList}
                            data={this.props.cartItems}
                            keyExtractor={({ id }, index) => 'id' + index}
                            renderItem={this.renderProduto}
                        />
                        {/* <FlatList 
                    renderItem = {this.props.cartItems} /> */}




                        <View style={styles.total_pedido}>
                            <Text style={{ fontSize: 18 }}> Total: R$ 10.00</Text>
                        </View>

                        <Text> Itens a serem pedidos: {this.props.cartItems.length} </Text>
                        <TouchableOpacity style={styles.btnLogin} onPress={() => this.alteracaoEstadoMesa()}>
                            <Text style={styles.Text}>Enviar Pedido </Text>
                        </TouchableOpacity>
                    </View>
                    : <Text>Sem Produtos a serem enviados</Text>
                }
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: (product) => dispatch({ type: 'REMOVE_FROM_CART', payload: product })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Pedido);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    titulo_mesa: {
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 30,
    },

    lista_pedido: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    subtotal_pedido: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 18,
        marginTop: 10,
    },

    extra: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
        fontSize: 18,
    },

    total_pedido: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 20,
        marginTop: 10,
    },

    btnLogin: {
        flexDirection: 'row',
        width: width,
        height: 45,
        backgroundColor: '#17EE42',
        justifyContent: 'center',
        marginTop: 15
    },

    Text: {
        fontSize: 30,
    }
});