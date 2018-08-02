import {
  Dimensions,
  Platform
} from 'react-native';
const { height, width } = Dimensions.get('window')

class Display {

  isIPhoneX() {
    if (Platform.OS === 'ios' && height === 812) {
      return true
    }
    return false
  }
}

module.exports = new Display()
