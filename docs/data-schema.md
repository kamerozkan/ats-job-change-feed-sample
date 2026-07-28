# Dataset schema guide

The Actor writes two record types to the default dataset:

- `job`: one currently open normalized job
- `change`: a deterministic `CREATED`, `UPDATED`, or `CLOSED` event

The exact machine-readable contract is in
[`schema/dataset-record.schema.json`](../schema/dataset-record.schema.json).
Provider-specific additions remain allowed for forward compatibility.

## Core fields

Every dataset record includes these required fields:

| Field | Meaning |
| --- | --- |
| `recordType` | `job` or `change` |
| `jobKey` | Stable source identity used for snapshot comparison |
| `ats` | Greenhouse, Lever, Ashby, Workable, Recruitee, Personio, Teamtailor, or Workday |
| `boardSlug` | Provider-specific board identifier |
| `company` | Normalized company display name |
| `title` | Normalized job title |
| `sourceUrl` | Public source job URL |

## Job identity and status

| Field | Meaning |
| --- | --- |
| `id` | Deterministic normalized record ID |
| `sourceJobId` | Original provider job ID |
| `status` | `OPEN` or `CLOSED` |
| `firstSeenAt` | First observation time |
| `lastSeenAt` | Most recent successful observation time |
| `scrapedAt` | Retrieval time for the current record |

## Source and discovery provenance

| Field | Meaning |
| --- | --- |
| `boardUrl` | Public ATS board URL |
| `sourceApiUrl` | Public source endpoint used by the adapter |
| `boardOrigin` | `explicit` or `discovered` |
| `discoveredFrom` | Company page that led to the board |
| `companyDomain` | Domain used for company identity when available |

## Normalized job details

Common fields include `locations`, `primaryLocation`, `department`, `team`,
`employmentType`, `workplaceType`, `salary`, `publishedAt`, and `updatedAt`.
Descriptions are available as `descriptionText` and `descriptionHtml` when
`includeDescriptions` is enabled.

## DACH enrichment

`locationDetails` and `dachRegion` normalize German, Austrian, and Swiss
locations. `kldb` contains conservative KldB occupational metadata.
`languageRequirements`, `skills`, and `salary` contain deterministic
enrichment with source or confidence metadata where applicable.

## Duplicate metadata

The Actor keeps source records auditable rather than silently deleting likely
duplicates:

| Field | Meaning |
| --- | --- |
| `companyId` | Stable normalized company identity |
| `canonicalJobId` | Canonical identity shared by likely duplicates |
| `duplicateGroupId` | Group identifier, or `null` |
| `isDuplicate` | Whether this is a non-canonical group member |
| `duplicateOf` | Canonical record ID, or `null` |

## Change records

A change record adds:

| Field | Meaning |
| --- | --- |
| `eventType` | `CREATED`, `UPDATED`, or `CLOSED` |
| `eventId` | Deterministic event identity |
| `detectedAt` | Time the change was detected |
| `changedFields` | Normalized fields that changed |
| `job` | Full normalized job associated with the event |

On source failure, the Actor preserves that board's previous snapshot and does
not emit synthetic `CLOSED` events. A snapshot advances only after the board's
complete output is stored.

