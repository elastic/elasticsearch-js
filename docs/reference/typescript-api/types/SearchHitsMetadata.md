# SearchHitsMetadata

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `total?` | `SearchTotalHits | long` | Total hit count information, present only if `track_total_hits` wasn't `false` in the search request. |
| `hits` | [`SearchHit`](SearchHit.md)<T>[] | - |
| `max_score?` | `double | null` | - |

## See Also

- [All Types](./)
- [API Methods](../index.md)
