# Client.inference.putWatsonx

Create a Watsonx inference endpoint. Create an inference endpoint to perform an inference task with the `watsonxai` service. You need an IBM Cloud Databases for Elasticsearch deployment to use the `watsonxai` inference service. You can provision one through the IBM catalog, the Cloud Databases CLI plug-in, the Cloud Databases API, or Terraform.

## Method Signature

```typescript
client.inference.putWatsonx(this: That, params: T.InferencePutWatsonxRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutWatsonxResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutWatsonxRequest`](../types/InferencePutWatsonxRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutWatsonxResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
