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
                            name="md-remove-circle"
                            type='Ionicons'
                            size={30}
                            color='#aaa'
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}> 0 </Text>
                    <TouchableOpacity onPress={this.props.addItemToCart}>
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
                <FlatList
                    data={this.state.produtos}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderProduto}
                />


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
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
    fab: {
        marginBottom: 50
    }
});