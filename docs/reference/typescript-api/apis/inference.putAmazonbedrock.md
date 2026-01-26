# Client.inference.putAmazonbedrock

Create an Amazon Bedrock inference endpoint. Create an inference endpoint to perform an inference task with the `amazonbedrock` service. >info > You need to provide the access and secret keys only once, during the inference model creation. The get inference API does not retrieve your access or secret keys. After creating the inference model, you cannot change the associated key pairs. If you want to use a different access and secret key pair, delete the inference model and recreate it with the same name and the updated keys.

## Method Signature

```typescript
client.inference.putAmazonbedrock(this: That, params: T.InferencePutAmazonbedrockRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.InferencePutAmazonbedrockResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`InferencePutAmazonbedrockRequest`](../types/InferencePutAmazonbedrockRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.InferencePutAmazonbedrockResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
