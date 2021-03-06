import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput
} from 'react-native';

var Button = require('../common/button');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    };
  },
  render: function() {
    return (
      <View 
        style={styles.container}
      >

        <Text style={styles.header}>Sign up</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput 
          style={styles.input} 
          value={this.state.username}
          onChangeText={(text) => this.setState({username: text})}
        />

        <Text style={styles.label}>Password</Text>
        <TextInput 
          secureTextEntry={true}
          style={styles.input} 
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
        />

        <Text style={styles.label}>Confirm password</Text>
        <TextInput 
          secureTextEntry={true}
          style={styles.input} 
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
        />

        <Text style={styles.error}>{this.state.errorMessage}</Text>

        <Button text={'Sign up'} onPress={this.onSignupPress} />
        <Text style={styles.signup} onPress={this.onLoginPress}>Already a registered user? Log in here</Text>
      </View>
    );
  },
  onSignupPress: function() {
    if (this.state.username === '' || this.state.password === '' || this.state.passwordConfirmation === '') {
      return this.setState({errorMessage: 'Please enter a password and username'});
    }
    if (this.state.password !== this.state.passwordConfirmation) {
      return this.setState({errorMessage: 'Your passwords do not match'});
    }
    // CREATE SERVER POST HERE
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    fetch('http://104.131.158.94:3000/api/user/signup', {
      method: 'POST',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then((response) => { 
        // Unauthorized 
        if (response.status === 401) {
          this.setState({errorMessage: 'An error occured. Please try again'});  
        } else if (response.status === 200) {
          this.props.navigator.immediatelyResetRouteStack([{name: 'region'}]); 
        }
      })
      .catch((error) => {
        this.setState({errorMessage: 'An error occured. Please try again'});
      });
  },
  onLoginPress: function() {
    this.props.navigator.pop();
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10
  },
  label: {
    fontSize: 20,
    color: '#555'
  },
  signup: {
    padding: 20,
    marginTop: 30
  },
  error: {
    color: 'red'
  }
});