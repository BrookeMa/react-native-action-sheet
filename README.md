# react-native-action-sheet
![image](https://github.com/BrookeMa/react-native-action-sheet/blob/master/Demo.gif)
# Example Usage

```JavaScript

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import ActionSheet from "../src/action.sheet"

export default class Example extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actionSheetVisable: false
    }
    this.params = {
      title: "是否保存图片",
      items: [
        { text: "Done", type: "Normal", handler: this.itemButtonClick },
        { text: "Save", type: "HighLight", handler: this.doneButtonClick },
        { text: "Cancel", type: "Disabled", handler: this.itemButtonClick }
      ],
      cancel: "取消",
      touchWildToHide: true,  /// 点击灰色阴影是否消失弹窗
    }
  }

  itemButtonClick = (index) => {
    const that = this
    that.setState({
      actionSheetVisable: false
    })
  }

  doneButtonClick = (index) => {
    const that = this
    that.setState({
      actionSheetVisable: false
    })
  }

  showActionSheet() {
    this.setState({
      actionSheetVisable: true
    })
  }

  render() {
    const that = this
    return (
      <View style={styles.container}>
        <ActionSheet visible={that.state.actionSheetVisable} params={that.params} cancelHandler={() => {
          that.setState({
            actionSheetVisable: false
          })
        }} />
        <TouchableOpacity onPress={() => {
          that.showActionSheet()
        }}>
          <View style={styles.actionWrap}>
            <Text style={styles.action}>show action sheet</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

```
