# Client.cat.mlDatafeeds

Get datafeeds. Get configuration and usage information about datafeeds. This API returns a maximum of 10,000 datafeeds. If the Elasticsearch security features are enabled, you must have `monitor_ml`, `monitor`, `manage_ml`, or `manage` cluster privileges to use this API. IMPORTANT: CAT APIs are only intended for human consumption using the Kibana console or command line. They are not intended for use by applications. For application consumption, use the get datafeed statistics API.

## Method Signature

```typescript
client.cat.mlDatafeeds(this: That, params?: T.CatMlDatafeedsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.CatMlDatafeedsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`CatMlDatafeedsRequest`](../types/CatMlDatafeedsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.CatMlDatafeedsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
