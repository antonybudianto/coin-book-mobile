import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const convertNumToCurrency = (str) => parseFloat(str || 0).toLocaleString('id')

class CoinView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      raising: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.ticker !== nextProps.ticker) {
      let last = parseFloat(nextProps.ticker.last || 0)
      let lastPrev = parseFloat(this.props.ticker.last || 0)
      this.setState({
        count: this.state.count + 1,
        raising: last > lastPrev
      })
    }
  }

  render() {
    const { label, ticker, volLabel } = this.props
    const last = convertNumToCurrency(ticker.last)
    const buy = convertNumToCurrency(ticker.buy)
    const sell = convertNumToCurrency(ticker.sell)
    const high = convertNumToCurrency(ticker.high)
    const low = convertNumToCurrency(ticker.low)
    const volIdr = convertNumToCurrency(ticker.vol_idr)
    return (
      <View style={styles.coinContainer}>
        <Text style={{
          fontSize: 20,
          color: this.state.raising ? 'lightgreen' : 'pink'
        }}>{label}</Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 5,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <View style={{
            flex: 1
          }}>
            <Text style={{
              fontWeight: 'bold'
            }}>LAST: {last}</Text>
            <Text>Buy: {buy}</Text>
            <Text>Sell: {sell}</Text>
            <Text>High: {high}</Text>
            <Text>Low: {low}</Text>
          </View>
          <View style={{
            flex: 1
          }}>
            <Text>Update: {this.state.count}</Text>
            <Text>Vol-idr: {volIdr}</Text>
            <Text>Vol-{volLabel}: {ticker['vol_' + volLabel]}</Text>
          </View>
        </View>
      </View>
    )
  }
}


export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      btcTicker: {},
      ethTicker: {},
      etcTicker: {},
      ltcTicker: {}
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
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.whiteText}>VIP Bitcoin.co.id</Text>
        <ScrollView style={{
          width: '100%',
          marginTop: 10
        }}>
          <CoinView volLabel='btc' label='BTC/IDR' ticker={this.state.btcTicker} />
          <CoinView volLabel='eth' label='ETH/IDR' ticker={this.state.ethTicker} />
          <CoinView volLabel='etc' label='ETC/IDR' ticker={this.state.etcTicker} />
          <CoinView volLabel='ltc' label='LTC/IDR' ticker={this.state.ltcTicker} />
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
