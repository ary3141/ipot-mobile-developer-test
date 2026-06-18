# Restaurant Ordering App (React Native)

A mobile food ordering application built with Expo React Native.

## Features

- QR table scanning
- Restaurant menu browsing
- Category filtering & search
- Item detail screen
- Food customization
- Special instructions / notes
- Dynamic cart management
- Order tracking timeline
- Zustand state management
- Mocked API integration

---

# Tech Stack

- Expo
- React Native
- Expo Router
- Zustand
- TypeScript

---

# Project Structure

```bash
src/
 ├── api/          Mocked API layer
 ├── components/   Reusable UI components
 ├── constants/    Theme & styling constants
 ├── data/         Mocked data
 ├── models/       TypeScript models
 ├── screens/      Screen components
 ├── state/        Zustand store
 └── utils/        Helper utilities
```

---

# How to Run

## Install dependencies

```bash
npm install
```

## Start development server

```bash
npx expo start
```

Then run using:

- iOS Simulator
- Android Emulator
- Expo Go

---

# Tests

The project includes unit tests for Zustand cart state management.

Current test coverage includes:
- adding items to cart
- increasing quantity for duplicate items
- handling customized cart items separately

Run tests with:

```md
```bash
npm test
```

# Test QR

Use this QR code to test the app:

<img src="assets/images/qr-code.png" width="220" />

---

# Architecture Notes

This project uses a mocked local API layer (`menuApi.ts`, `orderApi.ts`) to simulate backend integration without requiring a live server.

Navigation is handled using Expo Router with file-based routing.

State management is handled using Zustand.

---

# Main User Flow

1. Scan restaurant table QR
2. Connect to restaurant table
3. Browse menu
4. Customize food item
5. Add to cart
6. Submit order
7. Track order status

---
# Demo

A demo recording of the application can be found here:

[Demo Video](https://youtube.com/shorts/bnvlXjBy47Y)

---
# Notes

- This project was optimized for clean architecture and UI/UX polish.
- Menu images are represented using emoji-based placeholders.
- Order tracking currently uses mocked timeline progression.
- No environment variables are required because the app currently uses mocked local API data.
