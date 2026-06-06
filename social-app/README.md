# Technical Stack

* Expo SDK 54
* Expo Router
* TypeScript
* Zustand
* Zod
* React Hook Form
* React Query (mock implementation)
* FlashList
* React Native Reanimated
* React Native Gesture Handler
* Expo Secure Store
* Expo Image
* Expo Vector Icons

Package manager:

pnpm

Generate pnpm installation commands.

---

# Project Architecture

src/

├── app/
├── components/
│   ├── ui/
│   ├── forms/
│   ├── cards/
│   ├── drawers/
│   ├── navigation/
│   └── common/
│
├── features/
│   ├── auth/
│   ├── profile/
│   ├── feed/
│   ├── requests/
│   ├── chats/
│   ├── settings/
│   └── customization/
│
├── store/
│   ├── auth.store.ts
│   ├── profile.store.ts
│   ├── feed.store.ts
│   ├── request.store.ts
│   ├── chat.store.ts
│   ├── settings.store.ts
│   └── theme.store.ts
│
├── hooks/
├── services/
├── schemas/
├── constants/
├── mock/
├── types/
└── utils/

---

# Authentication Module

## Login Screen

Fields:

* Email
* Password

Validation using Zod:

* Valid email
* Password minimum 8 characters

Features:

* Remember Me
* Forgot Password UI
* Login Button
* Google Login Button

---

## Signup Screen

Fields:

* Full Name
* Email
* Password

Validation:

* Name minimum 3 characters
* Email validation
* Password validation

Features:

* Google Signup
* Terms checkbox
* Success state

After signup:

Navigate to profile onboarding.

---

# Profile Onboarding

After signup user must complete profile.

Profile contains sections:

* Bio
* Education
* Profession
* Business
* Location
* Gender
* Looking For
* Interests
* Languages
* Social Links
* Photos

---

# Gender Filtering Logic

Mock logic:

Male users see only Female users.

Female users see only Male users.

Future ready architecture:

enum Gender

* male
* female
* other

enum LookingFor

* male
* female
* everyone

Filtering must be isolated inside feed selectors.

---

# Main Application Navigation

Bottom Tabs:

1. Home
2. Chats
3. Profile

---

# Home Feed

Home screen displays user cards.

Use FlashList.

Card contains:

* Profile Photo
* Name
* Age
* Short Bio
* Distance
* Interests

User can only see limited information.

Visible:

* Name
* Age
* Short Bio
* Interests

Hidden:

* Full Bio
* Photos
* Social Links
* Detailed Information

Until request is accepted.

---

# User Profile Detail

Route:

/feed/[id]

If request not accepted:

Show locked sections.

Blur premium content.

CTA:

"Send Profile Request"

Buttons:

* Send Request
* Report User
* Block User

---

# Request System

Mock request flow:

1. User sends profile request
2. Request stored in Zustand
3. Other user accepts request
4. Full profile unlocks

States:

* Pending
* Accepted
* Rejected

Create request store.

---

# Chat Permission System

User cannot chat directly.

Flow:

Send Chat Request

↓

Other User Accepts

↓

Chat Enabled

Create mock permissions.

---

# Chat Module

Screen:

/chats

Features:

* Search Chat
* Recent Chats
* Unread Count
* Online Status
* Last Message
* Last Seen

Use FlashList.

---

# Individual Chat

Route:

/chats/[id]

Features:

* Header
* User avatar
* Online status
* Messages
* Input
* Emoji button
* Attachment button
* Send button

---

# Profile Screen

Sections:

* Personal Information
* Bio
* Education
* Profession
* Business
* Photos
* Interests
* Preferences

---

# Settings Module
Structure:

Settings
├── Account
├── Theme
├── Notifications
├── Privacy
├── Storage
├── Security
└── About

---

# Account Settings

Options:

* Logout
* Logout All Devices
* Delete Account

---

# Notification Settings

Options:

* Push Notifications
* Chat Notifications
* Request Notifications
* Marketing Notifications


---

# Storage Settings

Options:

* Clear Cache
* Clear Images
* Reset App Data


---

# Privacy Settings

Options:

* Show Online Status
* Show Distance
* Show Profile Publicly
* Read Receipts

---

# Security Settings

Options:

* Biometric Login
* Device Sessions
* Change Password
---

# Theme System

## Theme 1

Name:

Ocean Blue

Colors:

Background: #F8FAFC
Surface: #FFFFFF
Primary: #2563EB
Secondary: #60A5FA
Success: #16A34A
Warning: #F59E0B
Error: #DC2626
Text: #0F172A

---

## Theme 2

Name:

Midnight Orange

Colors:

Background: #121212
Surface: #1E1E1E
Primary: #F97316
Secondary: #FB923C
Success: #22C55E
Warning: #FACC15
Error: #EF4444
Text: #F8FAFC

Use off-black.

Never use pure black.

---

## Theme 3

Name:

WhatsApp Green

Colors:

Background: #0B141A
Surface: #111B21
Primary: #25D366
Secondary: #34D399
Success: #25D366
Warning: #FACC15
Error: #EF4444
Text: #E9EDEF

Professional dark green palette.

---



# Mock Data

Create:

50 users

Each user:

* id
* name
* age
* gender
* location
* profession
* interests
* photos
* bio
* status

Generate realistic data.

---