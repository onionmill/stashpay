import {
  connect,
  defaultConfig,
  getInfo,
  LiquidNetwork,
  fetchLightningLimits,
  fetchOnchainLimits,
  prepareReceiveOnchain,
  receiveOnchain,
  prepareReceivePayment,
  receivePayment,
} from '@breeztech/react-native-breez-sdk-liquid';

const mnemonic =
  'disorder tomorrow pride joke service hobby opinion undo season tooth actual detect';

export async function init() {
  // Create the default config
  const config = await defaultConfig(LiquidNetwork.MAINNET);

  // By default in React Native the workingDir is set to:
  // `/<APPLICATION_SANDBOX_DIRECTORY>/breezSdkLiquid`
  // You can change this to another writable directory or a
  // subdirectory of the workingDir if managing multiple nodes.
  console.log(`Working directory: ${config.workingDir}`);
  // config.workingDir = "path to writable directory"

  await connect({mnemonic, config});
  console.log('connect');

  // get wallet info
  const walletInfo = await getInfo();
  const balanceSat = walletInfo.balanceSat;
  const pendingSendSat = walletInfo.pendingSendSat;
  const pendingReceiveSat = walletInfo.pendingReceiveSat;
  console.log(`Wallet balance: ${balanceSat}`);
  console.log(`Wallet pending send balance: ${pendingSendSat}`);
  console.log(`Wallet pending receive balance: ${pendingReceiveSat}`);

  // Fetch the Receive limits
  const currentLimits = await fetchLightningLimits();
  console.log(`Minimum amount, in sats: ${currentLimits.receive.minSat}`);
  console.log(`Maximum amount, in sats: ${currentLimits.receive.maxSat}`);

  // Set the amount you wish the payer to send, which should be within the above limits
  const prepareRes = await prepareReceivePayment({
    payerAmountSat: 1_000,
  });

  // If the fees are acceptable, continue to create the Receive Payment
  const receiveFeesSat = prepareRes.feesSat;
  console.log(`Receive fees, in sats: ${receiveFeesSat}`);

  const optionalDescription = '<description>';
  const res = await receivePayment({
    prepareRes,
    description: optionalDescription,
  });

  const invoice = res.invoice;
  console.log(`Invoice: ${invoice}`);

  // Fetch the Onchain Receive limits
  const currentOnchainLimits = await fetchOnchainLimits();
  console.log(
    `Minimum on-chain amount, in sats: ${currentOnchainLimits.receive.minSat}`,
  );
  console.log(
    `Maximum on-chain amount, in sats: ${currentOnchainLimits.receive.maxSat}`,
  );

  // Set the amount you wish the payer to send, which should be within the above limits
  const prepareResponse = await prepareReceiveOnchain({
    payerAmountSat: 50_000,
  });

  // If the fees are acceptable, continue to create the Onchain Receive Payment
  const receiveOnchainFeesSat = prepareResponse.feesSat;
  console.log(`Receive on-chain fees, in sats: ${receiveOnchainFeesSat}`);

  const receiveOnchainResponse = await receiveOnchain(prepareResponse);

  // Send your funds to the below bitcoin address
  const address = receiveOnchainResponse.address;
  const bip21 = receiveOnchainResponse.bip21;
  console.log(`Address: ${address}`);
  console.log(`Bip21: ${bip21}`);
}

init();
