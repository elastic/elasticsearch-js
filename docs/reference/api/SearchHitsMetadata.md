# `SearchHitsMetadata` [interface-SearchHitsMetadata]

| Name | Type | Description |
| - | - | - |
| `hits` | [SearchHit](./SearchHit.md)<T>[] | &nbsp; |
| `max_score` | [double](./double.md) | null | &nbsp; |
| `total` | [SearchTotalHits](./SearchTotalHits.md) | [long](./long.md) | Total hit count information, present only if `track_total_hits` wasn't `false` in the search request. |
