var React = require('react-native');
var {
  Platform,
  StyleSheet,
  Text,
  TouchableElement,
  TouchableHighlight,
  TouchableNativeFeedback,
  View,
} = React;

var Octane = require('benchmark-octane2');
var {
  Box2D,
  CodeLoad,
  RayTrace,
} = Octane;

var Benchmark = React.createClass({

  benchmark: function() {
    var success = true;
    this.setState(this.getInitialState());
    function PrintResult(name, result) {
      print( (name+ "                      ").substr(0,20) + ': ' + result);
    }


    function PrintError(name, error) {
      PrintResult(name, error);
      success = false;
    }


    function PrintScore(score) {
      if (success) {
        print('----');
        print('Score (version ' + global.BenchmarkSuite.version + '): ' + score);
      }
    }

    function print(str) {
      console.log(str);
    }

    console.log('Running benchmark');

    global.BenchmarkSuite.config.doWarmup = undefined;
    global.BenchmarkSuite.config.doDeterministic = undefined;
    //BenchmarkSuite.suites = [new RayTrace];
    global.BenchmarkSuite.RunSuites({
      NotifyResult: this.setResult,
      NotifyError:   PrintError,
      NotifyScore: PrintScore
    });
    //console.log(Octane.run());
  },

  setResult: function(name, result) {
    var text = (name+ "                      ").substr(0,20) + ': ' + result;
    this.setState({
      result: text,
      readyToLift: "OH RLY"
    });
  },

  componentDidMount: function() {
    this.benchmark();
  },

  getInitialState: function() {
    return {
      result: "Running RayTrace benchmark...",
      readyToLift: "Ray, do you even lift?"
    };
  },

  render: function() {
    var TouchableElement = TouchableHighlight;
    if (Platform.OS === 'android') {
      TouchableElement = TouchableNativeFeedback;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.result}
        </Text>
        <TouchableElement
          style={styles.button}
          onPress={this.benchmark}>
          <View>
            <Text style={styles.buttonText}>
              {this.state.readyToLift}
            </Text>
          </View>
        </TouchableElement>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Benchmark;
