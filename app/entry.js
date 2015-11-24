/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var Benchmark = require('./components/Benchmark');

var JSCoreBench = React.createClass({
  render: function() {
    return(
      <Benchmark/>
    )
  }
});

AppRegistry.registerComponent('JSCoreBench', () => JSCoreBench);
