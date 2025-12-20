# @fjell/validation

Validation logic for Fjell items and keys. This package contains validators that can be used on both client and server side.

## Installation

```bash
npm install @fjell/validation
```

## Usage

```typescript
import { ItemValidator, KeyValidator } from '@fjell/validation';
import { PriKey } from '@fjell/types';

const key: PriKey<'user'> = { kt: 'user', pk: '123' };

// Validate a key
if (KeyValidator.isPriKey(key)) {
  console.log('Valid primary key');
}
```

