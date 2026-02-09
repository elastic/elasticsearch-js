import { Client } from "@elastic/elasticsearch"; const c = new Client({ node: "http://localhost:9200" }); console.log("Client created:", typeof c); process.exit(0);
