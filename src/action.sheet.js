import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Animated,
  Modal,
  Easing,
  Dimensions
} from 'react-native';
import { styles } from "./action.sheet.styles"
import Item from "./action.item"
import PropTypes from 'prop-types';
import Display from "./display"

const { height, width } = Dimensions.get('window')

export default class ActionSheet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fadeInOpacity: 0.3,
      animatedValue: new Animated.Value(0),
    }

    this.actionSheetAnimated = Animated.timing(
      this.state.animatedValue,
      {
        toValue: 1,
        duration: 300,
        easing: Easing.in,
      }
    );
    this.moveBottom
  }

  static propTypes = {
    visible: PropTypes.bool,
    params: PropTypes.object,
    cancelHandler: PropTypes.func,
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.visible == true) {
      this.moveBottom = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-height, 0]
      });
    } else {
      this.moveBottom = this.state.animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -height]
      });
    }
    nextState.animatedValue.setValue(0);
    this.actionSheetAnimated.start();
    return true
  }

  render() {
    const that = this
    const { params, visible, cancelHandler } = this.props
    var cancel = "取消"
    if (params.cancel !== null && typeof params.cancel !== 'undefined') {
      cancel = params.cancel
    }
    return (
      <Modal visible={visible}
        transparent={true}
        animationType="fade" >
        <TouchableHighlight style={styles.maskBackground} onPress={() => {
          if (params.touchWildToHide) {
            cancelHandler()
          }
        }} >
          <View />
        </TouchableHighlight>
        <Animated.View style={{ position: "absolute", width: "100%", bottom: this.moveBottom }}>
          {
            params.title == null ? null : <View style={styles.titleView}>
              <Text style={styles.title}>{params.title}</Text>
            </View>
          }
          {
            params.items.map((result, index) => (
              that.renderItem(result, index)
            ))
          }
          <View>
            <TouchableHighlight
              style={[styles.cancel, Display.isIPhoneX() == true ? { height: 92 } : { height: 58 }]}
              onPressOut={() => { cancelHandler() }}
              underlayColor="#EFEDE7"
            >
              <Text style={styles.cancelText}>{cancel}</Text>
            </TouchableHighlight>
          </View>
        </Animated.View>
      </Modal>
    )
  }

  renderItem(result, index) {
    return (
      <Item
        key={index}
        text={result.text}
        type={result.type}
        handler={result.handler}
        index={index} />
    )
  }
}


