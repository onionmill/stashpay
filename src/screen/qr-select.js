import React from 'react';
import {observer} from 'mobx-react';

import {Title} from '../component/text';
import {Background} from '../component/background';
import {Header, ScrollContent} from '../component/layout';
import {Section, SectionItem} from '../component/section';
import {IconButton, BackButton} from '../component/button';

import store from '../store';
import * as nav from '../action/nav';
import * as receive from '../action/receive';
import * as settings from '../action/settings';

const QRSelectScreen = () => (
  <Background>
    <Header>
      <BackButton onPress={() => nav.goBack()} />
      <Title>Receive Options</Title>
      <IconButton/>
    </Header>
    <ScrollContent>
      <Section title="Receive QR Code">
        <SectionItem
          title="Unified QR Code (Recommended)"
          onPress={() => settings.setUnifiedQR(true)}
          icon={store.receive.unified ? 'check' : undefined}
        />
        <SectionItem
          title="Chose Lightning or OnChain"
          onPress={() => settings.setUnifiedQR(false)}
          icon={!store.receive.unified ? 'check' : undefined}
        />
      </Section>
      <Section title="Advanced">
        <SectionItem
          title="Rescan OnChain Addresses"
          onPress={() => receive.rescanOnchainSwaps()}
          icon={'radio'}
        />
      </Section>
    </ScrollContent>
  </Background>
);

export default observer(QRSelectScreen);
