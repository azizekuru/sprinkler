const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { roleRights } = require('../config/roles');

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Lütfen giriş yapın'));
  }
  req.user = user;

  if (requiredRights.length) {
    const userRights = roleRights.get(user.role);
    const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
    if (!hasRequiredRights && req.params.userId !== user.id) {
      return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
    }
  }

  resolve();
};

const auth = (...requiredRights) => (req, res, next) => {
  passport.authenticate(
    'jwt',
    { session: false },
    async (err, user, info) => {
      if (err || info || !user) {
        return next(new ApiError(httpStatus.UNAUTHORIZED, 'Lütfen giriş yapın'));
      }

      req.user = user;

      if (requiredRights.length) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((right) =>
          userRights.includes(right)
        );
        if (!hasRequiredRights && req.params.userId !== user.id) {
          return next(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }
      }

      next();
    }
  )(req, res, next);
};


const emailVerified = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Lütfen giriş yapın'));
  }

  if (!req.user.isEmailVerified) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'E-posta adresiniz doğrulanmamış'));
  }

  next();
};


  

module.exports = { auth, emailVerified };
