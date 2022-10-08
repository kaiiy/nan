"use strict";
export const createConfig = (token, secret) => {
  if (!token || !secret)
    throw Error();
  const clientConfig = {
    channelAccessToken: token
  };
  const middlewareConfig = {
    channelSecret: secret
  };
  return [clientConfig, middlewareConfig];
};
