import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  FlatList, ActivityIndicator
} from 'react-native';
import { Card } from 'react-native-elements'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Http demo',
  };

  constructor(props) {
    super(props);
    this.state = { isLoading: true }
  }

  componentDidMount() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("made http")
        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function () {

        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderItem = ({ item }) => (
    <Card  dividerStyle={{backgroundColor: 'white'}}
    title={"Item index" + item.id}>
    <Text style={{fontWeight: 'bold'}}>{"Title:"}</Text><Text>{item.title}</Text>
    <Text style={{fontWeight: 'bold'}}>{"Body:"}</Text><Text>{item.body}</Text>
    </Card>
  )

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      
      <View style={styles.container} >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <FlatList
          
            
            data={this.state.dataSource}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}

          />
        </ScrollView>

      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
  contentContainer: {
    paddingTop: 30,
  }
});
