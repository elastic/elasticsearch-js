# Client.msearch

Run multiple searches. The format of the request is similar to the bulk API format and makes use of the newline delimited JSON (NDJSON) format. The structure is as follows: ``` header\n body\n header\n body\n ``` This structure is specifically optimized to reduce parsing if a specific search ends up redirected to another node. IMPORTANT: The final line of data must end with a newline character `\n`. Each newline character may be preceded by a carriage return `\r`. When sending requests to this endpoint the `Content-Type` header should be set to `application/x-ndjson`.

## Method Signature

```typescript
client.msearch(this: That, params: T.MsearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MsearchResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MsearchRequest`](../types/MsearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MsearchResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
