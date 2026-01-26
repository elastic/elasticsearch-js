# Client.terms_enum

Get terms in an index. Discover terms that match a partial string in an index. This API is designed for low-latency look-ups used in auto-complete scenarios. > info > The terms enum API may return terms from deleted documents. Deleted documents are initially only marked as deleted. It is not until their segments are merged that documents are actually deleted. Until that happens, the terms enum API will return terms from these documents.

## Method Signature

```typescript
client.terms_enum(this: That, params: T.TermsEnumRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TermsEnumResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TermsEnumRequest`](../types/TermsEnumRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TermsEnumResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
