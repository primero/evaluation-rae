import React from 'react';
import { StyleSheet, View, Text, FlatList, Modal, Button, TextInput } from 'react-native';
import ActionButton from 'react-native-action-button'; // 
import { Card } from 'react-native-elements'

export default class DataScreen extends React.Component {
  static navigationOptions = {
    title: 'Save/Read demo',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalVisible: false,
      text1: 'title',
      text2: 'body'
    };

  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  renderItem = ({ item }) => (
    <Card dividerStyle={{ backgroundColor: 'white' }}
      title={"Item index" + item.id}>
      <Text style={{ fontWeight: 'bold' }}>{"Title:"}</Text><Text>{item.title}</Text>
      <Text style={{ fontWeight: 'bold' }}>{"Body:"}</Text><Text>{item.body}</Text>
    </Card>
  )

  addItem() {

    var joined = this.state.data.concat({ title: this.state.text1, body: this.state.text2 });
    this.setState({ data: joined })
  }


  render() {
    const onAdditem = () => {
      this.setModalVisible(false);
      this.addItem()
    }
    const deleteAll = () => {
      var joined = []
      this.setState({ data: joined })
      this.setModalVisible(false);
    }
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            //alignItems: 'center',
            marginTop: 22, padding: 22
          }}>

            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(text1) => this.setState({ text1 })}
              value={this.state.text1}
            />
            <Text style={{ height: 10 }}></Text>
            <TextInput
              style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={(text2) => this.setState({ text2 })}
              value={this.state.text2}
            />
            <Text style={{ height: 20 }}></Text>
            <Button
              style={{ height: 40, borderWidth: 1, padding: 22 }}
              onPress={onAdditem}
              title="Add item"
              color="#0000ff"
            />
            <Text style={{ height: 20 }}></Text>
            <Button
              style={{ height: 40, borderWidth: 1, padding: 22 }}
              onPress={deleteAll}
              title="DeleteAll"
              color="#0000ff"
            />


          </View>
        </Modal>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
        <ActionButton
          buttonColor="rgba(00,00,255,1)"
          onPress={() => { this.setModalVisible(true); }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#eee',
  },
});
