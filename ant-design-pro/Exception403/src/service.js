import request from 'umi-request';

export default async function queryError(code) {
  return request(`/api/${code}`);
}
