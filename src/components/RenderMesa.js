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

export default class RenderMesa extends Component {

    constructor(props) {
        super(props);
        this.state = {
          mesas: this.props.mesas,
        }
      }

    renderMesa = ({ item, index }) => {
        if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
        if (item.st_mesa === "atendimento") {
            return <TouchableOpacity onPress={() => this.props.navigation.navigate('Grupo', {
                nr_mesa: item.nr_mesa
            })} style={[styles.item, styles.mesaAtendimento]}>
                <View >
                    <Text style={styles.textMesaAtendimento}>{item.cd_mesa}</Text>
                </View>
            </TouchableOpacity>
        }
        if (item.st_mesa === "pre-conta") {
            return <TouchableOpacity onPress={() => this.props.navigation.navigate('Grupo', {
                nr_mesa: item.nr_mesa
            })} style={[styles.item, styles.mesaPreConta]}>
                <View >
                    <Text style={styles.text}>{item.cd_mesa}</Text>
                </View>
            </TouchableOpacity>
        }
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Grupo', {
                nr_mesa: item.nr_mesa
            })} style={styles.item}>
                <View >
                    <Text style={styles.text}>{item.cd_mesa}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {

        const numColumns = 4

        const formatData = (mesas, numColumns) => {
            const numberOfFullRows = Math.floor(mesas.length / numColumns);

            let numberOfElementsLastRow = mesas.length - (numberOfFullRows * numColumns);
            while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
                mesas.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
                numberOfElementsLastRow++;
            }

            return mesas;
        };

        return (
            <FlatList
                data={formatData(this.state.mesas, numColumns)}
                style={styles.container}
                keyExtractor={({ id }, index) => 'id' + index}
                renderItem={this.renderMesa}
                numColumns={numColumns}
                refreshing={this.state.refreshing}
                onRefresh={this.handleRefresh}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#1dff00',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        margin: 1.70,
        height: 85,
        borderRadius: 5
    },

    itemInvisible: {
        backgroundColor: 'transparent'
    },

    mesaAtendimento: {
        backgroundColor: '#ff0000'
    },

    mesaPreConta: {
        backgroundColor: '#f2ff00'
    },

    text: {
        fontSize: 30,
        color: '#000000',
    },

    textMesaAtendimento: {
        fontSize: 30,
        color: '#FFF',
    }
});