import React, { Component } from 'react';
import {
  StyleSheet,
  Keyboard,
  Text,
  TextInput,
  View,
  FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const listItems = [
  'Development',
  'Business',
  'IT & Software',
  'Office Productivity',
  'Personal Development',
  'Design',
  'Marketing',
  'LifeStyle',
  'Photography',
  'Health & Fitness',
  'Teacher Training',
  'Music'
];

export default class Udemy extends Component {
  state = {
    searchBarFocused: false,
    categories: listItems,
    searchInput: null
  };

  componentDidMount() {
    this.keyboardDidShowEvent = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow
    );
    this.keyboardWillShowEvent = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideEvent = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
  }

  componentWillUnmount() {
    this.keyboardWillHideEvent.remove();
    this.keyboardDidShowEvent.remove();
    this.keyboardWillShowEvent.remove();
  }

  keyboardWillHide = () => {
    this.setState({ searchBarFocused: false });
  };
  keyboardWillShow = () => {
    this.setState({ searchBarFocused: true });
  };
  keyboardDidShow = () => {
    this.setState({ searchBarFocused: true });
  };

  search = text => {
    const categories = listItems.filter(category =>
      category.toLowerCase().includes(text.toLowerCase())
    );
    this.setState({ categories });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Animatable.View
            animation="slideInRight"
            duration={500}
            style={styles.searchBar}
          >
            <Animatable.View
              animation={
                this.state.searchBarFocused ? 'fadeInLeft' : 'fadeInRight'
              }
              duration={500}
            >
              <Icon
                name={
                  this.state.searchBarFocused ? 'md-arrow-back' : 'ios-search'
                }
                style={styles.searchIcon}
              />
            </Animatable.View>
            <TextInput
              ref={cmp => (this.state.searchInput = cmp)}
              style={styles.searchInput}
              onChangeText={this.search}
              placeholder="search"
              placeholderTextColor="lightblue"
            />
          </Animatable.View>
        </View>
        <FlatList
          style={{
            backgroundColor: this.state.searchBarFocused
              ? 'rgba(0,0,0,0.3)'
              : 'white'
          }}
          data={this.state.categories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <Animatable.Text animation="flipInY" style={styles.item}>
              {item}
            </Animatable.Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  header: {
    backgroundColor: 'lightblue',
    height: 80,
    justifyContent: 'center'
  },
  searchBar: {
    height: 50,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white'
  },
  searchIcon: {
    fontSize: 24,
    marginLeft: 5
  },
  searchInput: {
    fontSize: 24,
    marginLeft: 10,
    flex: 1
  },
  item: {
    padding: 20,
    fontSize: 20
  }
});
