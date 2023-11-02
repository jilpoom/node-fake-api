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

test('REAUTH JWT TOKEN TEST', async () => {
    const dummy_data = {
        foo: 'bar',
    }

    const access_token = await JWTUtil.ProvideTokenWithExpiresOption(dummy_data, "access", '1s');
    const refresh_token = await JWTUtil.ProvideTokenWithExpiresOption({}, "refresh", '10s');

    // access_token 만기 시간을 1초로 설정 후, 1초를 기다린다.
    await new Promise(r => setTimeout(r, 1000));

    // access_token의 유효성 검사 시, jwt expired 메세지 객체를 보낸다.
    const verified_decode = await JWTUtil.VerifyToken(access_token);

    let new_access_token = "";
    // jwt가 만료되었을 경우, 새로운 access token을 발급
    if (verified_decode.message === 'jwt expired') {
        const decode_data = await JWTUtil.decodeToken(access_token);
        new_access_token = await JWTUtil.ProvideTokenWithExpiresOption(decode_data.user_safe_data, "access", '1s');
    }
    const new_dummy_data = await JWTUtil.decodeToken(new_access_token);

    // 새로 발급한 토큰의 Payload가 구 토큰의 Payload와 같은지 확인.
    expect(new_dummy_data.user_safe_data).toEqual(dummy_data);


})