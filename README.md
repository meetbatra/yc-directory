# YC Directory 🚀

A modern startup pitch platform where entrepreneurs can submit their startup ideas, discover other pitches, and get noticed in a virtual community. Built with Next.js 16, Sanity CMS, and NextAuth.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Sanity](https://img.shields.io/badge/Sanity-4.11-red?style=flat-square&logo=sanity)

## 🌟 Features

### Core Functionality
- **Browse Startups** - Explore all startup pitches with real-time updates via Sanity Live
- **Search & Filter** - Find startups by title, category, or author name
- **Submit Pitches** - Authenticated users can submit their startup ideas with markdown support
- **User Authentication** - Secure GitHub OAuth integration with NextAuth v5
- **User Profiles** - View user profiles with all their submitted startups
- **View Tracking** - Automatic view count tracking for each startup pitch
- **Editor Picks** - Curated playlists featuring selected startups

### Technical Features
- **Real-time Content** - Sanity Live integration for instant content updates
- **Markdown Support** - Rich text editing for startup pitches with markdown rendering
- **Type Safety** - Full TypeScript coverage with Sanity type generation
- **Error Monitoring** - Sentry integration for production error tracking
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Server Actions** - Modern Next.js server actions for form submissions
- **Image Optimization** - Next.js Image component for optimal performance

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS 4 with shadcn/ui components
- **Forms:** React Hook Form with Zod validation
- **Markdown Editor:** @uiw/react-md-editor
- **Notifications:** Sonner (toast notifications)
- **Icons:** Lucide React

### Backend & CMS
- **CMS:** Sanity 4.11 (headless CMS)
- **Authentication:** NextAuth v5 (GitHub OAuth)
- **Type Safety:** Sanity type generation
- **Content Queries:** GROQ (Graph-Relational Object Queries)

### Additional Tools
- **Monitoring:** Sentry for error tracking
- **Type Generation:** Automated Sanity schema to TypeScript
- **Code Quality:** ESLint with Next.js config

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 20+ 
- npm 10.9.2 or higher
- A GitHub account (for OAuth)
- A Sanity account (for CMS)
- A Sentry account (for error monitoring - optional)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd yc_directory
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
AUTH_SECRET=your-auth-secret
AUTH_GITHUB_ID=your-github-oauth-client-id
AUTH_GITHUB_SECRET=your-github-oauth-client-secret

# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-sanity-project-id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_WRITE_TOKEN=your-sanity-write-token

# Sentry (Optional)
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
```

### 4. Set Up Sanity Studio

The project includes Sanity Studio for content management:

```bash
# Generate TypeScript types from Sanity schemas
npm run typegen

# The studio is accessible at /studio route when running the dev server
```

### 5. Configure GitHub OAuth

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set the Authorization callback URL to: `http://localhost:3000/api/auth/callback/github`
4. Copy the Client ID and Client Secret to your `.env.local`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

The Sanity Studio is available at [http://localhost:3000/studio](http://localhost:3000/studio).

## 📁 Project Structure

```
yc_directory/
├── app/                          # Next.js App Router
│   ├── (root)/                   # Main application routes
│   │   ├── page.tsx              # Home page with startup listings
│   │   ├── startup/
│   │   │   ├── [id]/             # Startup detail page
│   │   │   └── create/           # Create new startup form
│   │   └── user/[id]/            # User profile page
│   ├── api/auth/                 # NextAuth API routes
│   ├── studio/                   # Sanity Studio route
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── Navbar.tsx                # Navigation component
│   ├── SearchForm.tsx            # Search functionality
│   ├── StartupCard.tsx           # Startup card component
│   ├── StartupForm.tsx           # Create startup form
│   ├── UserStartups.tsx          # User's startup list
│   ├── View.tsx                  # View counter component
│   └── ui/                       # shadcn/ui components
├── lib/                          # Utility functions
│   ├── actions.ts                # Server actions
│   ├── utils.ts                  # Helper functions
│   └── validation.ts             # Zod schemas
├── sanity/                       # Sanity CMS configuration
│   ├── schemaTypes/              # Content schemas
│   │   ├── author.ts             # Author schema
│   │   ├── startup.ts            # Startup schema
│   │   └── playlist.ts           # Playlist schema
│   ├── lib/
│   │   ├── client.ts             # Sanity client (read)
│   │   ├── write-client.ts       # Sanity client (write)
│   │   ├── queries.ts            # GROQ queries
│   │   └── live.ts               # Real-time updates
│   └── env.ts                    # Environment variables
├── auth.ts                       # NextAuth configuration
└── package.json
```

## 🔑 Key Files Explained

### Authentication (`auth.ts`)
- Configures NextAuth with GitHub provider
- Automatically creates user records in Sanity on first sign-in
- Manages JWT and session callbacks

### Server Actions (`lib/actions.ts`)
- `createPitch`: Creates new startup entries in Sanity
- Uses server-side validation and authentication checks

### Sanity Queries (`sanity/lib/queries.ts`)
- `STARTUPS_QUERY`: Fetches all startups with search functionality
- `STARTUP_BY_ID_QUERY`: Fetches single startup details
- `AUTHOR_BY_ID_QUERY`: Fetches user profile data
- `PLAYLIST_BY_SLUG_QUERY`: Fetches curated startup collections

### Content Schemas (`sanity/schemaTypes/`)
- **Author**: User profiles (synced from GitHub)
- **Startup**: Startup pitch content with markdown support
- **Playlist**: Curated collections of startups

## 🎨 UI Components

Built with **shadcn/ui** components:
- Avatar
- Button
- Input
- Textarea
- Skeleton (loading states)
- Sonner (notifications)

## 🔄 Scripts

```bash
# Development
npm run dev           # Start development server with type generation

# Production
npm run build         # Build for production (includes type generation)
npm start             # Start production server

# Code Quality
npm run lint          # Run ESLint

# Sanity
npm run typegen       # Generate TypeScript types from Sanity schemas
```

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add all environment variables from `.env.local`
4. Deploy!

Vercel automatically detects Next.js projects and configures build settings.

### Important Notes
- Ensure all environment variables are set in Vercel
- Update GitHub OAuth callback URL to your production URL
- The Sanity Studio will be accessible at `yourdomain.com/studio`

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `AUTH_SECRET` | Random string for NextAuth encryption | Yes |
| `AUTH_GITHUB_ID` | GitHub OAuth Client ID | Yes |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Client Secret | Yes |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Yes |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset (usually 'production') | Yes |
| `SANITY_WRITE_TOKEN` | Sanity API token with write permissions | Yes |
| `SENTRY_DSN` | Sentry project DSN | No |
| `SENTRY_ORG` | Sentry organization | No |
| `SENTRY_PROJECT` | Sentry project name | No |

## 🐛 Known Issues

### Dependency Conflicts
If you encounter peer dependency issues with `next-auth@5.0.0-beta.29` and `next@16.0.0`:

```bash
npm install --legacy-peer-deps
```

This is due to next-auth beta version compatibility. The application works correctly despite the warning.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- CMS powered by [Sanity](https://www.sanity.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication with [NextAuth](https://next-auth.js.org/)
- Error monitoring by [Sentry](https://sentry.io/)

---

**Made with ❤️ by Meet Batra**
