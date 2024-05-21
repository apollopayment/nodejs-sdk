import { AxiosRequestConfig, AxiosResponse } from 'axios';

import BaseClass, { ApolloAPIReturnType } from './BaseClass';
import { DataBuilder } from '../DataBuilder';

import { TNullableString } from '../types/Base';
import { 
  TNewAddressEntity, 
  TExistingAddressEntity, 
  TAddressPagination, 
  TResponseAddressBookRecord, 
  TResponseGetListOfAddresses 
} from '../types/Address';

export default class AddressRequest extends BaseClass {

  addAddress(req: TNewAddressEntity): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/address-book/add',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseAddressBookRecord;
    });
  }

  deleteAddress(addressId: TNullableString = null): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder({ addressId });
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/address-book/remove',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return success;
    });
  }

  updateAddress(req: TExistingAddressEntity): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/address-book/update',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return success;
    });
  }

  getListOfAddresses(req: TAddressPagination): ApolloAPIReturnType {
    return this.exceptionWrapper(async () => {
      const data: DataBuilder = new DataBuilder(req);
      this.headerBuilder.setData(data);

      const res: AxiosResponse = await this.axiosInstance.request(<AxiosRequestConfig>{
        method: 'POST',
        url: '/api-gateway/address-book/get',
        data: data.valueOf(),
        headers: this.headerBuilder.valueOf(),
      });

      const { success, response, error } = res.data;

      if (error) {
        throw new Error(error.message);
      }

      return response as TResponseGetListOfAddresses;
    });
  }
}