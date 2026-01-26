# Client.ml.getDatafeeds

Get datafeeds configuration info. You can get information for multiple datafeeds in a single API request by using a comma-separated list of datafeeds or a wildcard expression. You can get information for all datafeeds by using `_all`, by specifying `*` as the `<feed_id>`, or by omitting the `<feed_id>`. This API returns a maximum of 10,000 datafeeds.

## Method Signature

```typescript
client.ml.getDatafeeds(this: That, params?: T.MlGetDatafeedsRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlGetDatafeedsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlGetDatafeedsRequest`](../types/MlGetDatafeedsRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlGetDatafeedsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
