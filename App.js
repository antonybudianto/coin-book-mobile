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
      xrpTicker: {},
      ltcTicker: {},
      bchTicker: {},
      btgTicker: {},
      ignisTicker: {}
    };

    this.timer = 0;
    this.fetchData = this.fetchData.bind(this);
    this.fetchFromVip = this.fetchFromVip.bind(this);
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.fetchData();
    }, 5000);
    this.fetchData();
  }

  componentWillUnmount () {
    clearInterval(this.timer);
  }

  fetchFromVip (tickerPath, stateName) {
    fetch(`https://vip.bitcoin.co.id/api/${tickerPath}/ticker`)
    .then(res => res.json())
    .then(json => {
      if (json.ticker) {
        this.setState({
          [stateName]: json.ticker
        })
      }
    });
  }

  fetchData () {
    this.fetchFromVip('btc_idr', 'btcTicker');
    this.fetchFromVip('eth_idr', 'ethTicker');
    this.fetchFromVip('etc_idr', 'etcTicker');
    this.fetchFromVip('xrp_idr', 'xrpTicker');
    this.fetchFromVip('ltc_idr', 'ltcTicker');
    this.fetchFromVip('bch_idr', 'bchTicker');
    this.fetchFromVip('btg_idr', 'btgTicker');
    this.fetchFromVip('ignis_idr', 'ignisTicker');
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
          <CoinView volLabel='xrp' label='XRP/IDR' ticker={this.state.xrpTicker} />
          <CoinView volLabel='ltc' label='LTC/IDR' ticker={this.state.ltcTicker} />
          <CoinView volLabel='bch' label='BCH/IDR' ticker={this.state.bchTicker} />
          <CoinView volLabel='btg' label='BTG/IDR' ticker={this.state.btgTicker} />
          <CoinView volLabel='ignis' label='IGNIS/IDR' ticker={this.state.ignisTicker} />
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
