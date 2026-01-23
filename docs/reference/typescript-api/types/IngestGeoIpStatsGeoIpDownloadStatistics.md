# IngestGeoIpStatsGeoIpDownloadStatistics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `successful_downloads` | [`integer`](integer.md) | Total number of successful database downloads. |
| `failed_downloads` | [`integer`](integer.md) | Total number of failed database downloads. |
| `total_download_time` | [`DurationValue`](DurationValue.md)<UnitMillis> | Total milliseconds spent downloading databases. |
| `databases_count` | [`integer`](integer.md) | Current number of databases available for use. |
| `skipped_updates` | [`integer`](integer.md) | Total number of database updates skipped. |
| `expired_databases` | [`integer`](integer.md) | Total number of databases not updated after 30 days |

## See Also

- [All Types](./)
- [API Methods](../index.md)
