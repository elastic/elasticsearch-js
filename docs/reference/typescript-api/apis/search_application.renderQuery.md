# Client.search_application.renderQuery

Render a search application query. Generate an Elasticsearch query using the specified query parameters and the search template associated with the search application or a default template if none is specified. If a parameter used in the search template is not specified in `params`, the parameter's default value will be used. The API returns the specific Elasticsearch query that would be generated and run by calling the search application search API. You must have `read` privileges on the backing alias of the search application.

## Method Signature

```typescript
client.search_application.renderQuery(this: That, params: T.SearchApplicationRenderQueryRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.SearchApplicationRenderQueryResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`SearchApplicationRenderQueryRequest`](../types/SearchApplicationRenderQueryRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.SearchApplicationRenderQueryResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
