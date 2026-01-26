# Client.ml.stopDatafeed

Stop datafeeds. A datafeed that is stopped ceases to retrieve data from Elasticsearch. A datafeed can be started and stopped multiple times throughout its lifecycle.

## Method Signature

```typescript
client.ml.stopDatafeed(this: That, params: T.MlStopDatafeedRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlStopDatafeedResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlStopDatafeedRequest`](../types/MlStopDatafeedRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlStopDatafeedResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
