# `IngestGeoIpStatsGeoIpDownloadStatistics` [interface-IngestGeoIpStatsGeoIpDownloadStatistics]

| Name | Type | Description |
| - | - | - |
| `databases_count` | [integer](./integer.md) | Current number of databases available for use. |
| `expired_databases` | [integer](./integer.md) | Total number of databases not updated after 30 days |
| `failed_downloads` | [integer](./integer.md) | Total number of failed database downloads. |
| `skipped_updates` | [integer](./integer.md) | Total number of database updates skipped. |
| `successful_downloads` | [integer](./integer.md) | Total number of successful database downloads. |
| `total_download_time` | [DurationValue](./DurationValue.md)<[UnitMillis](./UnitMillis.md)> | Total milliseconds spent downloading databases. |
