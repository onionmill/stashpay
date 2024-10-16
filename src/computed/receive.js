import {extendObservable} from 'mobx';

const ComputedReceive = store => {
  extendObservable(store, {
    get receiveMinValueLabel() {
      const {onChain, minSatLn, minSatBtc} = store.receive;
      return `${onChain ? minSatBtc : minSatLn} minumum`;
    },
  });
};

export default ComputedReceive;
