import React, { Component } from 'react'
import AppNavigator from './src/Routes'
import { createAppContainer } from 'react-navigation'

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component {
    render(){
        return <AppContainer />
    }
}