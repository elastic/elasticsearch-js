# IngestGrokProcessor

## Interface

### Extends

- [`IngestProcessorBase`](IngestProcessorBase.md)

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `ecs_compatibility?` | `string` | Must be disabled or v1. If v1, the processor uses patterns with Elastic
Common Schema (ECS) field names. |
| `field` | [`Field`](Field.md) | The field to use for grok expression parsing. |
| `ignore_missing?` | `boolean` | If `true` and `field` does not exist or is `null`, the processor quietly exits without modifying the document. |
| `pattern_definitions?` | `Record<string, string>` | A map of pattern-name and pattern tuples defining custom patterns to be used by the current processor.
Patterns matching existing names will override the pre-existing definition. |
| `patterns` | [`GrokPattern`](GrokPattern.md)[] | An ordered list of grok expression to match and extract named captures with.
Returns on the first expression in the list that matches. |
| `trace_match?` | `boolean` | When `true`, `_ingest._grok_match_index` will be inserted into your matched document’s metadata with the index into the pattern found in `patterns` that matched. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
