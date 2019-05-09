import React, { Component } from 'react'
import PropTypes from "prop-types";
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
    Dimensions, TouchableHighlight, Picker
} from 'react-native'

width = Dimensions.get('window').width
class Produto extends Component {

    static navigationOptions = {
        headerTitleStyle: {
            flex: 1
        },
        title: 'Produtos'
    };

    constructor(props) {
        super(props);
        this.state = {
            produtos: [],
            value: this.props.productQuantity,
            count: 0
        };
        this.increment = this.increment.bind(this);
    }

    componentDidMount() {

        this.getProdutosApi();
    }


    getProdutosApi = async () => {
        const { navigation } = this.props;
        const cd_subgrupo = navigation.getParam('cd_subgrupo', 'NO-ID');
        return await fetch('http://192.168.1.179:1337/produtoS/27') //cd_subgrupo
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    produtos: responseJson,
                });
            })
    }

    increment(e) {
        this.setState(
            prevState => ({
                value: Number(prevState.value) + 1
            }),
            function () {
                this.props.updateQuantity(this.state.value);
            }
        );
        e.preventDefault();
    }

    feed(e) {
        this.setState(
            {
                value: this.refs.feedQty.value
            },
            function () {
                this.props.updateQuantity(this.state.value);
            }
        );
    }

    so_vai = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    renderProduto = ({ item, index }) => {

        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.textStyle} onPress={this.props.addItemToCart}>
                    <Text style={styles.text}>{item.ds_produto}</Text>

                    <View style={styles.sideProd} >
                        <View style={styles.priceStyle}>
                            <Text style={styles.textPr}>R${item.pr_produto.toFixed(2)}</Text>
                        </View>
                        <View style={styles.itemCount}>
                            <Text style={styles.textPr} > {this.state.count} </Text>
                        </View>
                        <TouchableOpacity style={styles.DeleteItem}>
                            <Icon name="md-trash"
                                size={20} />
                        </TouchableOpacity>
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

Produto.propTypes = {
    value: PropTypes.number
};
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
        marginBottom: 15,
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
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
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
        backgroundColor: '#eee',
        width: 88,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    itemCount: {
        backgroundColor: '#eee',
        marginLeft: 10,
        width: 50,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    DeleteItem: {
        backgroundColor: '#fc7474',
        marginLeft: 10,
        width: 50,
        alignItems: 'center',
        marginTop: 3,
        borderRadius: 3
    },
    sideProd: {
        flexDirection: 'row'
    },
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

