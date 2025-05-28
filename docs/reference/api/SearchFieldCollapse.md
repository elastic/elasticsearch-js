# `SearchFieldCollapse` [interface-SearchFieldCollapse]

| Name | Type | Description |
| - | - | - |
| `collapse` | [SearchFieldCollapse](./SearchFieldCollapse.md) | &nbsp; |
| `field` | [Field](./Field.md) | The field to collapse the result set on |
| `inner_hits` | [SearchInnerHits](./SearchInnerHits.md) | [SearchInnerHits](./SearchInnerHits.md)[] | The number of inner hits and their sort order |
| `max_concurrent_group_searches` | [integer](./integer.md) | The number of concurrent requests allowed to retrieve the inner_hits per group |
