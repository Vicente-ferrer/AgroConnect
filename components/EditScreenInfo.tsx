import { StyleSheet, Text, View } from 'react-native';
import Mapa from './Maps/index';
export default function EditScreenInfo({ path }: { path: string }) {
  const title = 'Open up the code for this screen:d';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <Mapa />
    </View>
  );
}

const styles = StyleSheet.create({
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 15,
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
});
