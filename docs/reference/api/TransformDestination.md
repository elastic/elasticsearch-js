## Interface `TransformDestination`

| Name | Type | Description |
| - | - | - |
| `index` | [IndexName](./IndexName.md) | The destination index for the transform. The mappings of the destination index are deduced based on the source fields when possible. If alternate mappings are required, use the create index API prior to starting the transform. |
| `pipeline` | string | The unique identifier for an ingest pipeline. |
