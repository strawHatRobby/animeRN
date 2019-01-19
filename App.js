import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Text, View, Alert } from 'react-native';
import { Spring, config, native } from 'react-spring';
import Sound from 'react-native-sound';

Sound.setCategory('Playback',true);
export default class App extends React.Component {
  state = {toggle: true, errorPop: true}
 
  toggle = () => this.setState(state => ({ toggle: !state.toggle }))
  errorPop = () => this.setState(state => ({ errorPop: !state.errorPop }))
  incorrectAns = () => {
    this.errorPop();
    Alert.alert("you guess wrong");
     const sound = new Sound('wrong_answer.wav', Sound.MAIN_BUNDLE, (error) => {
       if (error){
         Alert.alert("Couldn't execute the sound due to ", error);
         return;
       }
       sound.play(() => {
         sound.release();
       });
     });
     sound.play((success) => {
      if (success) {
        Alert.alert('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
        // reset the player to its uninitialized state (android only)
        // this is the only option to recover after an error occured and use the player again
        sound.reset();
      }
    });
    }
  render() {
    return (
      <View style={styles.container}>
      <Spring from={{  fontSize:12, opacity: 0 }} to={{ color: this.state.toggle ? '#000' : '#28ddd7', fontSize: this.state.toggle ? 20: 40,  opacity: 1 }}
      config={config.slow}
      >
  {props => 
        <Text onPress={this.toggle} style={props}>Correct Text</Text>
        
  }
  </Spring>
  <Spring from={{ fontSize:12, opacity: 0 }} to={{  color: this.state.errorPop ? '#000' :'#c23369', fontSize: this.state.errorPop ? 20 : 40 ,  opacity: 1 }}
      config={config.slow}
      >
  {props => 
        <Text  onPress={this.incorrectAns} style={props}>Incorrect Text</Text>
        
  }
  </Spring>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
