import { JwksClient } from './JwksClient';

import * as errors from './errors';
import { hapiJwt2Key, hapiJwt2KeyAsync } from './integrations/hapi';
import { expressJwtSecret } from './integrations/express';
import { fastifyJwtSecret } from './integrations/fastify';
import { koaJwtSecret } from './integrations/koa';

module.exports = (options) => {
  return new JwksClient(options);
};

module.exports.ArgumentError = errors.ArgumentError;
module.exports.JwksError = errors.JwksError;
module.exports.JwksRateLimitError = errors.JwksRateLimitError;
module.exports.SigningKeyNotFoundError = errors.SigningKeyNotFoundError;

module.exports.expressJwtSecret = expressJwtSecret;
module.exports.fastifyJwtSecret = fastifyJwtSecret;
module.exports.hapiJwt2Key = hapiJwt2Key;
module.exports.hapiJwt2KeyAsync = hapiJwt2KeyAsync;
module.exports.koaJwtSecret = koaJwtSecret;
