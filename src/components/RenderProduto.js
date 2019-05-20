import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions
} from 'react-native'

export default class RenderProduto extends Component {

    constructor(props) {
        super(props);
        this.state = {
            produtos: this.props.produtos,
        }
    }

    componentDidMount() {

        this.getProdutosApi();
    }

    getProdutosApi = async () => {
        const { navigation } = this.props;
        const cd_subgrupo = navigation.getParam('cd_subgrupo', 'NO-ID');
        return await fetch('http://192.168.1.179:1337/produtoS/19') //cd_subgrupo
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    produtos: responseJson,
                });
            })
    }

    render() {
        const { produtos } = this.props
        return (
            <View style={styles.item}>
                <TouchableOpacity style={styles.textStyle} onPress={this.props.addItemToCart}>
                    <Text style={styles.text}>{produtos.ds_produto}</Text>

                    <View style={styles.sideProd} >
                        <View style={styles.priceStyle}>
                            <Text style={styles.textPr}>R${produtos.pr_produto.toFixed(2)}</Text>
                        </View>
                        <View style={styles.itemCount}>
                            <Text style={styles.textPr} >  </Text>
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
}

const styles = StyleSheet.create({


})