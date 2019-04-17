import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,SafeAreaView,TouchableOpacity
} from 'react-native'
import api from './services/api'

export default class Home extends Component {
    
    static navigationOptions = {
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
          <TouchableOpacity onPress={() => {}}> 
                <View style={styles.item}>
                
                    <Text style={styles.text}>{item.cd_mesa}</Text>
                    <Text style={styles.text}>{item.st_mesa}</Text>
                </View>
                 </TouchableOpacity>
        )

      render(){
    
        return(
            // <SafeAreaView>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={({id}, index) => id}
              renderItem={this.renderMesa}
              />
          // </SafeAreaView>
        );
      }
}

const styles = StyleSheet.create({
    item: {
      alignItems: "center",
      backgroundColor: "#dcda48",
      flexGrow: 1,
      margin: 4,
      padding: 20
    },
    text: {
      color: "#333333"
    }
  });

  //https://medium.com/@oieduardorabelo/react-native-criando-grids-com-flatlist-b4eb64e7dcd5
  //USAR ESSE LINK PARA fazer grid