# Client.ml.updateDatafeed

Update a datafeed. You must stop and start the datafeed for the changes to be applied. When Elasticsearch security features are enabled, your datafeed remembers which roles the user who updated it had at the time of the update and runs the query using those same roles. If you provide secondary authorization headers, those credentials are used instead.

## Method Signature

```typescript
client.ml.updateDatafeed(this: That, params: T.MlUpdateDatafeedRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlUpdateDatafeedResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlUpdateDatafeedRequest`](../types/MlUpdateDatafeedRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlUpdateDatafeedResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
