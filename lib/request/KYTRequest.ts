import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { ApolloAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TKYTTransactionCheckRequest, 
  TKYTWithdrawalCheckRequest, 
  TKYTWithdrawalForAddressCheckRequest, 
  TResponseCheckTransfer, 
  TResponseWithdrawalAddressScreening 
} from '../types/KYT';

export default class KYTRequest extends BaseClass {
  checkTransactionRisks(req: TKYTTransactionCheckRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/kyt/check-transfer',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCheckTransfer;
    });
  }

  checkWithdrawalRisks(req: TKYTWithdrawalCheckRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/kyt/check-withdrawal-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseCheckTransfer;
    });
  }

  checkWithdrawalRisksForAddress(req: TKYTWithdrawalForAddressCheckRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/kyt/withdrawal-address-screening',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseWithdrawalAddressScreening;
    });
  }
}