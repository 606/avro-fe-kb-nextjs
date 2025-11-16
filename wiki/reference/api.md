---
title: API Reference
description: API documentation and reference
---

# API Reference

This page contains technical reference documentation.

## Core APIs

### Content API

The content API allows you to retrieve wiki pages programmatically.

```typescript
// Example API usage
const page = await getWikiPage('reference/api');
```

### Navigation API

The navigation API provides the tree structure for the sidebar.

```typescript
// Example usage
const tree = await getWikiTree();
```

## Related Documentation

- [[getting-started/introduction|Getting Started]]
- [[guides/how-to-use|Usage Guide]]
- [[index|Back to Home]]
