import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import CoinView from './src/components/CoinView'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      btcTicker: {},
      ethTicker: {},
      etcTicker: {},
      ltcTicker: {},
      bchTicker: {},
      btgTicker: {}
    };

    this.timer = 0;
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.fetchData();
    }, 10000);
    this.fetchData();
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  fetchData () {
    fetch('https://vip.bitcoin.co.id/api/btc_idr/ticker')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        btcTicker: json.ticker
      })
    });

    fetch('https://vip.bitcoin.co.id/api/eth_idr/ticker')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        ethTicker: json.ticker
      })
    });

    fetch('https://vip.bitcoin.co.id/api/etc_idr/ticker')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        etcTicker: json.ticker
      })
    });

    fetch('https://vip.bitcoin.co.id/api/ltc_idr/ticker')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        ltcTicker: json.ticker
      })
    });

    fetch('https://vip.bitcoin.co.id/api/bch_idr/ticker')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        bchTicker: json.ticker
      })
    });

    fetch('https://vip.bitcoin.co.id/api/btg_idr/ticker')
    .then(res => res.json())
    .then(json => {
      console.log(json)
      this.setState({
        btgTicker: json.ticker
      })
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.whiteText}>VIP Bitcoin.co.id</Text>
        <ScrollView contentContainerStyle={{
          width: '100%',
          backgroundColor: 'darkgray',
          flexDirection: 'row',
          flexWrap: 'wrap'
        }} style={{
          width: '100%',
          marginTop: 10
        }}>
          <CoinView volLabel='btc' label='BTC/IDR' ticker={this.state.btcTicker} />
          <CoinView volLabel='eth' label='ETH/IDR' ticker={this.state.ethTicker} />
          <CoinView volLabel='etc' label='ETC/IDR' ticker={this.state.etcTicker} />
          <CoinView volLabel='ltc' label='LTC/IDR' ticker={this.state.ltcTicker} />
          <CoinView volLabel='bch' label='BCH/IDR' ticker={this.state.bchTicker} />
          <CoinView volLabel='btg' label='BTG/IDR' ticker={this.state.btgTicker} />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  whiteText: {
    color: 'white'
  },
  container: {
    flex: 1,
    marginTop: 30,
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  coinContainer: {
    flex: 1,
    padding: 10,
    marginBottom: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    backgroundColor: 'gray'
  }
});
