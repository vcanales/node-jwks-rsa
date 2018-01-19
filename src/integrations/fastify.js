import { ArgumentError } from '../errors';
import { JwksClient } from '../JwksClient';

const handleSigningKeyError = (err, cb) => {
  // If we didn't find a match, can't provide a key.
  if (err && err.name === 'SigningKeyNotFoundError') {
    return cb(null);
  }

  // If an error occured like rate limiting or HTTP issue, we'll bubble up the error.
  if (err) {
    return cb(err);
  }
};

module.exports.fastifyJwtSecret = (options) => {
  if (options === null || options === undefined) {
    throw new ArgumentError('An options object must be provided when initializing expressJwtSecret');
  }

  const client = new JwksClient(options);
  const onError = options.handleSigningKeyError || handleSigningKeyError;

  return function secretProvider(req, decoded, cb) {
    // Only RS256 is supported.
    if (!decoded.header || decoded.header.alg !== 'RS256') {
      return cb(new Error('only RS256 is supported'), null);
    }

    client.getSigningKey(decoded.header.kid, (err, key) => {
      if (err) {
        return onError(err, (newError) => cb(newError, null));
      }

      // Provide the key.
      return cb(null, key.publicKey || key.rsaPublicKey);
    });
  };
};
