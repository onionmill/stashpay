import {
    addEventListener,
    connect,
    defaultConfig,
    getInfo,
    LiquidNetwork,
    listPayments,
    removeEventListener,
    prepareReceivePayment,
    prepareSendPayment,
    receivePayment,
    sendPayment
} from "@breeztech/react-native-breez-sdk-liquid"

const mnemonic = 'disorder tomorrow pride joke service hobby opinion undo season tooth actual detect'

export async function init() {
  // Create the default config
  const config = await defaultConfig(
    LiquidNetwork.MAINNET
  )

  // By default in React Native the workingDir is set to:
  // `/<APPLICATION_SANDBOX_DIRECTORY>/breezSdkLiquid`
  // You can change this to another writable directory or a
  // subdirectory of the workingDir if managing multiple nodes.
  console.log(`Working directory: ${config.workingDir}`)
  // config.workingDir = "path to writable directory"

  await connect({ mnemonic, config })
  console.log("connect")
}

init();