# `MlGetJobStatsRequest` [interface-MlGetJobStatsRequest]

| Name | Type | Description |
| - | - | - |
| `allow_no_match` | boolean | Specifies what to do when the request: 1. Contains wildcard expressions and there are no jobs that match. 2. Contains the _all string or no identifiers and there are no matches. 3. Contains wildcard expressions and there are only partial matches. If `true`, the API returns an empty `jobs` array when there are no matches and the subset of results when there are partial matches. If `false`, the API returns a `404` status code when there are no matches or only partial matches. |
| `body` | string | ({ [key: string]: any; } & { job_id?: never; allow_no_match?: never; }) | All values in `body` will be added to the request body. |
| `job_id` | [Id](./Id.md) | Identifier for the anomaly detection job. It can be a job identifier, a group name, a comma-separated list of jobs, or a wildcard expression. If you do not specify one of these options, the API returns information for all anomaly detection jobs. |
| `querystring` | { [key: string]: any; } & { job_id?: never; allow_no_match?: never; } | All values in `querystring` will be added to the request querystring. |
