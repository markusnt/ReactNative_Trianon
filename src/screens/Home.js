import React, { Component } from 'react'
import { FloatingAction } from 'react-native-floating-action';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList, SafeAreaView, TouchableOpacity,
  Dimensions
} from 'react-native'
import api from '../services/api'

export default class Home extends Component {

  static navigationOptions = {
    headerTitleStyle: {

    },
    title: 'Mesas'
  };

  constructor() {
    super();
    this.state = {
      mesas: []
    }
  }

  componentDidMount() {
    this.getMesasApi();
  }

  getMesasApi = async () => {
    return await fetch('http://192.168.1.179:1337/mesa')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          mesas: responseJson,
        });
      })
  }


  renderMesa = ({ item, index }) => {
    if (item.empty === true) { return <View style={[styles.item, styles.itemInvisible]} /> }
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Grupo')} style={styles.item}>
        <View >
          <Text style={styles.text}>{item.cd_mesa}</Text>
        </View>
      </TouchableOpacity>
      
    )
    
  }

  render() {

    const numColumns = 7

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
      />
      
      
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#90a4ae',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    margin: 1.70,
    height: 55,
    width: 55,
    borderRadius: 5
  },
  itemInvisible: {
    backgroundColor: 'transparent'
  },
  text: {
    color: '#000000',
  }
});

  //https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
  //USAR ESSE LINK PARA fazer grid