## `Eql`

### Constructor

:::
new Eql(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `delete` | `delete(this: [That](./That.md), params: [EqlDeleteRequest](./EqlDeleteRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EqlDeleteResponse](./EqlDeleteResponse.md)>;` | Delete an async EQL search. Delete an async EQL search or a stored synchronous EQL search. The API also deletes results for the search. |
| `delete` | `delete(this: [That](./That.md), params: [EqlDeleteRequest](./EqlDeleteRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EqlDeleteResponse](./EqlDeleteResponse.md), unknown>>;` | &nbsp; |
| `delete` | `delete(this: [That](./That.md), params: [EqlDeleteRequest](./EqlDeleteRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EqlDeleteResponse](./EqlDeleteResponse.md)>;` | &nbsp; |
| `get` | `get<TEvent = unknown>(this: [That](./That.md), params: [EqlGetRequest](./EqlGetRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EqlGetResponse](./EqlGetResponse.md)<TEvent>>;` | Get async EQL search results. Get the current status and available results for an async EQL search or a stored synchronous EQL search. |
| `get` | `get<TEvent = unknown>(this: [That](./That.md), params: [EqlGetRequest](./EqlGetRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EqlGetResponse](./EqlGetResponse.md)<TEvent>, unknown>>;` | &nbsp; |
| `get` | `get<TEvent = unknown>(this: [That](./That.md), params: [EqlGetRequest](./EqlGetRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EqlGetResponse](./EqlGetResponse.md)<TEvent>>;` | &nbsp; |
| `getStatus` | `getStatus(this: [That](./That.md), params: [EqlGetStatusRequest](./EqlGetStatusRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EqlGetStatusResponse](./EqlGetStatusResponse.md)>;` | Get the async EQL status. Get the current status for an async EQL search or a stored synchronous EQL search without returning results. |
| `getStatus` | `getStatus(this: [That](./That.md), params: [EqlGetStatusRequest](./EqlGetStatusRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EqlGetStatusResponse](./EqlGetStatusResponse.md), unknown>>;` | &nbsp; |
| `getStatus` | `getStatus(this: [That](./That.md), params: [EqlGetStatusRequest](./EqlGetStatusRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EqlGetStatusResponse](./EqlGetStatusResponse.md)>;` | &nbsp; |
| `search` | `search<TEvent = unknown>(this: [That](./That.md), params: [EqlSearchRequest](./EqlSearchRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EqlSearchResponse](./EqlSearchResponse.md)<TEvent>>;` | Get EQL search results. Returns search results for an Event Query Language (EQL) query. EQL assumes each document in a data stream or index corresponds to an event. |
| `search` | `search<TEvent = unknown>(this: [That](./That.md), params: [EqlSearchRequest](./EqlSearchRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EqlSearchResponse](./EqlSearchResponse.md)<TEvent>, unknown>>;` | &nbsp; |
| `search` | `search<TEvent = unknown>(this: [That](./That.md), params: [EqlSearchRequest](./EqlSearchRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EqlSearchResponse](./EqlSearchResponse.md)<TEvent>>;` | &nbsp; |
