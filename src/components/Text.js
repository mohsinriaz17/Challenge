import React from 'react';
import { Text as RNText } from 'react-native';
import { FONT_COLOR } from '../styles/colors';
import { FONT_SIZE } from '../constants';


export default Text = (props) => {
  return (<RNText
    {...props}
    style={{ 
      fontSize:FONT_SIZE,
      color: FONT_COLOR, 
       ...props.style 
    }}
  >
    {props.children}
  </RNText>)
}


