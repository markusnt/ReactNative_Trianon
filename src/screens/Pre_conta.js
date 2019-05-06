import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity, Dimensions
} from "react-native";

import { connect } from 'react-redux'
import { Button } from "react-native-elements";

width = Dimensions.get('window').width

export default class Pedido extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            flex: 1
        },

        title: 'Pre Conta'
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
        return fetch('http://192.168.1.179:1337/mesaPreConta/' + nr_mesa, {
            method: 'PUT'
        })

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
                    <Text style={{fontSize: 18}}> 1x X-TUDO </Text>
                    <Text style={{fontSize: 18}}> R$ 10.00 </Text>
                </View>

                <View style={styles.subtotal_pedido}>
                    <Text style={{fontSize: 18}}> SubTotal: </Text>
                    <Text style={{fontSize: 18}}> R$ 10.00 </Text>
                </View>

                <View style={styles.extra}>
                    <Text style={{fontSize: 18}}> SEI LA TARIFAS EXTRAS ? 10%: </Text>
                    <Text style={{fontSize: 18}}> R$ 1.00 </Text>
                </View>

                <View style={styles.total_pedido}>
                    <Text style={{fontSize: 18}}> Total: R$ 11.00</Text>
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={() => this.alteracaoEstadoMesa()}>
                    <Text style={styles.Text}>Solicitar Pre Conta</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

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