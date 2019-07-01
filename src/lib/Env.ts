import clone from 'clone';
import {readFileSync} from 'fs';

export interface EnvI {
  [k: string]: any
}

class Env {
  env: EnvI;
  constructor(path: string) {
    this.env = JSON.parse(readFileSync(path, 'utf8').toString());
  }

  get(key: string | string[], defaultValue?: any): any {
    const keyArr = Array.isArray(key) ? key : key.split('.');
    let curVal: any = this.env;
    for (const keyItem of keyArr) {
      if (keyItem in curVal) {
        curVal = curVal[keyItem];
      } else {
        return defaultValue;
      }
    }

    return clone(curVal);
  }

  getBool(key: string | string[], defaultValue?: boolean) {
    return !!this.get(key, defaultValue);
  }

  getNumber(key: string | string[], defaultValue?: number) {
    return parseFloat(this.get(key, defaultValue));
  }

  getString(key: string | string[], defaultValue?: string) {
    return this.get(key, defaultValue) + '';
  }

  getAll(): EnvI {
    return clone(this.env);
  }
}

export const env = new Env(process.env.ENV_PATH || './env/dev.json');

export default env;