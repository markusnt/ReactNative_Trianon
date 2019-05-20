import React, { Component } from 'react'
import FabIcon from '../components/FabIcon';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';

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
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('SubGrupo', {
                cd_grupo: item.cd_grupo,
                nr_mesa: nr_mesa
            })} style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_grupo}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
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
            <View style={styles.container}>
                <FlatList
                    data={formatData(this.state.grupos, numColumns)}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderGrupo}
                    numColumns={numColumns}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        backgroundColor: '#1fa3a3',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});