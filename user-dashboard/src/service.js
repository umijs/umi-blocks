import request from 'umi-request';

const API_PREFIX = `/api/BLOCK_NAME`;

export function fetch({ page = 1 }) {
  return request(`${API_PREFIX}?page=${page}`);
}

export function remove(id) {
  return request(`${API_PREFIX}/${id}`, {
    method: 'DELETE',
  });
}

export function patch(id, values) {
  // TODO:
  // use umi-request after the issue is closed
  // https://github.com/umijs/umi-request/issues/5
  return window.fetch(`${API_PREFIX}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(values),
  });
}

export function create(values) {
  return request(API_PREFIX, {
    method: 'POST',
    data: values,
  });
}
