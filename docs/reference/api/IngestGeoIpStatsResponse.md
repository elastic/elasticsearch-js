## Interface `IngestGeoIpStatsResponse`

| Name | Type | Description |
| - | - | - |
| `nodes` | Record<[Id](./Id.md), [IngestGeoIpStatsGeoIpNodeDatabases](./IngestGeoIpStatsGeoIpNodeDatabases.md)> | Downloaded GeoIP2 databases for each node. |
| `stats` | [IngestGeoIpStatsGeoIpDownloadStatistics](./IngestGeoIpStatsGeoIpDownloadStatistics.md) | Download statistics for all GeoIP2 databases. |
