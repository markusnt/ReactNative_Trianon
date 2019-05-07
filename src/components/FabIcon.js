import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions
} from 'react-native'

export default class FabIcon extends Component {

    render() {
        
        return (
            <ActionButton buttonColor="#ED3237">
                <ActionButton.Item buttonColor='#25CBCB' title="Enviar Pedido" onPress={() => this.props.navigation.navigate('Pedido', {
                    nr_mesa: nr_mesa
                })}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#25CBCB' title="Solicitar Pre-Conta" onPress={() => this.props.navigation.navigate('PreConta', {
                    nr_mesa: nr_mesa
                })}>
                    <Icon name="md-bookmarks" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        )
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});