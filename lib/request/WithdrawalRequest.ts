import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { ApolloAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TWithdrawalCommissionRequest, 
  TWithdrawalRequest, 
  TResponseRequestFee, 
  TResponseMakeWithdrawal 
} from '../types/Withdrawal';

export default class WithdrawalRequest extends BaseClass {

  getCommissionForMakingWithdrawal(req: TWithdrawalCommissionRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/withdrawal-fee-token',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseRequestFee;
    });
  }

  makeWithdrawal(req: TWithdrawalRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/make-withdrawal',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseMakeWithdrawal;
    });
  }

  makeWithdrawalAsync(req: TWithdrawalRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/make-withdrawal-async',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseMakeWithdrawal;
    });
  }

  getWithdrawal(withdrawalId: string): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ withdrawalId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/get-withdrawal',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseMakeWithdrawal;
    });
  }
}
