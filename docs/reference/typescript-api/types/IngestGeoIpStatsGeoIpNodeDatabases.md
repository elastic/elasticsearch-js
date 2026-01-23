# IngestGeoIpStatsGeoIpNodeDatabases

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `databases` | [`IngestGeoIpStatsGeoIpNodeDatabaseName`](IngestGeoIpStatsGeoIpNodeDatabaseName.md)[] | Downloaded databases for the node. |
| `files_in_temp` | `string[]` | Downloaded database files, including related license files. Elasticsearch stores these files in the node’s temporary directory: $ES_TMPDIR/geoip-databases/<node_id>. |

## See Also

- [All Types](./)
- [API Methods](../index.md)
