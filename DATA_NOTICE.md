# Data notice

This repository contains Actor input configurations, an output schema, and an
illustrative record that uses an example company. It does not include a bulk
dataset of third-party job postings.

The MIT License applies only to original code and documentation in this
repository. It does not grant rights to third-party company names, trademarks,
career-page content, job descriptions, or other source data.

Public accessibility does not by itself create a redistribution license.
Anyone collecting, storing, analyzing, or redistributing job data is
responsible for reviewing the relevant source terms, robots guidance,
copyright and database rights, privacy rules, retention requirements, and
applicable law.

Keep `sourceUrl`, `boardUrl`, provenance fields, and retrieval timestamps where
available. Do not commit API tokens, candidate information, application data,
resumes, or other secrets.

## Release audit

- Actor version: `1.0.26`
- Build: `2q6dQtCcq3ytdjxkj`, successful on 2026-08-13
- Baseline smoke: `tNyT74OcZ5VMtmKWs`, 1/1 board, 17 unique `CREATED` rows
- Immediate repeat: `Ad26FZiUGsaBnHWy6`, zero duplicate rows and zero `job-result` charges
- Maximum charge: `$0.10` per smoke; platform usage was `$0.0005470156592842605` and
  `$0.00039059026687840627` respectively
- Scope: exact-build owner QA, not external customer or paid-retention evidence

The sanitized output fixtures in this repository were not regenerated for `1.0.26` and retain
their prior provenance. They demonstrate the public schema rather than the live smoke contents.

## Listing update on September 30, 2026

The Store title, description and search metadata were checked against the owned Actor and synchronized with this repository. This documentation update does not alter executable code, input or output schemas, recorded test outputs, artifact hashes, billing or runtime builds. Existing examples retain their original dates and validation limits. A public listing is not evidence of successful output, network acceptance or an achieved search ranking.
