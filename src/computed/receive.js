import {extendObservable} from 'mobx';

const ComputedReceive = store => {
  extendObservable(store, {
    get receiveMinValueLabel() {
      const {onChain, minSatLn, minSatBtc} = store.receive;
      return `${onChain ? minSatBtc : minSatLn} minimum`;
    },
    get receiveCopyBtnLabel() {
      const {onChain} = store.receive;
      return `Copy ${onChain ? 'BTC Address' : 'LN Invoice'}`;
    },
  });
};

export default ComputedReceive;
