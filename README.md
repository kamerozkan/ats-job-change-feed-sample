# ATS Job Scraper API and Career Page Monitor Examples

[![Validate examples](https://github.com/kamerozkan/ats-job-change-feed-sample/actions/workflows/validate-examples.yml/badge.svg)](https://github.com/kamerozkan/ats-job-change-feed-sample/actions/workflows/validate-examples.yml)

> **Live maintained API:** [Run ATS Jobs Scraper API on Apify](https://apify.com/kamerozkan/ats-job-change-feed)

Production-oriented input and output examples for an **ATS job scraper API**, **career page
monitor**, and **job change feed** covering eight applicant tracking systems:
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
| [`ten-minute-freshness-monitor.json`](examples/ten-minute-freshness-monitor.json) | Configure a stable watchlist for frequent change and SLA monitoring |
| [`ten-thousand-board-catalog.json`](examples/ten-thousand-board-catalog.json) | Configure one deterministic chunk of the optional large candidate catalog |
| [`company-domain-discovery.sample.json`](outputs/company-domain-discovery.sample.json) | Sanitized dataset output for a board discovered from a company careers page |
| [`greenhouse-change-monitor.sample.json`](outputs/greenhouse-change-monitor.sample.json) | Sanitized `UPDATED` event with its embedded normalized job |
| [`multi-ats-current-jobs.sample.json`](outputs/multi-ats-current-jobs.sample.json) | Sanitized current-job records from two ATS formats |
| [`dataset-record.schema.json`](schema/dataset-record.schema.json) | Machine-readable schema for dataset records |
| [`data-schema.md`](docs/data-schema.md) | Human-readable field and output-mode guide |
| [`pilot-500-boards.json`](benchmarks/pilot-500-boards.json) | Fixed 500-board benchmark input used on 26 July 2026 |
| [`pilot-500-initial-report.json`](benchmarks/pilot-500-initial-report.json) | First pass and immediate-repeat results, including the repeat-rate limitation |
| [`pilot-500-recheck-report.json`](benchmarks/pilot-500-recheck-report.json) | Rate-limited 500/500 adapter recheck report |

The five inputs are synchronized with the maintained Actor package. The output files are
clearly labeled, structurally valid, sanitized samples that avoid redistributing third-party
job descriptions.

## Release verification and reproducible benchmark

[Actor build `1.0.24`](https://api.apify.com/v2/actor-builds/bRGRcBuMoQw4W5Hov)
was verified on 11 August 2026 with 48/48 deterministic tests and 8/8 live ATS
endpoint checks. Owner-authenticated cloud smoke run `ClCFFczmcOc2zBmsq` returned 13
normalized Greenhouse jobs with one requested board, one successful board, and zero
failed boards. Apify keeps that run's storage access-controlled; the fixed benchmark
below is the public reproducible artifact.

The fixed public benchmark is intentionally date-scoped. On 26 July 2026, its first pass
resolved all 500 boards and observed 15,923 open jobs. An immediate repeat reached only 89.2%
because several providers rate-limited the burst. The provider-aware recheck then completed
500/500 boards across all eight adapters. Both reports and the exact board list are included
above so the published claim can be audited instead of taken on trust.

The current release gate also validates unit and regression tests, TypeScript, all Apify
schemas, publishing assets, and the complete dependency tree. Live endpoint checks are kept
separate from deterministic CI because public career boards can be renamed, removed, or
temporarily rate-limited.

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

## Use from JavaScript or Python

```javascript
import { ApifyClient } from 'apify-client';

const client = new ApifyClient({ token: process.env.APIFY_TOKEN });
const run = await client.actor('kamerozkan/ats-job-change-feed').call({
  companyUrls: ['https://linear.app/careers'],
  outputMode: 'changes',
  watchlistId: 'linear-watchlist',
});
const { items } = await client.dataset(run.defaultDatasetId).listItems();
```

```python
import os
from apify_client import ApifyClient

client = ApifyClient(os.environ["APIFY_TOKEN"])
run = client.actor("kamerozkan/ats-job-change-feed").call(run_input={
    "companyUrls": ["https://linear.app/careers"],
    "outputMode": "changes",
    "watchlistId": "linear-watchlist",
})
items = client.dataset(run["defaultDatasetId"]).list_items().items
```

## Preview the core inputs

<details>
<summary><strong>1. Discover a board from a company careers page</strong></summary>

```json
{
  "boards": [],
  "companyUrls": [
    "https://linear.app/careers"
  ],
  "outputMode": "changes",
  "watchlistId": "linear-company-discovery",
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
  "watchlistId": "greenhouse-example",
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
  "watchlistId": "multi-ats-example",
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

Keep one stable `watchlistId` per monitor and do not overlap runs that use the
same ID. Existing integrations that send the legacy `stateKey` field remain supported.

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

## Common use cases

- Monitor competitor career pages for new, updated, and closed roles.
- Create B2B hiring signals from primary company sources.
- Build job alerts without repeatedly processing unchanged snapshots.
- Normalize Greenhouse, Workday, Lever, Ashby, Workable, Personio, Recruitee, and
  Teamtailor records into one schema.
- Analyze DACH locations, KldB groups, languages, skills, salary signals, and remote work.

## Pricing behavior

The hosted Actor uses pay-per-event billing. One Actor-start event is charged per run and one
`job-result` event is charged per dataset row. In `changes` mode, unchanged jobs write no
dataset rows and create no `job-result` charges. Plan-based volume discounts are configured;
see the [live Store pricing](https://apify.com/kamerozkan/ats-job-change-feed) before running a
large baseline.

## FAQ

### Why can a successful run return an empty dataset?

In `changes` mode, an empty dataset normally means there were no changes after the baseline.
Check `RUN_SUMMARY` in the run's default key-value store for board failures or budget deferrals.

### How are false closures prevented?

The Actor keeps the previous snapshot when a board times out, is throttled, or returns a
malformed response. A failed source therefore cannot create synthetic `CLOSED` events.

### Does it need an ATS login?

No. The Actor reads public company career pages and public job feeds only. It does not access
candidate profiles, applications, resumes, or private ATS accounts.

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
