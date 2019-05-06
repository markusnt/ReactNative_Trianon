import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/Home'
import GrupoScreen from './screens/Grupos'
import LoginScreen from './screens/Login'
import SubGrupoScreen from './screens/SubGrupo'
import ModalScreen from './screens/ModalExample'
import ProdutoScreen from './screens/Produto'
import PedidoScreen from './screens/Pedido'
import PreContaScreen from './screens/Pre_conta'
// Home:{
//     screen: HomeScreen
// },

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Grupo: GrupoScreen,
        SubGrupo: SubGrupoScreen,
        Produto: ProdutoScreen,
        Pedido: PedidoScreen,
        PreConta: PreContaScreen,
        Login: LoginScreen
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: "#25CBCB"
            },
        headerTintColor: '#FFF'
        }
})

export default createAppContainer(AppNavigator)