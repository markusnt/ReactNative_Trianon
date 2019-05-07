import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.1.179:1337'
})

getMesasApi = async () => {
    this.setState({ loading: true })
    return await fetch(api + '/mesa')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          mesas: responseJson,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false })
      })
  }

export default api;