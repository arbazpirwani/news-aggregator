# Architecture Overview

This project follows Clean Architecture principles with three main layers:

## Domain Layer (/domain)
- **Entities**: Core business models
- **Repositories**: Repository interfaces (contracts)
- **UseCases**: Business logic implementation

## Data Layer (/data)
- **API**: External API clients
- **DTO**: Data Transfer Objects
- **Mappers**: Convert DTOs to Entities
- **Repositories**: Repository implementations

## Presentation Layer (/presentation)
- **Components**: Atomic Design Pattern
    - Atoms: Basic UI elements
    - Molecules: Composite components
    - Organisms: Complex UI sections
    - Templates: Page layouts
- **Pages**: Route components
- **Hooks**: Custom React hooks (ViewModel equivalent)
- **Context**: Global state management

## Core (/core)
- Shared utilities and constants