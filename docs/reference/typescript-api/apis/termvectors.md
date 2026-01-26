# Client.termvectors

Get term vector information. Get information and statistics about terms in the fields of a particular document. You can retrieve term vectors for documents stored in the index or for artificial documents passed in the body of the request. You can specify the fields you are interested in through the `fields` parameter or by adding the fields to the request body. For example: ``` GET /my-index-000001/_termvectors/1?fields=message ``` Fields can be specified using wildcards, similar to the multi match query. Term vectors are real-time by default, not near real-time. This can be changed by setting `realtime` parameter to `false`. You can request three types of values: _term information_, _term statistics_, and _field statistics_. By default, all term information and field statistics are returned for all fields but term statistics are excluded. **Term information** * term frequency in the field (always returned) * term positions (`positions: true`) * start and end offsets (`offsets: true`) * term payloads (`payloads: true`), as base64 encoded bytes If the requested information wasn't stored in the index, it will be computed on the fly if possible. Additionally, term vectors could be computed for documents not even existing in the index, but instead provided by the user. > warn > Start and end offsets assume UTF-16 encoding is being used. If you want to use these offsets in order to get the original text that produced this token, you should make sure that the string you are taking a sub-string of is also encoded using UTF-16. **Behaviour** The term and field statistics are not accurate. Deleted documents are not taken into account. The information is only retrieved for the shard the requested document resides in. The term and field statistics are therefore only useful as relative measures whereas the absolute numbers have no meaning in this context. By default, when requesting term vectors of artificial documents, a shard to get the statistics from is randomly selected. Use `routing` only to hit a particular shard. Refer to the linked documentation for detailed examples of how to use this API.

## Method Signature

```typescript
client.termvectors(this: That, params: T.TermvectorsRequest<TDocument>, options?: TransportRequestOptionsWithOutMeta): Promise<T.TermvectorsResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TermvectorsRequest`](../types/TermvectorsRequest.md)<TDocument> | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TermvectorsResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
