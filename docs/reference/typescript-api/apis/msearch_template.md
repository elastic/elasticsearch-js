# Client.msearch_template

Run multiple templated searches. Run multiple templated searches with a single request. If you are providing a text file or text input to `curl`, use the `--data-binary` flag instead of `-d` to preserve newlines. For example: ``` $ cat requests { "index": "my-index" } { "id": "my-search-template", "params": { "query_string": "hello world", "from": 0, "size": 10 }} { "index": "my-other-index" } { "id": "my-other-search-template", "params": { "query_type": "match_all" }} $ curl -H "Content-Type: application/x-ndjson" -XGET localhost:9200/_msearch/template --data-binary "@requests"; echo ```

## Method Signature

```typescript
client.msearch_template(this: That, params: T.MsearchTemplateRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.MsearchTemplateResponse<TDocument, TAggregations>>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`MsearchTemplateRequest`](../types/MsearchTemplateRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.MsearchTemplateResponse<TDocument, TAggregations>>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
