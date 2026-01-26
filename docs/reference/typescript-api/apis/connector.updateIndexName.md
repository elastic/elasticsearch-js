# Client.connector.updateIndexName

Update the connector index name. Update the `index_name` field of a connector, specifying the index where the data ingested by the connector is stored.

## Method Signature

```typescript
client.connector.updateIndexName(this: That, params: T.ConnectorUpdateIndexNameRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorUpdateIndexNameResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorUpdateIndexNameRequest`](../types/ConnectorUpdateIndexNameRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorUpdateIndexNameResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
