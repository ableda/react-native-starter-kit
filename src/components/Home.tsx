import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Container, Content, Text, Button, View } from 'native-base';
import Spacer from './UI/Spacer';
import buttons from '../styles/buttons';
import Logo from './Logo';
import { menuMap } from '../store/menus';
import { Actions } from 'react-native-router-flux';

var styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  singleButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingLeft: '10%',
    paddingRight: '10%',
  }
});

const Home = () => {

  const buttonPress = (pageName: string) => {
    Actions.menu({ menuName: pageName, menuItems: menuMap[pageName] });
  }

  return (
    <Container>
      <Content padder>
        <Logo displayTitle={ false }></Logo>

        <Spacer size={15} />

        <View style={styles.buttonContainer}>
          <Button
            primary={true}
            style={buttons.homeButton}
            onPress={() => buttonPress('page1')}
          >
            <Text> Page 1 </Text>
          </Button>

          <Button primary={true} style={buttons.homeButton}>
            <Text> CTA 2 </Text>
          </Button>
        </View>

        <View style={styles.singleButtonContainer}>
          <Button primary={true} style={buttons.homeButton}>
            <Text> CTA 3 </Text>
          </Button>
        </View>

        <View style={styles.buttonContainer}>
          <Button primary={true} style={buttons.homeButton}>
            <Text> CTA 4 </Text>
          </Button>

          <Button primary={true} style={buttons.homeButton}>
            <Text> CTA 5 </Text>
          </Button>
        </View>

      </Content>
    </Container>
  );
};

export default Home;
