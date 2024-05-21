import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { ApolloAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { TAutoSwapRequest, TResponseAutoSwap } from '../types/AutoSwap';

export default class AutoSwapRequest extends BaseClass {
  createAutoSwaps(req: TAutoSwapRequest): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/auto-swaps/create',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseAutoSwap;
    });
  }

  findAutoSwapById(id: string): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
       const data: DataBuilder = new DataBuilder({ id });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/auto-swaps/get',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseAutoSwap;
    });
  }
}