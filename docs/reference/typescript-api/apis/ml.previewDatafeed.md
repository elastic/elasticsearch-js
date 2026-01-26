# Client.ml.previewDatafeed

Preview a datafeed. This API returns the first "page" of search results from a datafeed. You can preview an existing datafeed or provide configuration details for a datafeed and anomaly detection job in the API. The preview shows the structure of the data that will be passed to the anomaly detection engine. IMPORTANT: When Elasticsearch security features are enabled, the preview uses the credentials of the user that called the API. However, when the datafeed starts it uses the roles of the last user that created or updated the datafeed. To get a preview that accurately reflects the behavior of the datafeed, use the appropriate credentials. You can also use secondary authorization headers to supply the credentials.

## Method Signature

```typescript
client.ml.previewDatafeed(this: That, params?: T.MlPreviewDatafeedRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MlPreviewDatafeedResponse<TDocument>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params?` | [`MlPreviewDatafeedRequest`](../types/MlPreviewDatafeedRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MlPreviewDatafeedResponse<TDocument>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
