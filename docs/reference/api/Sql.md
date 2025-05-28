# `Sql` [class-Sql]

## Constructor

```typescript
new Sql(transport: [Transport](./Transport.md));
```

## Properties [class-properties-Sql]

| Name | Type | Description |
| - | - | - |
| `acceptedParams` | Record<string, { path: string[]; body: string[]; query: string[]; }> | &nbsp; |
| `transport` | [Transport](./Transport.md) | &nbsp; |

## Methods [class-methods-Sql]

| Name | Signature | Description |
| - | - | - |
| `clearCursor` | `clearCursor(this: [That](./That.md), params: [SqlClearCursorRequest](./SqlClearCursorRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SqlClearCursorResponse](./SqlClearCursorResponse.md)>;` | Clear an SQL search cursor. |
| `clearCursor` | `clearCursor(this: [That](./That.md), params: [SqlClearCursorRequest](./SqlClearCursorRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SqlClearCursorResponse](./SqlClearCursorResponse.md), unknown>>;` | &nbsp; |
| `clearCursor` | `clearCursor(this: [That](./That.md), params: [SqlClearCursorRequest](./SqlClearCursorRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SqlClearCursorResponse](./SqlClearCursorResponse.md)>;` | &nbsp; |
| `deleteAsync` | `deleteAsync(this: [That](./That.md), params: [SqlDeleteAsyncRequest](./SqlDeleteAsyncRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SqlDeleteAsyncResponse](./SqlDeleteAsyncResponse.md)>;` | Delete an async SQL search. Delete an async SQL search or a stored synchronous SQL search. If the search is still running, the API cancels it. If the Elasticsearch security features are enabled, only the following users can use this API to delete a search: * Users with the `cancel_task` cluster privilege. * The user who first submitted the search. |
| `deleteAsync` | `deleteAsync(this: [That](./That.md), params: [SqlDeleteAsyncRequest](./SqlDeleteAsyncRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SqlDeleteAsyncResponse](./SqlDeleteAsyncResponse.md), unknown>>;` | &nbsp; |
| `deleteAsync` | `deleteAsync(this: [That](./That.md), params: [SqlDeleteAsyncRequest](./SqlDeleteAsyncRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SqlDeleteAsyncResponse](./SqlDeleteAsyncResponse.md)>;` | &nbsp; |
| `getAsync` | `getAsync(this: [That](./That.md), params: [SqlGetAsyncRequest](./SqlGetAsyncRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SqlGetAsyncResponse](./SqlGetAsyncResponse.md)>;` | Get async SQL search results. Get the current status and available results for an async SQL search or stored synchronous SQL search. If the Elasticsearch security features are enabled, only the user who first submitted the SQL search can retrieve the search using this API. |
| `getAsync` | `getAsync(this: [That](./That.md), params: [SqlGetAsyncRequest](./SqlGetAsyncRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SqlGetAsyncResponse](./SqlGetAsyncResponse.md), unknown>>;` | &nbsp; |
| `getAsync` | `getAsync(this: [That](./That.md), params: [SqlGetAsyncRequest](./SqlGetAsyncRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SqlGetAsyncResponse](./SqlGetAsyncResponse.md)>;` | &nbsp; |
| `getAsyncStatus` | `getAsyncStatus(this: [That](./That.md), params: [SqlGetAsyncStatusRequest](./SqlGetAsyncStatusRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SqlGetAsyncStatusResponse](./SqlGetAsyncStatusResponse.md)>;` | Get the async SQL search status. Get the current status of an async SQL search or a stored synchronous SQL search. |
| `getAsyncStatus` | `getAsyncStatus(this: [That](./That.md), params: [SqlGetAsyncStatusRequest](./SqlGetAsyncStatusRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SqlGetAsyncStatusResponse](./SqlGetAsyncStatusResponse.md), unknown>>;` | &nbsp; |
| `getAsyncStatus` | `getAsyncStatus(this: [That](./That.md), params: [SqlGetAsyncStatusRequest](./SqlGetAsyncStatusRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SqlGetAsyncStatusResponse](./SqlGetAsyncStatusResponse.md)>;` | &nbsp; |
| `query` | `query(this: [That](./That.md), params?: [SqlQueryRequest](./SqlQueryRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SqlQueryResponse](./SqlQueryResponse.md)>;` | Get SQL search results. Run an SQL request. |
| `query` | `query(this: [That](./That.md), params?: [SqlQueryRequest](./SqlQueryRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SqlQueryResponse](./SqlQueryResponse.md), unknown>>;` | &nbsp; |
| `query` | `query(this: [That](./That.md), params?: [SqlQueryRequest](./SqlQueryRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SqlQueryResponse](./SqlQueryResponse.md)>;` | &nbsp; |
| `translate` | `translate(this: [That](./That.md), params: [SqlTranslateRequest](./SqlTranslateRequest.md), options?: [TransportRequestOptionsWithOutMeta](./TransportRequestOptionsWithOutMeta.md)): Promise<[SqlTranslateResponse](./SqlTranslateResponse.md)>;` | Translate SQL into Elasticsearch queries. Translate an SQL search into a search API request containing Query DSL. It accepts the same request body parameters as the SQL search API, excluding `cursor`. |
| `translate` | `translate(this: [That](./That.md), params: [SqlTranslateRequest](./SqlTranslateRequest.md), options?: [TransportRequestOptionsWithMeta](./TransportRequestOptionsWithMeta.md)): Promise<[TransportResult](./TransportResult.md)<[SqlTranslateResponse](./SqlTranslateResponse.md), unknown>>;` | &nbsp; |
| `translate` | `translate(this: [That](./That.md), params: [SqlTranslateRequest](./SqlTranslateRequest.md), options?: [TransportRequestOptions](./TransportRequestOptions.md)): Promise<[SqlTranslateResponse](./SqlTranslateResponse.md)>;` | &nbsp; |
