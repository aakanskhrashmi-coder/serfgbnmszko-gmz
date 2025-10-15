# ClipHub Discord Bot

## Overview
ClipHub Bot is a comprehensive Discord bot for managing clip campaigns and payouts. It helps server administrators manage content creators, track submissions, handle payouts, and moderate the community.

## Project Architecture

### Technology Stack
- **Runtime**: Node.js 20
- **Framework**: Discord.js v14
- **Database**: SQLite (better-sqlite3)
- **Scheduler**: node-cron (for weekly reports)
- **APIs**: YouTube Data API, TikTok (via RapidAPI)

### Project Structure
```
├── src/
│   ├── commands/          # Slash commands
│   │   ├── admin/        # Admin-only commands (39 commands)
│   │   └── user/         # User-accessible commands (22 commands)
│   ├── events/           # Discord event handlers
│   ├── handlers/         # Campaign and ticket handlers
│   ├── services/         # External API integrations
│   ├── utils/            # Utility functions
│   ├── database/         # Database initialization
│   └── index.js          # Main bot entry point
├── backups/              # Nuke operation backups
├── clipmaster.db         # SQLite database
└── deploy-commands.js    # Command deployment script
```

## Core Features

### Admin Commands (39)
- **Campaign Management**: addcampaign, endcampaign, campaigns
- **Clip Approval**: approveclip, rejectclip, flagclip
- **Payout Management**: approvepayout, rejectpayout, bonus
- **Moderation**: ban, kick, mute, timeout, warn, prune
- **Channel Management**: nuke, restorenuke, lock, unlock, slowmode
- **Utilities**: announce, poll, stats, exportdata

### User Commands (22)
- **Information**: help, botinfo, serverinfo, userinfo, channelinfo
- **Stats**: profile, mystats, leaderboard, rank
- **Campaigns**: campaigns, submit
- **Payouts**: setpayout, requestpayout
- **Invites**: invites, topinvites
- **Utilities**: ping, uptime, calculator, avatar, feedback

### Event Handlers
- Member join/leave/update logging
- Message edit/delete logging
- Interaction handling (slash commands)
- Auto-moderation with word filter
- Ticket system

### Special Features
- **Nuke System**: Backup and restore channels with full message history
- **Ticket System**: Support ticket creation and management
- **Campaign Tracking**: Track clip submissions and views
- **Payout System**: Manage creator payouts
- **Weekly Reports**: Automated reporting via cron jobs
- **Invite Tracking**: Monitor server growth

## Configuration

### Required Environment Variables

#### Discord Bot Settings
- `DISCORD_TOKEN` - Bot authentication token
- `CLIENT_ID` - Application client ID
- `GUILD_ID` - Server ID
- `DEVELOPER_ID` - Developer user ID

#### API Keys
- `YOUTUBE_API_KEY` - YouTube Data API key (optional)
- `RAPIDAPI_KEY` - RapidAPI key for TikTok (optional)

#### Channel IDs
- `SUPPORT_CHANNEL` - Support ticket channel
- `ACTIVE_CAMPAIGNS_CHANNEL` - Campaign announcements
- `MEMBER_LOGS_CHANNEL` - Member activity logs
- `MESSAGE_LOGS_CHANNEL` - Message edit/delete logs
- `COMMAND_LOGS_CHANNEL` - Command usage logs
- `ERROR_LOGS_CHANNEL` - Error logs
- `TICKET_LOGS_CHANNEL` - Ticket activity logs
- `ANNOUNCEMENTS_CHANNEL` - Weekly reports

#### Role IDs
- `VERIFIED_CLIPPER_ROLE` - Verified clipper role
- `STAFF_ROLE` - Staff role for tickets
- `TICKET_CATEGORY` - Ticket category ID
- `NUKE_MASTER_ROLE_ID` - Nuke command permission

### Optional Settings
- `AUTOMOD_ENABLED` - Enable auto-moderation (true/false)
- `WORD_FILTER_ENABLED` - Enable word filter (true/false)
- `RATE_LIMIT_SECONDS` - Submission rate limit

## Database Schema
The bot uses SQLite with tables for:
- Users (profiles, stats, payouts)
- Campaigns (active/ended campaigns)
- Clips (submissions, views, approval status)
- Warnings (moderation history)
- Invites (tracking)
- Tickets (support system)

## Deployment

### Development
The bot runs automatically via the configured workflow:
```bash
node src/index.js
```

### Deploying Commands
To register slash commands with Discord:
```bash
node deploy-commands.js
```

## Recent Changes
- **2025-10-14**: Initial Replit setup
  - Created package.json with all dependencies
  - Installed discord.js, dotenv, better-sqlite3, node-cron, axios, googleapis
  - Configured workflow for bot execution
  - Added .gitignore for Node.js project
  - Bot successfully connected to Discord server

## Maintenance Notes
- The bot automatically creates backups when using the nuke command
- Database is automatically initialized on startup
- Cron jobs run weekly reports
- All errors are logged to the designated error logs channel

## User Preferences
None specified yet.
