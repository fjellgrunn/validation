# Usage Guide

Comprehensive usage guidance for `@fjell/validation`.

## Installation

```bash
npm install @fjell/validation
```

## API Highlights

- `validateKey`, `validatePriKey`, `validateComKey`
- `validatePK`, `validateKeys`, `validateLocations`
- `validateSchema` and `ValidationError` for schema-driven validation

## Quick Example

```ts
import { validatePriKey, ValidationError } from "@fjell/validation";

const result = validatePriKey({ pk: "widget#123", sk: "meta" });
if (!result.valid) {
  throw new ValidationError("Invalid key", result.errors);
}
```

## Model Consumption Rules

1. Import from the package root (`@fjell/validation`) instead of deep-internal paths unless explicitly documented.
2. Keep usage aligned with exported public symbols listed in this guide.
3. Prefer explicit typing at package boundaries so generated code remains robust during upgrades.
4. Keep error handling deterministic and map infrastructure failures into domain-level errors.
5. Co-locate integration wrappers in your app so model-generated code has one canonical entry point.

## Best Practices

- Keep examples and abstractions consistent with existing Fjell package conventions.
- Favor composable wrappers over one-off inline integration logic.
- Add targeted tests around generated integration code paths.
