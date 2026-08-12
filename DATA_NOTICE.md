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

- Actor version: `1.0.25`
- Build: `CMLRI1bCJUD8Q6o0E`, successful on 2026-08-12
- Baseline smoke: `taPJKUXFQAB8u3YpF`, 1/1 board, 17 unique `CREATED` rows
- Immediate repeat: `W1zzg1pNne7kH3xbZ`, zero duplicate rows and zero `job-result` charges
- Scope: exact-build owner QA, not external customer or paid-retention evidence

The sanitized output fixtures in this repository were not regenerated for `1.0.25` and retain
their prior provenance. They demonstrate the public schema rather than the live smoke contents.
