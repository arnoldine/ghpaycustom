import axios from 'axios'
import { appConfig } from '../config/appConfig'

export const httpClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
})
