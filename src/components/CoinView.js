import React, { Component } from 'react';
import { StyleSheet, Text, View, Animated, Dimensions } from 'react-native';
import { VictoryChart, VictoryLine, VictoryTheme } from "victory-native";

const WIDTH = Dimensions.get('window').width
const convertNumToCurrency = (str) => parseFloat(str || 0).toLocaleString('id')
const HISTORY_COUNT = 50

class CoinView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anim: new Animated.Value(0),
      count: 1,
      redCount: 0,
      greenCount: 0,
      raising: false,
      same: true,
      sum: 0,
      history: []
    }

    console.log(props)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.ticker !== nextProps.ticker && this.props.ticker !== null) {
      let last = parseFloat(nextProps.ticker.last || 0)
      let lastPrev = parseFloat(this.props.ticker.last || 0)

      Animated.sequence([
        Animated.timing(
          this.state.anim,
          {
            toValue: 1,
            duration: 250,
          }
        ),
        Animated.delay(2000),
        Animated.timing(
          this.state.anim,
          {
            toValue: 0,
            duration: 250,
          }
        )
      ]).start();

      let his = [...this.state.history, {
        x: this.props.label + Date.now(),
        y: last
      }]
      if (his.length > HISTORY_COUNT) {
        his = his.slice(his.length - HISTORY_COUNT)
      }

      this.setState({
        count: this.state.count + 1,
        greenCount: this.state.greenCount + (last > lastPrev ? 1 : 0),
        redCount: this.state.redCount + (last < lastPrev ? 1 : 0),
        raising: last > lastPrev,
        same: last === lastPrev,
        sum: lastPrev === 0 ? 0 : this.state.sum + (last - lastPrev),
        history: his
      })
    }
  }

  render() {
    const { label, ticker, volLabel } = this.props

    if (ticker === null) {
      return (
        <View style={styles.coinContainer}>
          <Text>Loading...</Text>
        </View>
      )
    }

    const last = convertNumToCurrency(ticker.last)
    const buy = convertNumToCurrency(ticker.buy)
    const sell = convertNumToCurrency(ticker.sell)
    const high = convertNumToCurrency(ticker.high)
    const low = convertNumToCurrency(ticker.low)
    const volIdr = convertNumToCurrency(ticker.vol_idr)
    const color = this.state.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['white', this.state.same ? 'lightblue' :
        (this.state.raising ? 'limegreen' : 'orange')]
    });
    return (
      <View style={styles.coinContainer}>
        <Animated.Text style={{
          fontSize: 20,
          color: color
        }}>{label}</Animated.Text>
        <View style={{
          flex: 1,
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
            <Text style={styles.smallText}>Sum: {this.state.sum.toLocaleString('id')}</Text>
          </View>
          <View style={{
            flex: 0.8
          }}>
            <Text style={styles.smallText}>G:{this.state.greenCount} -
              R:{this.state.redCount}</Text>
            <Text style={styles.smallText}>Vol-idr: {volIdr}</Text>
            <Text style={styles.smallText}>Vol-{volLabel}: {ticker['vol_' + volLabel]}</Text>
          </View>
        </View>
        <Animated.View style={{
          flex: 1,
          marginTop: 5,
          backgroundColor: color
        }}>
          {
            this.state.history.length > 1 ? (
              <VictoryLine
                width={(WIDTH/2) - 20}
                height={50}
                padding={10}
                style={{
                  data: { stroke: 'brown', strokeWidth: 1 }
                }}
                data={this.state.history}
              />
            ) : (
              <Text style={{
                fontSize: 10,
                color: 'gray',
                padding: 2
              }}>Preparing chart...</Text>
            )
          }
        </Animated.View>

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
    flex: 0,
    padding: 10,
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: 'gray'
  }
});

export default CoinView;
