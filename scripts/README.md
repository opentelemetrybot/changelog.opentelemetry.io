# Workflow Permissions Verification

This directory contains scripts to verify that GitHub workflow files comply with OpenSSF Scorecard Token-Permissions requirements.

## Background

The OpenSSF Scorecard Token-Permissions check requires that all GitHub workflow files have minimum token permissions defined to improve security posture.

## Requirements

All workflow files must have:
- Root-level `permissions:` block
- Root-level permissions limited to either:
  - `permissions: read-all` (recommended)
  - `permissions: { contents: read }` (recommended)
- Job-level permissions only when specific write permissions are needed

## Usage

Run the verification script from the repository root:

```bash
python scripts/verify-workflow-permissions.py
```

## Current Status

All workflow files in this repository are compliant:
- ✅ ci.yml: `permissions: contents: read`
- ✅ fossa.yml: `permissions: contents: read`
- ✅ test.yml: `permissions: contents: read`
- ✅ ossf-scorecard.yml: `permissions: contents: read` with appropriate job-level permissions

## Dependencies

- Python 3.x
- PyYAML: `pip install PyYAML`