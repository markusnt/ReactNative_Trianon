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
          dataSource: responseJson,
        });
      })
  }


  renderMesa = ({ item }) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('Grupo')} style={styles.item}>
      <View >
      <Text style={styles.text}>{item.cd_mesa}</Text>
      </View>
    </TouchableOpacity>
  )

  // formatData = (dataSource, numColumns) => {
  //   const numberOfFullRows = Math.floor(dataSource.length / numColumns);
  
  //   let numberOfElementsLastRow = dataSource.length - (numberOfFullRows * numColumns);
  //   while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
  //     dataSource.push({ cd_mesa: `blank-${numberOfElementsLastRow}`, empty: true });
  //     numberOfElementsLastRow++;
  //   }
  
  //   return dataSource;
  // };
  
  render() {
    const numRow = 7
    return (
     <SafeAreaView> 
      <FlatList
        data={this.state.dataSource}
        style={styles.container}
        keyExtractor={({ id }, index) => 'id' + index}
        renderItem={this.renderMesa}
        numColumns={numRow}
      />
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#4D243D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    margin: 1.70,
    height: 55,
    width: 55,
    borderRadius: 5
  },
  text: {
    color: '#fff',
  }
});

  //https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
  //USAR ESSE LINK PARA fazer grid