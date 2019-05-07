import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Dimensions, FlatList
} from "react-native";

import { connect } from 'react-redux'
import { Button } from "react-native-elements";

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
            <View style={styles.item}>
                <View style={styles.textStyle}>
                    <Text style={styles.text}>{item.ds_produto}</Text>
                    <View style={styles.priceStyle}>
                        <Text style={styles.textPr}>R${item.pr_produto.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.icone}>
                    <TouchableOpacity>
                        <Icon
                            name="md-remove-circle"
                            type='Ionicons'
                            size={30}
                            color='#aaa'
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}> 0 </Text>
                    <TouchableOpacity>
                        <Icon
                            name='md-add-circle'
                            type='Ionicons'
                            size={30}
                            color='#aaa'
                        />
                    </TouchableOpacity>
                </View>


            </View>
        )
    }

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');

        return (
            <View style={styles.container}>
                <View style={styles.titulo_mesa}>
                    <Text style={{fontSize: 30}}> Mesa {nr_mesa} </Text>
                </View>

                <View style={styles.lista_pedido}>
                    <FlatList 
                    renderItem = {this.props.cartItems.product} />
                    <Text style={{fontSize: 18}}> R$ 10.00 </Text>
                    {this.props.cartItems.product}
                    {this.props.cartItems.cartItem}
                </View>

                <View style={styles.total_pedido}>
                    <Text style={{fontSize: 18}}> Total: R$ 10.00</Text>
                </View>

                <Text> Itens a serem pedidos: {this.props.cartItems.length} </Text>
                <TouchableOpacity style={styles.btnLogin} onPress={() => this.alteracaoEstadoMesa()}>
                    <Text style={styles.Text}>Enviar Pedido </Text>
                </TouchableOpacity>

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

    titulo_mesa:{
        flexDirection: 'row',
        justifyContent: 'center',
        fontSize: 30,
    },

    lista_pedido:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },

    subtotal_pedido:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        fontSize: 18,
        marginTop: 10,
    },

    extra:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomColor: '#ddd',
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

    Text:{
        fontSize: 30,
    }
});