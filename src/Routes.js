import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/Home'
import GrupoScreen from './screens/Grupos'
import LoginScreen from './screens/Login'
import SubGrupoScreen from './screens/SubGrupo'
import ModalScreen from './screens/ModalExample'
import ProdutoScreen from './screens/Produto'
// Home:{
//     screen: HomeScreen
// },

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Grupo: GrupoScreen,
        SubGrupo: SubGrupoScreen,
        Produto: ProdutoScreen,
        Modal: ModalScreen,
        Login: LoginScreen
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: "#eceff1"
            },
        headerTintColor: '#000000'
        }
})

export default createAppContainer(AppNavigator)