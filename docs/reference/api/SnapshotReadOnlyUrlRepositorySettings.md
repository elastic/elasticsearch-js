## Interface `SnapshotReadOnlyUrlRepositorySettings`

| Name | Type | Description |
| - | - | - |
| `http_max_retries` | [integer](./integer.md) | The maximum number of retries for HTTP and HTTPS URLs. |
| `http_socket_timeout` | [Duration](./Duration.md) | The maximum wait time for data transfers over a connection. |
| `max_number_of_snapshots` | [integer](./integer.md) | The maximum number of snapshots the repository can contain. The default is `Integer.MAX_VALUE`, which is 2^31-1 or `2147483647`. |
| `url` | string | The URL location of the root of the shared filesystem repository. The following protocols are supported: * `file` * `ftp` * `http` * `https` * `jar`URLs using the HTTP, HTTPS, or FTP protocols must be explicitly allowed with the `repositories.url.allowed_urls` cluster setting. This setting supports wildcards in the place of a host, path, query, or fragment in the URL. URLs using the file protocol must point to the location of a shared filesystem accessible to all master and data nodes in the cluster. This location must be registered in the `path.repo` setting. You don't need to register URLs using the FTP, HTTP, HTTPS, or JAR protocols in the `path.repo` setting. |
