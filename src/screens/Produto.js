import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import ActionButton from 'react-native-action-button';

import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions,
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
        return await fetch('http://192.168.1.179:1337/produtoS/' + cd_subgrupo)
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
                <View style={styles.textStyle}>
                    <Text style={styles.text}>{item.ds_produto}</Text>
                    <View style={styles.priceStyle}>
                        <Text style={styles.textPr}>R${item.pr_produto.toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.icone}>
                    <TouchableOpacity>
                        <Icon
                            name="remove-circle"
                            type='Ionicons'
                            size={30}
                            color='#aaa'
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}> 0 </Text>
                    <TouchableOpacity>
                        <Icon style={styles.text}
                            name='add-circle'
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
                <FlatList
                    data={this.state.produtos}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderProduto}
                />

                <ActionButton
                    position="center"
                    verticalOrientation="up"
                    buttonColor="#ED3237"
                    onPress={() => this.props.navigation.navigate('Pedido', {
                        nr_mesa: nr_mesa
                    })}
                > manuuurr</ActionButton> 
            </View>
        );
    }
}

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
        color: '#2e2f30',
        fontSize: 22,
    },
    textPr: {
        color: '#2e2f30',
        fontSize: 18,
    },
    textStyle: {
        flex: 2,
        justifyContent: 'center',
    },
    priceStyle: {
        backgroundColor: '#ddd',
        width: 88,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    fab: {
        marginBottom: 50
    }
});