# Client.inference.putElasticsearch

Create an Elasticsearch inference endpoint. Create an inference endpoint to perform an inference task with the `elasticsearch` service. > info > Your Elasticsearch deployment contains preconfigured ELSER and E5 inference endpoints, you only need to create the enpoints using the API if you want to customize the settings. If you use the ELSER or the E5 model through the `elasticsearch` service, the API request will automatically download and deploy the model if it isn't downloaded yet. > info > You might see a 502 bad gateway error in the response when using the Kibana Console. This error usually just reflects a timeout, while the model downloads in the background. You can check the download progress in the Machine Learning UI. If using the Python client, you can set the timeout parameter to a higher value. After creating the endpoint, wait for the model deployment to complete before using it. To verify the deployment status, use the get trained model statistics API. Look for `"state": "fully_allocated"` in the response and ensure that the `"allocation_count"` matches the `"target_allocation_count"`. Avoid creating multiple endpoints for the same model unless required, as each endpoint consumes significant resources.

## Method Signature

```typescript
client.inference.putElasticsearch(this: That, params: T.InferencePutElasticsearchRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutElasticsearchResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutElasticsearchRequest`](../types/InferencePutElasticsearchRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutElasticsearchResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
