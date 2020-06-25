import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, H1, Button, Content, Text, View } from 'native-base';
import buttons from '../../styles/buttons';

const styles = StyleSheet.create({
  pageHeader: {
    flex: 1,
    textAlign: 'center',
    textTransform: 'capitalize',
    marginTop: '10%',
    marginBottom: '10%',
  },
  buttonContainer: {
    flex: 1,
    textAlign: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  }
});

const Menu = ({ menuName, menuItems }: { menuName: string, menuItems: string[]}) => {
  const menuButtons = menuItems.map((buttonName: string) => {
    return (
      <View style={styles.buttonContainer}>
        <Button
          style={buttons.menuButton}
          key={buttonName}
        >
          <Text> {buttonName} </Text>
        </Button>
      </View>
    );
  });

  return (
    <Container style={{ padding: 10 }}>
      <Content>
        <H1 style={styles.pageHeader}> {menuName} </H1>
        {menuButtons}
      </Content>
    </Container>
  );
}



export default Menu;
