import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet, TouchableOpacity
} from "react-native";
import { connect } from 'react-redux'
import { Button } from "react-native-elements";


export default class Pedido extends Component {

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

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');

        return (
            <View>
                <Text> Pedido Mesa {nr_mesa} </Text>
                <Text> 1x X-TUDO </Text>
                <Text> R$ 10.00 </Text>

                <Text> SubTotal: R$ 10.00 </Text>
                <Text> SEILAOQESCREVOAKI 10%: R$ 1.00 </Text>
                <Text> Total: R$ 11.00</Text>

                <TouchableOpacity style={styles.btnLogin}>
                    <Text style={styles.Text}>Enviar Pedido</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnLogin: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#17EE42',
        justifyContent: 'center',
        marginTop: 10
    },
});