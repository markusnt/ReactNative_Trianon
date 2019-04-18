import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList, SafeAreaView, TouchableOpacity,
    Dimensions,
    TextInput
} from 'react-native'

width = Dimensions.get('window').width

export default class Login extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super()
        this.state = {
            usuario: '',
            senha: '',
            mensagem: ''
        }
    }

    render() {
    return (
        <View style={styles.container}>

                <Text style={styles.titulo}> LOGIN </Text>

                <View style={styles.form}>

                    <TextInput style={styles.input}
                        placeholder="Usuario..."
                        onChangeText={texto => this.setState({ usuario: texto })}
                        autoCapitalize="none" />

                    <TextInput style={styles.input}
                        placeholder="Senha..."
                        onChangeText={texto => this.setState({ senha: texto })}
                        secureTextEntry={true} />

                    <Button title='ENTRAR' color="#0080FF"
                         onPress={() => this.props.navigation.navigate('Home')}/>

                </View>

                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </View>
    )
}

}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
},

titulo: {
    fontWeight: 'bold',
    fontSize: 26
},

form: {
    width: width * 0.8
},

input: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
},

mensagem: {
    marginTop: 15,
    color: '#e74c3c'
},
})