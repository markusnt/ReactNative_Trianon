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

export default class SubGrupo extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            flex: 1
        },
        title: 'SubGrupos'
    };

    constructor() {
        super();
        this.state = {
            subgrupos: []
        }
    }

    componentDidMount() {
        this.getSubGruposApi();
    }


    getSubGruposApi = async () => {
        const { navigation } = this.props;
        const cd_grupo = navigation.getParam('cd_grupo', 'NO-ID');

        return await fetch('http://192.168.1.179:1337/subgrupoS/' + cd_grupo)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    subgrupos: responseJson,
                });
            })
    }

    renderSubGrupo = ({ item, index }) => {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Produto', {
                cd_subgrupo: item.cd_subgrupo,
                nr_mesa: nr_mesa
            })} style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_subgrupo}</Text>

                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { navigation } = this.props;
        const nr_mesa = navigation.getParam('nr_mesa', 'NO-ID');
        const numColumns = 2

        const formatData = (subgrupos, numColumns) => {
            const numberOfFullRows = Math.floor(subgrupos.length / numColumns);

            let numberOfElementsLastRow = subgrupos.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                subgrupos.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }

            return subgrupos;
        };

        return (
            <View style={styles.container}>

                <FlatList
                    data={formatData(this.state.subgrupos, numColumns)}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderSubGrupo}
                    numColumns={numColumns}
                />

                <ActionButton buttonColor="#ED3237">
                    <ActionButton.Item buttonColor='#9b59b6' title="Pedidos" onPress={() => this.props.navigation.navigate('Pedido', {
                        nr_mesa: nr_mesa
                    })}>
                        <Icon name="md-create" style={styles.actionButtonIcon} />
                    </ActionButton.Item>
                    <ActionButton.Item buttonColor='#3498db' title="Solicitar Pre-Conta" onPress={() => this.props.navigation.navigate('PreConta', {
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
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});