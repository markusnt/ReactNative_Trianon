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
        return await fetch('http://192.168.1.179:1337/grupoW/'+cd_grupo)
            .then((response) => response.json())
            .then((responseJson) => {

                this.setState({
                    subgrupos: responseJson,
                });
            })
    }

    renderSubGrupo = ({ item, index }) => {
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Produto', {
                cd_subgrupo: item.cd_subgrupo
            })} style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.ds_subgrupo}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
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
            <SafeAreaView>
                <FlatList
                    data={formatData(this.state.subgrupos, numColumns)}
                    style={styles.container}
                    keyExtractor={({ id }, index) => 'id' + index}
                    renderItem={this.renderSubGrupo}
                    numColumns={numColumns}
                />
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
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
    }
});