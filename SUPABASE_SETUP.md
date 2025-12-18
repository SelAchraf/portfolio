## Step 1: Create a Supabase Project

1. Go to https://supabase.com
2. Sign in or create an account
3. Click **New Project**
4. Fill in the project details:
   - Project name: `portfolio-guestbook` (or your choice)
   - Database password: Create a strong password (save it!)
   - Region: Choose the closest to your users
5. Click **Create new project**

## Step 2: Create the Guestbook Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New query**
3. Paste the following SQL:

```sql
-- Create the guestbook table
CREATE TABLE guestbook (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  email VARCHAR(255),
  website VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  approved BOOLEAN DEFAULT true
);

-- Create an index on created_at for faster sorting
CREATE INDEX guestbook_created_at_idx ON guestbook(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anyone to read approved entries
CREATE POLICY "Anyone can read approved guestbook entries"
ON guestbook FOR SELECT
USING (approved = true);

-- Create a policy to allow anyone to insert entries
CREATE POLICY "Anyone can insert guestbook entries"
ON guestbook FOR INSERT
WITH CHECK (true);

-- Optional: Create a policy for authenticated users to update/delete
-- Uncomment if you want to add authentication later
-- CREATE POLICY "Authenticated users can update their own entries"
-- ON guestbook FOR UPDATE
-- USING (auth.uid() = user_id);
```

4. Click **Run** to execute the query

## Step 3: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under Project API keys)

## Step 4: Configure Your React App

Update your `.env` file with the Supabase credentials:

```env
# Add these to your existing .env file
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

## Step 5: Test the Connection

The Supabase client is already configured in `src/lib/supabase.js`. You can test it:

```javascript
import { fetchGuestbookEntries, addGuestbookEntry } from '@/lib/supabase'

// Fetch entries
const entries = await fetchGuestbookEntries()

// Add a new entry
await addGuestbookEntry({
  name: 'Test User',
  message: 'Hello from the guestbook!',
  email: 'test@example.com' // Optional
})
```

## Step 6: Optional Enhancements

### Add Email Notifications

You can set up Supabase Edge Functions to send you an email when someone signs your guestbook:

1. Go to **Database** → **Webhooks** in Supabase
2. Create a webhook that triggers on INSERT to the guestbook table
3. Use a service like SendGrid or your email service

### Add Spam Protection

1. Install a CAPTCHA library in your React app (e.g., react-google-recaptcha)
2. Verify the CAPTCHA token before inserting entries
3. Optionally set `approved = false` by default and manually approve entries

### Add Real-time Updates

Supabase supports real-time subscriptions. You can listen for new guestbook entries:

```javascript
import { supabase } from '@/lib/supabase'

const channel = supabase
  .channel('guestbook-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'guestbook'
    },
    (payload) => {
      console.log('New guestbook entry:', payload.new)
      // Update your UI with the new entry
    }
  )
  .subscribe()
```

## Step 7: Optional - Add Authentication

If you want users to sign in before leaving messages:

1. Go to **Authentication** in Supabase
2. Enable providers (GitHub, Google, etc.)
3. Update the RLS policies to require authentication
4. Implement authentication in your React app using `@supabase/auth-helpers-react`

## Database Schema

The guestbook table structure:

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key (auto-generated) |
| name | VARCHAR(100) | Visitor's name |
| message | TEXT | Guestbook message |
| email | VARCHAR(255) | Optional email |
| website | VARCHAR(255) | Optional website URL |
| created_at | TIMESTAMP | Entry creation time (auto) |
| approved | BOOLEAN | Moderation flag (default: true) |