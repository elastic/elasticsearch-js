# IngestGeoIpStatsGeoIpDownloadStatistics

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `successful_downloads` | `integer` | Total number of successful database downloads. |
| `failed_downloads` | `integer` | Total number of failed database downloads. |
| `total_download_time` | `DurationValue<UnitMillis>` | Total milliseconds spent downloading databases. |
| `databases_count` | `integer` | Current number of databases available for use. |
| `skipped_updates` | `integer` | Total number of database updates skipped. |
| `expired_databases` | `integer` | Total number of databases not updated after 30 days |

## See Also

- [All Types](./)
- [API Methods](../index.md)
