# @fjell/validation - Agentic Guide

## Purpose

Validation utilities for keys, item payloads, schema constraints, and location metadata.

This guide is optimized for AI-assisted code generation and integration workflows.

## Documentation

- **[Usage Guide](./usage.md)** - API-oriented usage patterns and model-safe examples
- **[Integration Guide](./integration.md)** - Architecture placement, composition rules, and implementation guidance

## Key Capabilities

- Validates primary and contained key shapes before persistence operations
- Checks location metadata and schema-level constraints
- Returns structured validation errors for API and UI layers

## Installation

```bash
npm install @fjell/validation
```

## Public API Highlights

- `validateKey`, `validatePriKey`, `validateComKey`
- `validatePK`, `validateKeys`, `validateLocations`
- `validateSchema` and `ValidationError` for schema-driven validation
