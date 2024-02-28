import { task, types } from 'hardhat/config'
import { ActionType } from 'hardhat/types'

interface TaskArguments {
    dstEid: number
    toAddress: string
    tokenIds: string
}

//struct SendParam {
//     uint32 dstEid; // Destination endpoint ID.
//     bytes32 to; // Recipient address.
//     uint256[] tokenIds; // token ids
//     bytes extraOptions; // Additional options supplied by the caller to be used in the LayerZero message.
//     bytes composeMsg; // The composed message for the send() operation.
//     bytes onftCmd; // The IONFT721 command to be executed, unused in default IONFT721 implementations.
// }

interface SendParam {
    dstEid: number
    to: string
    tokenIds: string[]
}

const action: ActionType<TaskArguments> = async (taskArgs: TaskArguments, hre) => {
    const signer = (await hre.ethers.getSigners())[0]
    const { dstEid, toAddress, tokenIds } = taskArgs
    const tokenIdsArray = tokenIds.split(',')
    const sendParam: SendParam = {
        dstEid,
        to: toAddress,
        tokenIds: tokenIdsArray,
    }
    console.log(`Swapping ONFT721 tokens...`)
    const myONFT721 = await hre.ethers.getContract('MyONFT721Mock')

    const { nativeFee } = await myONFT721.quoteSend(sendParam, false)

    const txResponse = await myONFT721.send(sendParam, nativeFee, signer.address, { value: nativeFee })
    const txReceipt = await txResponse.wait()
    console.log(`ONFT721 tokens swapped: ${txReceipt.transactionHash}`)
}

task('swap', 'swap ONFT721 tokens', action)
    .addParam('dstEid', 'Destination endpoint ID', undefined, types.int, false)
    .addParam('toAddress', 'Recipient address', undefined, types.string, false)
    .addParam('tokenIds', 'The IDs of the tokens', undefined, types.string, false)
