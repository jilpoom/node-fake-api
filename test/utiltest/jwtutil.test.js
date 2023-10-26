const JWT = require('jsonwebtoken');
const JWTUtil = require('../../util/jwt_util');
require('dotenv').config()
const JWT_SECRET_KEY = process.env.JWT_SECREY_KEY;

test('PROVIDE JWT TOKEN TEST', async () => {
    const dummy_data = {
        foo: 'bar',
    }
    const access_token = await JWTUtil.ProvideToken(dummy_data, 'access');
    const decode_data = await JWTUtil.VerifyToken(access_token);
    expect(decode_data.user_safe_data.foo).toEqual('bar');

    const refresh_token = await JWTUtil.ProvideToken({}, 'refresh');
    const decode_refresh_token_data = await JWTUtil.VerifyToken(refresh_token);
    expect(decode_refresh_token_data.user_safe_data).toEqual({});

})