import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {Background} from '../component/background';
import {Header, ScrollContent} from '../component/layout';
import {SectionItem} from '../component/section';
import {IconButton, BackButton} from '../component/button';
import {SearchBar} from '../component/input';

import store from '../store';
import {FIATS} from '../util';
import * as nav from '../action/nav';
import * as fiat from '../action/fiat';

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 24,
  },
  list: {
    paddingLeft: 34,
    paddingRight: 34,
  },
});

const FiatSelectScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFiats = Object.keys(FIATS).filter(code =>
    FIATS[code].displayLong.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Background>
      <Header>
        <BackButton onPress={() => nav.goBack()} />
        <Title>Fiat Currency</Title>
        <IconButton/>
      </Header>
      <SearchBar
        style={styles.input}
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search currencies..."
      />
      <ScrollContent style={styles.list}>
        {filteredFiats.map(code => (
          <SectionItem
            key={code}
            title={FIATS[code].displayLong}
            onPress={() => fiat.setCurrency(code)}
            icon={store.settings.fiat === code ? 'check' : undefined}
          />
        ))}
      </ScrollContent>
    </Background>
  );
};

export default observer(FiatSelectScreen);
