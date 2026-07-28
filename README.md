> **Live API feed with ongoing maintenance:** [Run ATS Job Change Feed on Apify](https://apify.com/kamerozkan/ats-job-change-feed)

# ATS Job Change Feed Samples

Production-oriented input examples and a documented JSON schema for monitoring
public company career pages across eight applicant tracking systems:
Greenhouse, Workday, Lever, Ashby, Workable, Personio, Recruitee, and
Teamtailor.

The hosted Actor normalizes current jobs and emits deterministic `CREATED`,
`UPDATED`, and `CLOSED` events. It preserves the last successful snapshot when
a source fails, which prevents a temporary error from becoming a false mass
closure.

## What is included

| File | Use case |
| --- | --- |
| [`company-domain-discovery.json`](examples/company-domain-discovery.json) | Discover the ATS board from a public company careers page |
| [`greenhouse-change-monitor.json`](examples/greenhouse-change-monitor.json) | Monitor one Greenhouse board for created, updated, and closed jobs |
| [`multi-ats-current-jobs.json`](examples/multi-ats-current-jobs.json) | Return a current normalized snapshot across all eight supported ATS platforms |
| [`dataset-record.schema.json`](schema/dataset-record.schema.json) | Machine-readable schema for dataset records |
| [`data-schema.md`](docs/data-schema.md) | Human-readable field and output-mode guide |

These inputs are taken from the maintained Actor package rather than invented
fixtures.

## Run an example

Create an [Apify API token](https://console.apify.com/account/integrations),
store it in an environment variable, and call the Actor:

```bash
export APIFY_TOKEN="your_token_here"

curl --fail-with-body \
  --request POST \
  "https://api.apify.com/v2/acts/kamerozkan~ats-job-change-feed/run-sync-get-dataset-items" \
  --header "Authorization: Bearer ${APIFY_TOKEN}" \
  --header "Content-Type: application/json" \
  --data @examples/company-domain-discovery.json
```

Never commit an API token.

## Preview the three inputs

<details>
<summary><strong>1. Discover a board from a company careers page</strong></summary>

```json
{
  "boards": [],
  "companyUrls": [
    "https://linear.app/careers"
  ],
  "outputMode": "changes",
  "stateKey": "linear-company-discovery",
  "includeDescriptions": true,
  "includeCompensation": true,
  "emitInitialSnapshotChanges": true,
  "discoveryMaxPages": 5,
  "failOnDiscoveryError": true
}
```

</details>

<details>
<summary><strong>2. Monitor a Greenhouse board for job changes</strong></summary>

```json
{
  "boards": [
    {
      "url": "https://job-boards.greenhouse.io/greenhouse",
      "company": "Greenhouse"
    }
  ],
  "outputMode": "changes",
  "stateKey": "greenhouse-example",
  "includeDescriptions": true,
  "includeCompensation": true,
  "emitInitialSnapshotChanges": true,
  "maxConcurrency": 1,
  "failOnBoardError": true
}
```

</details>

<details>
<summary><strong>3. Fetch current jobs across eight ATS platforms</strong></summary>

```json
{
  "boards": [
    {
      "url": "https://job-boards.greenhouse.io/greenhouse",
      "company": "Greenhouse"
    },
    {
      "url": "https://jobs.lever.co/ae-2",
      "company": "AE"
    },
    {
      "url": "https://jobs.ashbyhq.com/linear",
      "company": "Linear"
    },
    {
      "url": "https://apply.workable.com/remote-talent-latam",
      "company": "Remote Talent LATAM"
    },
    {
      "url": "https://jobs.recruitee.com/api/offers",
      "company": "Tellent"
    },
    {
      "url": "https://personio.jobs.personio.de/xml",
      "company": "Personio"
    },
    {
      "url": "https://career.teamtailor.com/jobs",
      "company": "Teamtailor"
    },
    {
      "url": "https://workiva.wd503.myworkdayjobs.com/en-US/careers",
      "company": "Workiva"
    }
  ],
  "outputMode": "jobs",
  "stateKey": "multi-ats-example",
  "includeDescriptions": true,
  "includeCompensation": true,
  "maxConcurrency": 8,
  "failOnBoardError": true
}
```

</details>

## Output modes

- `changes`: Recommended for scheduled monitoring. The first run can emit the
  baseline as `CREATED`; later runs emit only created, updated, and closed jobs.
- `jobs`: Returns every currently open job on every run.
- `both`: Returns open jobs followed by change records.

Keep one stable `stateKey` per watchlist and do not overlap runs that use the
same key.

## Example change record

The record below is illustrative. It documents the shape without redistributing
a third-party job description.

```json
{
  "recordType": "change",
  "eventType": "UPDATED",
  "eventId": "e610c1cc6fd47d209e77fe40b7cf04c0",
  "detectedAt": "2026-07-26T10:15:00.000Z",
  "jobKey": "ashby:example:2b401986-a491-4f9b-9c22-63079bcd64c2",
  "ats": "ashby",
  "boardSlug": "example",
  "company": "Example GmbH",
  "title": "Senior Software Engineer",
  "primaryLocation": "Berlin, Germany",
  "sourceUrl": "https://jobs.ashbyhq.com/example/2b401986-a491-4f9b-9c22-63079bcd64c2",
  "changedFields": [
    "title",
    "salary"
  ],
  "job": {
    "recordType": "job",
    "status": "OPEN",
    "jobKey": "ashby:example:2b401986-a491-4f9b-9c22-63079bcd64c2",
    "ats": "ashby",
    "boardSlug": "example",
    "company": "Example GmbH",
    "title": "Senior Software Engineer",
    "sourceUrl": "https://jobs.ashbyhq.com/example/2b401986-a491-4f9b-9c22-63079bcd64c2"
  }
}
```

See the [schema guide](docs/data-schema.md) for identity, provenance, duplicate,
DACH enrichment, and change-event fields.

## Responsible use

The Actor reads public job postings only. It does not access candidate
profiles, applications, resumes, recruiter accounts, or private ATS data.

Review each source site's terms and applicable laws before storing or
redistributing job data. See [DATA_NOTICE.md](DATA_NOTICE.md).

## Links

- [Run the live Actor](https://apify.com/kamerozkan/ats-job-change-feed)
- [Open the Actor API page](https://apify.com/kamerozkan/ats-job-change-feed/api)
- [Read Apify API documentation](https://docs.apify.com/api/v2)

## License

Original code and documentation in this repository are available under the
[MIT License](LICENSE). Third-party job content is outside that license.

