import React from 'react';
import {
  Text,
  TouchableHighlight,
} from 'react-native';
import { styles } from "./action.item.styles"
import PropTypes from 'prop-types';

export default class ActionItem extends React.Component {

  constructor(props) {
    super(props);
  }

  static propTypes = {
    text: PropTypes.string,
    type: PropTypes.string,
    handler: PropTypes.func,
    index: PropTypes.number,
  }

  render() {
    const that = this
    const { text, type, handler } = this.props
    var color = "#333333"
    if (type == "HightLight") {
      color = "#E76153"
    }
    if (type == "Disabled") {
      color = "#CCCCCC"
    }
    return (
      <TouchableHighlight style={styles.item} onPressOut={() => {
        handler(that.props.index)
      }} underlayColor="#EFEDE7">
        <Text style={[{ color }, styles.text]}>{text}</Text>
      </TouchableHighlight>
    )
  }
}