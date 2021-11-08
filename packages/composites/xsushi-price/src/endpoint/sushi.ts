import { ExecuteWithConfig } from '@chainlink/types'
import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { ethers } from 'ethers'
import { Config } from '../config'
import xsushiABI from '../abi/xsushi.json'

export const supportedEndpoints = ['sushi']

export const execute: ExecuteWithConfig<Config> = async (input, _, config) => {
  const validator = new Validator(input, {})
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.jobRunID
  const xsushiAddress = config.xsushiAddress

  const contract = new ethers.Contract(xsushiAddress, xsushiABI, config.provider)
  const sushi = await contract.sushi()

  const response = {
    data: sushi,
  }

  return Requester.success(jobRunID, response, true)
}
