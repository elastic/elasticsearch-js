# Client.text_structure.testGrokPattern

Test a Grok pattern. Test a Grok pattern on one or more lines of text. The API indicates whether the lines match the pattern together with the offsets and lengths of the matched substrings.

## Method Signature

```typescript
client.text_structure.testGrokPattern(this: That, params: T.TextStructureTestGrokPatternRequest, options?: TransportRequestOptionsWithOutMeta): Promise<T.TextStructureTestGrokPatternResponse>
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `this` | `That` | - |
| `params` | [`TextStructureTestGrokPatternRequest`](../types/TextStructureTestGrokPatternRequest.md) | - |
| `options?` | `TransportRequestOptionsWithOutMeta` | - |

### Returns

`Promise<T.TextStructureTestGrokPatternResponse>`

## See Also

- [Client](../client.md)
- [All APIs](../index.md)
