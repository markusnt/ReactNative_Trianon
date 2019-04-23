import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
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
        return await fetch('http://192.168.1.179:1337/subgrupoW/' + cd_subgrupo)
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
                <View style={styles.textoProduto}>
                    <Text style={styles.text}>{item.ds_produto}</Text>
                </View>

                <View style={styles.icone}>
                    <TouchableOpacity>
                        <Icon style={styles.text}
                            name='remove-circle'
                            type='material'
                        />
                    </TouchableOpacity>
                    <Text style={styles.text}> 0 </Text>
                    <TouchableOpacity>
                        <Icon style={styles.text}
                            name='add-circle'
                            type='material'
                        />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {

        return (
            <FlatList
                data={this.state.produtos}
                style={styles.container}
                keyExtractor={({ id }, index) => 'id' + index}
                renderItem={this.renderProduto}
            />
        );
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    textoProduto: {
        flex: 1
    },
    icone: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 25,
    }
});