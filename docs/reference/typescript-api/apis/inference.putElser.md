# Client.inference.putElser

Create an ELSER inference endpoint. Create an inference endpoint to perform an inference task with the `elser` service. You can also deploy ELSER by using the Elasticsearch inference integration. > info > Your Elasticsearch deployment contains a preconfigured ELSER inference endpoint, you only need to create the enpoint using the API if you want to customize the settings. The API request will automatically download and deploy the ELSER model if it isn't already downloaded. > info > You might see a 502 bad gateway error in the response when using the Kibana Console. This error usually just reflects a timeout, while the model downloads in the background. You can check the download progress in the Machine Learning UI. If using the Python client, you can set the timeout parameter to a higher value. After creating the endpoint, wait for the model deployment to complete before using it. To verify the deployment status, use the get trained model statistics API. Look for `"state": "fully_allocated"` in the response and ensure that the `"allocation_count"` matches the `"target_allocation_count"`. Avoid creating multiple endpoints for the same model unless required, as each endpoint consumes significant resources.

## Method Signature

```typescript
client.inference.putElser(this: That, params: T.InferencePutElserRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutElserResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutElserRequest`](../types/InferencePutElserRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutElserResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
