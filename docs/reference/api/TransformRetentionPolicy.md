# `TransformRetentionPolicy` [interface-TransformRetentionPolicy]

| Name | Type | Description |
| - | - | - |
| `field` | [Field](./Field.md) | The date field that is used to calculate the age of the document. |
| `max_age` | [Duration](./Duration.md) | Specifies the maximum age of a document in the destination index. Documents that are older than the configured value are removed from the destination index. |
