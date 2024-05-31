import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { ApolloAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { 
  TNullableString, 
  TResponseTestSignature, 
  TResponsePrice, 
  TResponseAvailableCurrency, 
  TResponseFindTx, 
  TResponseValidateAddress
} from '../types/Base';

export default class BaseRequest extends BaseClass {

  checkSignature() {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder();
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/test-signature',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response } = res.data;

      if (response.errors?.length) {
        throw new Error(response.errors[0]);
      }

      return response as TResponseTestSignature;
    });
  }

  availableCurrencies() {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder();
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/available-currencies',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseAvailableCurrency[];
    });
  }

  priceRate(from: string, to: string) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ from, to });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/price-rate',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponsePrice;
    });
  }

  operationsByTXHash(tx: TNullableString = null) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ tx });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/find-tx',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseFindTx[];
    });
  }

  checkAddressFormat(address: TNullableString = null, network: TNullableString = null) {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ address, network });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/utils/validate-address',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseValidateAddress;
    });
  }
}
