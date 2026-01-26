# Client.ml.startDatafeed

Start datafeeds. A datafeed must be started in order to retrieve data from Elasticsearch. A datafeed can be started and stopped multiple times throughout its lifecycle. Before you can start a datafeed, the anomaly detection job must be open. Otherwise, an error occurs. If you restart a stopped datafeed, it continues processing input data from the next millisecond after it was stopped. If new data was indexed for that exact millisecond between stopping and starting, it will be ignored. When Elasticsearch security features are enabled, your datafeed remembers which roles the last user to create or update it had at the time of creation or update and runs the query using those same roles. If you provided secondary authorization headers when you created or updated the datafeed, those credentials are used instead.

## Method Signature

```typescript
client.ml.startDatafeed(this: That, params: T.MlStartDatafeedRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlStartDatafeedResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlStartDatafeedRequest`](../types/MlStartDatafeedRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlStartDatafeedResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
