import React from 'react';
import {
  View,
  Text,
  // ScrollView,
  SafeAreaView,
  FlatList,
  StyleSheet,
} from 'react-native';
// import AsyncStorage from '@react-native-community/async-storage';
// import Constants from 'expo-constants';

const DATA = [
  {
    id: '1',
    title: 'First Item',
  },
  {
    id: '2',
    title: 'Second Item',
  },
  {
    id: '3',
    title: 'Third Item',
  },
];

function Item({title}) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: Constants.statusBarHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

// export default class AllPostComponent extends Component {
//   render() {
//     return (
//       <View>
//         <SafeAreaView>
//           <ScrollView>
//             <Text>
//               We know security and privacy are important to you – and they are
//               important to us, too. We make it a priority to provide strong
//               security and give you confidence that your information is safe and
//               accessible when you need it. We’re constantly working to ensure
//               strong security, protect your privacy, and make Google even more
//               effective and efficient for you. We spend hundreds of millions of
//               dollars every year on security, and employ world-renowned experts
//               in data security to keep your information safe. We also built
//               easy-to-use privacy and security tools like Google Dashboard,
//               2-step verification and Ads Settings. So when it comes to the
//               information you share with Google, you’re in control. You can
//               learn more about safety and security online, including how to
//               protect yourself and your family online, at the Google Safety
//               Center. Learn more about how we keep your personal information
//               private and safe — and put you in control. We know security and
//               privacy are important to you – and they are important to us, too.
//               We make it a priority to provide strong security and give you
//               confidence that your information is safe and accessible when you
//               need it. We’re constantly working to ensure strong security,
//               protect your privacy, and make Google even more effective and
//               efficient for you. We spend hundreds of millions of dollars every
//               year on security, and employ world-renowned experts in data
//               security to keep your information safe. We also built easy-to-use
//               privacy and security tools like Google Dashboard, 2-step
//               verification and Ads Settings. So when it comes to the information
//               you share with Google, you’re in control. You can learn more about
//               safety and security online, including how to protect yourself and
//               your family online, at the Google Safety Center. Learn more about
//               how we keep your personal information private and safe — and put
//               you in control.
//             </Text>
//           </ScrollView>
//         </SafeAreaView>
//       </View>
//     );
//   }
// }
