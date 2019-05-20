import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './pages/Home'
import GrupoScreen from './pages/Grupos'
import LoginScreen from './pages/Login'
import SubGrupoScreen from './pages/SubGrupo'
import ModalScreen from './pages/ModalExample'
import ProdutoScreen from './pages/Produto'
import PedidoScreen from './pages/Pedido'
import PreContaScreen from './pages/Pre_conta'
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
        initialRouteName: 'Produto',
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: "#25CBCB"
            },
        headerTintColor: '#FFF'
        }
})

    export default createAppContainer(AppNavigator)