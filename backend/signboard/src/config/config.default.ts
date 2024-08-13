import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721655911737_3824',
  koa: {
    port: 7001,
  },
  webSocket: {
    port: 3000,
  },
} as MidwayConfig;
