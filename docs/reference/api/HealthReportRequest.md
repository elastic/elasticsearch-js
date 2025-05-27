## Interface `HealthReportRequest`

| Name | Type | Description |
| - | - | - |
| `body` | string | ({ [key: string]: any; } & { feature?: never; timeout?: never; verbose?: never; size?: never; }) | All values in `body` will be added to the request body. |
| `feature` | string | string[] | A feature of the cluster, as returned by the top-level health report API. |
| `querystring` | { [key: string]: any; } & { feature?: never; timeout?: never; verbose?: never; size?: never; } | All values in `querystring` will be added to the request querystring. |
| `size` | [integer](./integer.md) | Limit the number of affected resources the health report API returns. |
| `timeout` | [Duration](./Duration.md) | Explicit operation timeout. |
| `verbose` | boolean | Opt-in for more information about the health of the system. |
