## `Esql`

### Constructor

:::
new Esql(transport: [Transport](./Transport.md));
:::

### Properties

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

### Methods

| Name | Signature | Description |
| - | - | - |
| `asyncQuery` | `asyncQuery(this: [That](./That.md), params: [EsqlAsyncQueryRequest](./EsqlAsyncQueryRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlAsyncQueryResponse](./EsqlAsyncQueryResponse.md)>;` | Run an async ES|QL query. Asynchronously run an ES|QL (Elasticsearch query language) query, monitor its progress, and retrieve results when they become available. The API accepts the same parameters and request body as the synchronous query API, along with additional async related properties. |
| `asyncQuery` | `asyncQuery(this: [That](./That.md), params: [EsqlAsyncQueryRequest](./EsqlAsyncQueryRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlAsyncQueryResponse](./EsqlAsyncQueryResponse.md), unknown>>;` | &nbsp; |
| `asyncQuery` | `asyncQuery(this: [That](./That.md), params: [EsqlAsyncQueryRequest](./EsqlAsyncQueryRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlAsyncQueryResponse](./EsqlAsyncQueryResponse.md)>;` | &nbsp; |
| `asyncQueryDelete` | `asyncQueryDelete(this: [That](./That.md), params: [EsqlAsyncQueryDeleteRequest](./EsqlAsyncQueryDeleteRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlAsyncQueryDeleteResponse](./EsqlAsyncQueryDeleteResponse.md)>;` | Delete an async ES|QL query. If the query is still running, it is cancelled. Otherwise, the stored results are deleted. If the Elasticsearch security features are enabled, only the following users can use this API to delete a query: * The authenticated user that submitted the original query request * Users with the `cancel_task` cluster privilege |
| `asyncQueryDelete` | `asyncQueryDelete(this: [That](./That.md), params: [EsqlAsyncQueryDeleteRequest](./EsqlAsyncQueryDeleteRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlAsyncQueryDeleteResponse](./EsqlAsyncQueryDeleteResponse.md), unknown>>;` | &nbsp; |
| `asyncQueryDelete` | `asyncQueryDelete(this: [That](./That.md), params: [EsqlAsyncQueryDeleteRequest](./EsqlAsyncQueryDeleteRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlAsyncQueryDeleteResponse](./EsqlAsyncQueryDeleteResponse.md)>;` | &nbsp; |
| `asyncQueryGet` | `asyncQueryGet(this: [That](./That.md), params: [EsqlAsyncQueryGetRequest](./EsqlAsyncQueryGetRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlAsyncQueryGetResponse](./EsqlAsyncQueryGetResponse.md)>;` | Get async ES|QL query results. Get the current status and available results or stored results for an ES|QL asynchronous query. If the Elasticsearch security features are enabled, only the user who first submitted the ES|QL query can retrieve the results using this API. |
| `asyncQueryGet` | `asyncQueryGet(this: [That](./That.md), params: [EsqlAsyncQueryGetRequest](./EsqlAsyncQueryGetRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlAsyncQueryGetResponse](./EsqlAsyncQueryGetResponse.md), unknown>>;` | &nbsp; |
| `asyncQueryGet` | `asyncQueryGet(this: [That](./That.md), params: [EsqlAsyncQueryGetRequest](./EsqlAsyncQueryGetRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlAsyncQueryGetResponse](./EsqlAsyncQueryGetResponse.md)>;` | &nbsp; |
| `asyncQueryStop` | `asyncQueryStop(this: [That](./That.md), params: [EsqlAsyncQueryStopRequest](./EsqlAsyncQueryStopRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlAsyncQueryStopResponse](./EsqlAsyncQueryStopResponse.md)>;` | Stop async ES|QL query. This API interrupts the query execution and returns the results so far. If the Elasticsearch security features are enabled, only the user who first submitted the ES|QL query can stop it. |
| `asyncQueryStop` | `asyncQueryStop(this: [That](./That.md), params: [EsqlAsyncQueryStopRequest](./EsqlAsyncQueryStopRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlAsyncQueryStopResponse](./EsqlAsyncQueryStopResponse.md), unknown>>;` | &nbsp; |
| `asyncQueryStop` | `asyncQueryStop(this: [That](./That.md), params: [EsqlAsyncQueryStopRequest](./EsqlAsyncQueryStopRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlAsyncQueryStopResponse](./EsqlAsyncQueryStopResponse.md)>;` | &nbsp; |
| `getQuery` | `getQuery(this: [That](./That.md), params: [EsqlGetQueryRequest](./EsqlGetQueryRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlGetQueryResponse](./EsqlGetQueryResponse.md)>;` | Get a specific running ES|QL query information. Returns an object extended information about a running ES|QL query. |
| `getQuery` | `getQuery(this: [That](./That.md), params: [EsqlGetQueryRequest](./EsqlGetQueryRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlGetQueryResponse](./EsqlGetQueryResponse.md), unknown>>;` | &nbsp; |
| `getQuery` | `getQuery(this: [That](./That.md), params: [EsqlGetQueryRequest](./EsqlGetQueryRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlGetQueryResponse](./EsqlGetQueryResponse.md)>;` | &nbsp; |
| `listQueries` | `listQueries(this: [That](./That.md), params?: [EsqlListQueriesRequest](./EsqlListQueriesRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlListQueriesResponse](./EsqlListQueriesResponse.md)>;` | Get running ES|QL queries information. Returns an object containing IDs and other information about the running ES|QL queries. |
| `listQueries` | `listQueries(this: [That](./That.md), params?: [EsqlListQueriesRequest](./EsqlListQueriesRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlListQueriesResponse](./EsqlListQueriesResponse.md), unknown>>;` | &nbsp; |
| `listQueries` | `listQueries(this: [That](./That.md), params?: [EsqlListQueriesRequest](./EsqlListQueriesRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlListQueriesResponse](./EsqlListQueriesResponse.md)>;` | &nbsp; |
| `query` | `query(this: [That](./That.md), params: [EsqlQueryRequest](./EsqlQueryRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[EsqlQueryResponse](./EsqlQueryResponse.md)>;` | Run an ES|QL query. Get search results for an ES|QL (Elasticsearch query language) query. |
| `query` | `query(this: [That](./That.md), params: [EsqlQueryRequest](./EsqlQueryRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[EsqlQueryResponse](./EsqlQueryResponse.md), unknown>>;` | &nbsp; |
| `query` | `query(this: [That](./That.md), params: [EsqlQueryRequest](./EsqlQueryRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[EsqlQueryResponse](./EsqlQueryResponse.md)>;` | &nbsp; |
