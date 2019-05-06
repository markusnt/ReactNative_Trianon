import React, { Component } from 'react'
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    ImageBackground,
    Image
} from 'react-native'

width = Dimensions.get('window').width
import bgImage from '../../img/background.jpeg'
import logo from '../../img/logo.jpeg'

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

            <ImageBackground source={bgImage} style={styles.container}>

                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.titulo}>Trianon</Text>


                <View>

                    <TextInput style={styles.input}
                        placeholder="Usuario..."
                        placeholderTextColor={`rgba(255, 255, 255, 0.7)`}
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.setState({ usuario: texto })}
                        autoCapitalize="none" />
                </View>
                <View>
                    <TextInput style={styles.input}
                        placeholder="Senha..."
                        placeholderTextColor={`rgba(255, 255, 255, 0.7)`}
                        underlineColorAndroid='transparent'
                        onChangeText={texto => this.setState({ senha: texto })}
                        secureTextEntry={true} />
                </View>
                {/* <Button title='ENTRAR' color="#0080FF"
        onPress={() => this.props.navigation.navigate('Home')} /> */}

                <TouchableOpacity style={styles.btnLogin} onPress={() => this.props.navigation.navigate('Home')}>
                    <Text style={styles.Text}>Login</Text>
                </TouchableOpacity>



                <Text style={styles.mensagem}>
                    {this.state.mensagem}
                </Text>
            </ImageBackground >
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo: {
        width: 100,
        height: 160,
        marginTop: -90
    },

    titulo: {
        color: "#B0B0B0",
        fontSize: 40,
        marginTop: 50,
        fontWeight: '500',
    },

    input: {
        width: width - 55,
        height: 45,
        borderRadius: 25,
        fontSize: 16,
        paddingLeft: 45,
        backgroundColor: `rgba(0, 0, 0, 0.35)`,
        color: `#fff`,
        marginHorizontal: 25,
        marginTop: 10
    },

    btnLogin:{
        width: width - 55,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#ED3237',
        justifyContent: 'center',
        marginTop: 10
    },

    Text:{
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    }

})