import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const convertNumToCurrency = (str) => parseFloat(str || 0).toLocaleString('id')

class CoinView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      greenCount: 0,
      raising: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.ticker !== nextProps.ticker) {
      let last = parseFloat(nextProps.ticker.last || 0)
      let lastPrev = parseFloat(this.props.ticker.last || 0)
      this.setState({
        count: this.state.count + 1,
        greenCount: this.state.greenCount + (last > lastPrev ? 1 : 0),
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
          flex: 0,
          flexDirection: 'row',
          marginTop: 5,
          alignItems: 'flex-start',
          justifyContent: 'center'
        }}>
          <View style={{
            flex: 1.2
          }}>
            <Text style={{
              fontWeight: 'bold'
            }}>{last}</Text>
            <Text style={styles.smallText}>Buy: {buy}</Text>
            <Text style={styles.smallText}>Sell: {sell}</Text>
            <Text style={styles.smallText}>High: {high}</Text>
            <Text style={styles.smallText}>Low: {low}</Text>
          </View>
          <View style={{
            flex: 0.8
          }}>
            <Text style={styles.smallText}>G:{this.state.greenCount} -
              R:{this.state.count - this.state.greenCount}</Text>
            <Text style={styles.smallText}>Vol-idr: {volIdr}</Text>
            <Text style={styles.smallText}>Vol-{volLabel}: {ticker['vol_' + volLabel]}</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  whiteText: {
    color: 'white'
  },
  smallText: {
    fontSize: 11
  },
  coinContainer: {
    width: '50%',
    padding: 10,
    marginBottom: 5,
    backgroundColor: 'gray'
  }
});

export default CoinView;
