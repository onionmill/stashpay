import React from 'react';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {Background} from '../component/background';
import {Header, ScrollContent} from '../component/layout';
import {Section, SectionItem} from '../component/section';
import {IconButton, BackButton} from '../component/button';

import store from '../store';
import {FIATS} from '../util';
import * as nav from '../action/nav';
import * as fiat from '../action/fiat';


const FiatSelectScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Select Fiat</Title>
      <IconButton/>
    </Header>
    <ScrollContent>
      <Section title="Fiat Currencies">
        {Object.keys(FIATS).map(code => (
          <SectionItem
            key={code}
            title={FIATS[code].displayLong}
            onPress={() => fiat.setCurrency(code)}
            icon={store.settings.fiat === code ? 'check' : undefined}
          />
        ))}
      </Section>
    </ScrollContent>
  </Background>
);

export default observer(FiatSelectScreen);
