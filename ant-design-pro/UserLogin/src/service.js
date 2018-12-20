import request from 'umi-request';

export async function fakeAccountLogin(params) {
  return request('/api/BLOCK_NAME/account', {
    method: 'POST',
    body: params,
  });
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/BLOCK_NAME/captcha?mobile=${mobile}`);
}
