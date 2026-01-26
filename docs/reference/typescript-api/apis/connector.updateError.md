# Client.connector.updateError

Update the connector error field. Set the error field for the connector. If the error provided in the request body is non-null, the connector’s status is updated to error. Otherwise, if the error is reset to null, the connector status is updated to connected.

## Method Signature

```typescript
client.connector.updateError(this: That, params: T.ConnectorUpdateErrorRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.ConnectorUpdateErrorResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`ConnectorUpdateErrorRequest`](../types/ConnectorUpdateErrorRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.ConnectorUpdateErrorResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
