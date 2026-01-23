# ElasticsearchVersionInfo

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `build_date` | [`DateTime`](DateTime.md) | The Elasticsearch Git commit's date. |
| `build_flavor` | `string` | The build flavor. For example, `default`. |
| `build_hash` | `string` | The Elasticsearch Git commit's SHA hash. |
| `build_snapshot` | `boolean` | Indicates whether the Elasticsearch build was a snapshot. |
| `build_type` | `string` | The build type that corresponds to how Elasticsearch was installed.
For example, `docker`, `rpm`, or `tar`. |
| `lucene_version` | [`VersionString`](VersionString.md) | The version number of Elasticsearch's underlying Lucene software. |
| `minimum_index_compatibility_version` | [`VersionString`](VersionString.md) | The minimum index version with which the responding node can read from disk. |
| `minimum_wire_compatibility_version` | [`VersionString`](VersionString.md) | The minimum node version with which the responding node can communicate.
Also the minimum version from which you can perform a rolling upgrade. |
| `number` | `string` | The Elasticsearch version number.

::: IMPORTANT: For Serverless deployments, this static value is always `8.11.0` and is used solely for backward compatibility with legacy clients.
 Serverless environments are versionless and automatically upgraded, so this value can be safely ignored. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
