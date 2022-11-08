import type { GraphQLResponse } from '@/types/graphql';

// Have to be on VPN to use the connection.
const API_URL = 'http://it2810-37.idi.ntnu.no:4000/api';

export default async function getGraphqlData<T>(query: string) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query
    })
  });

  if (!response.ok) throw new Error(response.statusText);

  const json: GraphQLResponse<T> = await response.json();

  if (json.errors) throw new Error('Query returned with errors');

  return json.data as T;
}
