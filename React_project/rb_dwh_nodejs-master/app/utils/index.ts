import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

export const apiError = (response, message = "Error occured") => {
  response.status(422).json({
    isError: true,
    data: null,
    message,
  });
  response.end();
};

export const apiSuccess = (message: string, data: any, response) => {
  response.status(200).json({
    isError: false,
    data: data,
    message: message,
  });
  response.end();
};

export const authenticateToken = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: [`https://${process.env.AUTH0_DOMAIN}/`],
  algorithms: ["RS256"],
});
