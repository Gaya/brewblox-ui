const host = '/api';

function toJson(result: Promise<Response>): Promise<any> {
  return result
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      return response;
    })
    .then(response => response.json());
}

export function get(url: string): Promise<any> {
  return toJson(window.fetch(`${host}${url}`));
}

export function post(url: string, data: any, method = 'POST'): Promise<any> {
  return toJson(window.fetch(
    `${host}${url}`,
    {
      method,
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    },
  ));
}

export function put(url: string, data: any): Promise<any> {
  return post(url, data, 'PUT');
}

export function patch(url: string, data: any): Promise<any> {
  return post(url, data, 'PATCH');
}
