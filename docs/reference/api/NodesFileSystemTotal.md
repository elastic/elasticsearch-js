## Interface `NodesFileSystemTotal`

| Name | Type | Description |
| - | - | - |
| `available_in_bytes` | [long](./long.md) | Total number of bytes available to this Java virtual machine on all file stores. Depending on OS or process level restrictions, this might appear less than `free_in_bytes`. This is the actual amount of free disk space the Elasticsearch node can utilise. |
| `available` | string | Total disk space available to this Java virtual machine on all file stores. Depending on OS or process level restrictions, this might appear less than `free`. This is the actual amount of free disk space the Elasticsearch node can utilise. |
| `free_in_bytes` | [long](./long.md) | Total number of unallocated bytes in all file stores. |
| `free` | string | Total unallocated disk space in all file stores. |
| `total_in_bytes` | [long](./long.md) | Total size of all file stores in bytes. |
| `total` | string | Total size of all file stores. |
