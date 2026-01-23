# NodesRequestCounts

## Interface

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `GetBlobProperties?` | [`long`](long.md) | Number of Get Blob Properties requests (Azure) |
| `GetBlob?` | [`long`](long.md) | Number of Get Blob requests (Azure) |
| `ListBlobs?` | [`long`](long.md) | Number of List Blobs requests (Azure) |
| `PutBlob?` | [`long`](long.md) | Number of Put Blob requests (Azure) |
| `PutBlock?` | [`long`](long.md) | Number of Put Block (Azure) |
| `PutBlockList?` | [`long`](long.md) | Number of Put Block List requests |
| `GetObject?` | [`long`](long.md) | Number of get object requests (GCP, S3) |
| `ListObjects?` | [`long`](long.md) | Number of list objects requests (GCP, S3) |
| `InsertObject?` | [`long`](long.md) | Number of insert object requests, including simple, multipart and resumable uploads. Resumable uploads
can perform multiple http requests to insert a single object but they are considered as a single request
since they are billed as an individual operation. (GCP) |
| `PutObject?` | [`long`](long.md) | Number of PutObject requests (S3) |
| `PutMultipartObject?` | [`long`](long.md) | Number of Multipart requests, including CreateMultipartUpload, UploadPart and CompleteMultipartUpload requests (S3) |

## See Also

- [All Types](./)
- [API Methods](../index.md)
