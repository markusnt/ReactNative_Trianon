import React, { Component } from 'react'
import { createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './screens/Home'
import GrupoScreen from './screens/Grupos'
import LoginScreen from './screens/Login'
// Home:{
//     screen: HomeScreen
// },

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Grupo: GrupoScreen,
        Login: LoginScreen
    },
    {
        initialRouteName: 'Login',
        defaultNavigationOptions:{
            headerStyle: {
                backgroundColor: "#FFFFFF"
            },
        headerTintColor: '#AAA'
        }
})

export default createAppContainer(AppNavigator)