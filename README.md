# @fjell/validation

Validation logic for Fjell items and keys. This package contains validators that can be used on both client and server side.

## Installation

```bash
npm install @fjell/validation
```

## Usage

```typescript
import { validatePriKey } from '@fjell/validation';
import { PriKey } from '@fjell/types';

const key: PriKey<'user'> = { kt: 'user', pk: '123' };

// Validate a primary key (throws on invalid shape/type)
validatePriKey(key, 'user', 'example');
console.log('Valid primary key');
```

