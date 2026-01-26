# Client.ml.putDatafeed

Create a datafeed. Datafeeds retrieve data from Elasticsearch for analysis by an anomaly detection job. You can associate only one datafeed with each anomaly detection job. The datafeed contains a query that runs at a defined interval (`frequency`). If you are concerned about delayed data, you can add a delay (`query_delay') at each interval. By default, the datafeed uses the following query: `{"match_all": {"boost": 1}}`. When Elasticsearch security features are enabled, your datafeed remembers which roles the user who created it had at the time of creation and runs the query using those same roles. If you provide secondary authorization headers, those credentials are used instead. You must use Kibana, this API, or the create anomaly detection jobs API to create a datafeed. Do not add a datafeed directly to the `.ml-config` index. Do not give users `write` privileges on the `.ml-config` index.

## Method Signature

```typescript
client.ml.putDatafeed(this: That, params: T.MlPutDatafeedRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPutDatafeedResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MlPutDatafeedRequest`](../types/MlPutDatafeedRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPutDatafeedResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
