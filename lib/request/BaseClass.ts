import { Axios } from 'axios';

import { CustomHeaderBuilder } from '../DataBuilder';

import { TNullableString } from '../types/Base';

export type ApolloAPIResponse = {
  errors?: TNullableString,
  error?: TNullableString,
  //[key: string]: string | number | boolean | object
}

export type ApolloAPIReturnType = Promise<ApolloAPIResponse | string | boolean>;

export default class BaseClass {
  protected headerBuilder: CustomHeaderBuilder;
  protected axiosInstance: Axios;

  constructor(axiosInstance: Axios, headerBuilder: CustomHeaderBuilder) {
    this.headerBuilder = headerBuilder;
    this.axiosInstance = axiosInstance;
  }

  // @ts-ignore
  protected async exceptionWrapper<T extends Function>(cb: T): ReturnType<T> {
    try {
      return await cb();
    } catch (exp: any) {
      //console.log('Error occured', exp.message);
      throw new Error(exp.message);
    }
  }
}
