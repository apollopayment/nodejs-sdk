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

  protected exceptionWrapper(cb: Function): ApolloAPIReturnType {
    try {
      return cb();
    } catch (exp: any) {
      //console.log('Error occured', exp.message);
      throw new Error(exp.message);
    }
  }
}
