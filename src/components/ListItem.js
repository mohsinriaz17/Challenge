import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SCREEN_WIDTH } from '../constants';
import * as colors from '../styles/colors';
import Text from './Text';

function transformDate(date) {
  let format = date.split('(')[0];
  let itemDate = new Date(format);
  let currentDate = new Date();
  let differenceInDates = currentDate.getTime() - itemDate.getTime();
  let differenceInDays = Math.floor(differenceInDates / (1000 * 3600 * 24));
  if (differenceInDays == 0) {
    return `Today`
  }else if (differenceInDays == 1) {
    return `${differenceInDays} day ago`
  } else if (differenceInDays>1 &&differenceInDays<8){
    return `${differenceInDays} days ago`
  }
  return itemDate.toDateString();
}

export default ListItem = (props) => {
  let date = transformDate(props.item.date)
  return (
    <View key={props.item.id} style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ ...styles.face, fontSize: props.item.size, }}>
          {props.item.face}
        </Text>
      </View>
      <View>
        <Text style={styles.price}>
          {`Price: $${isNaN(props.item.price / 100) ? 'Free' : (props.item.price / 100)}`}
        </Text>

        <Text style={styles.date}>
          Posted: {date}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...colors.SHADOW,
    minHeight: 100,
    justifyContent: 'space-between',
    width: (SCREEN_WIDTH / 2) - 20,
    margin: 10,
  },
  face: { padding: 10, textAlign: 'center' },
  price: { fontSize: 14, paddingHorizontal: 5, },
  date: { fontSize: 14, paddingHorizontal: 5, paddingVertical: 5, }
})