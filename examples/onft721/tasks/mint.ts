import { BigNumber } from 'ethers'
import { task, types } from 'hardhat/config'
import { ActionType } from 'hardhat/types'

interface TaskArguments {
    toAddress: string
    tokenId: string
}

const action: ActionType<TaskArguments> = async (taskArgs: TaskArguments, hre) => {
    const tokenId = BigNumber.from(taskArgs.tokenId)
    // @ts-expect-error ts complains about hardhat-deploy typings
    const myONFT721 = await hre.ethers.getContract('MyONFT721Mock')
    console.log(`Minting token with ID: ${tokenId} on ${hre.network.name} for ${myONFT721.address}...`)
    const txResponse = await myONFT721.mint(tokenId)
    const txReceipt = await txResponse.wait()
    console.log(`Token minted: ${txReceipt.transactionHash}`)
}

task('mint', 'mint ONFT721 tokens', action)
    .addParam('toAddress', 'the address to mint the token to', undefined, types.string, false)
    .addParam('tokenId', 'the ID of the token', undefined, types.string, false)
