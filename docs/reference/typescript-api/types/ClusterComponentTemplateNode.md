# ClusterComponentTemplateNode

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `template` | [`ClusterComponentTemplateSummary`](ClusterComponentTemplateSummary.md) | - |
| `version?` | [`VersionNumber`](VersionNumber.md) | - |
| `_meta?` | [`Metadata`](Metadata.md) | - |
| `deprecated?` | `boolean` | - |
| `created_date?` | [`DateTime`](DateTime.md) | Date and time when the component template was created. Only returned if the `human` query parameter is `true`. |
| `created_date_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | Date and time when the component template was created, in milliseconds since the epoch. |
| `modified_date?` | [`DateTime`](DateTime.md) | Date and time when the component template was last modified. Only returned if the `human` query parameter is `true`. |
| `modified_date_millis?` | [`EpochTime`](EpochTime.md)<UnitMillis> | Date and time when the component template was last modified, in milliseconds since the epoch. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
