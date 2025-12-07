# Edit Menu Page - Setup & Usage Guide

## Overview
This document explains how to use and deploy the private `/edit-menu` page for updating the weekly menu in Storyblok.

## Features
✅ Password-protected access (volunteers only)  
✅ Edit menu text and date  
✅ Live preview of changes  
✅ Automatic publishing to Storyblok  
✅ Unsaved changes warning  
✅ Mobile-responsive design  

---

## Initial Setup

### 1. Add Your Storyblok Management API Token

You need to add your Storyblok Management API token to the `.env` file.

**Find Your Token:**
1. Go to https://app.storyblok.com
2. Click on your profile (bottom left)
3. Go to "Account" → "Personal Access Tokens"
4. Copy your Management API token

**Update `.env` file:**
```env
MENU_PASSWORD=zeigldonnerstag
STORYBLOK_MANAGEMENT_TOKEN=your-actual-token-here
```

⚠️ **Important:** Never commit the `.env` file to Git! It's already in `.gitignore`.

---

## Netlify Deployment

### 1. Set Environment Variables in Netlify

Go to your Netlify site dashboard:

1. Navigate to **Site Settings** → **Environment Variables**
2. Add the following variables:

| Variable Name | Value |
|---------------|-------|
| `MENU_PASSWORD` | `zeigldonnerstag` |
| `STORYBLOK_MANAGEMENT_TOKEN` | Your Storyblok Management API token |

3. Click **Save**
4. **Redeploy your site** for the changes to take effect

⚠️ **Important:** The `netlify.toml` configuration file is required for server API routes to work properly on Netlify. Make sure this file is committed and deployed.

---

## How to Use (For Volunteers)

### Accessing the Page

1. Navigate to: `https://your-site.com/edit-menu`
2. Enter the password: **zeigldonnerstag**
3. Click "Anmelden" (Login)

### Editing the Menu

1. **Date Field:** Click to select a date and time
   - The preview shows the date in German format: "Donnerstag, 9. Dezember 2025"

2. **Menu Text:** Type or paste the menu text
   - Each line becomes a separate line in the preview
   - The preview updates automatically as you type

3. **Preview:** Check the right panel to see how it will look

4. **Save Changes:**
   - Click "Speichern & Veröffentlichen" (Save & Publish)
   - Confirm the prompt
   - Wait for the success message
   - **Changes are now live on the website!**

5. **Reset:** Click "Zurücksetzen" to discard unsaved changes

### Tips

- ✅ The preview updates in real-time
- ✅ You'll get a warning if you try to leave with unsaved changes
- ✅ Save button is disabled if there are no changes
- ✅ You can logout anytime using the "Abmelden" button
- ✅ The session clears when you close the browser

---

## Technical Details

### Architecture

This site uses **Static Site Generation (SSG)** with **Netlify Edge Functions**:

- ✅ **SSG Mode:** All pages pre-built at deploy time and served from CDN
- ✅ **Edge Functions:** Only 2 API endpoints run serverless code (at the edge)
- ✅ **Auto-rebuild:** Storyblok webhooks trigger Netlify rebuilds on content changes
- ✅ **Performance:** Minimal function invocations, bot traffic hits CDN (no functions)
- ✅ **Cost-effective:** 1M free edge function calls/month

### Files Created

```
composables/useAuth.ts                         # Authentication composable
pages/edit-menu.vue                            # Main edit interface
netlify/edge-functions/auth-validate.ts        # Password validation (Edge Function)
netlify/edge-functions/update-menu.ts          # Storyblok update (Edge Function)
netlify.toml                                   # Netlify deployment configuration
server/api/auth/validate.post.ts               # Local dev: Password validation
server/api/update-menu.post.ts                 # Local dev: Storyblok update
```

### Files Modified

```
nuxt.config.ts                                 # Disabled SSR, enabled SSG
.env                                           # Environment variables
```

### Deployment Flow

1. Volunteer edits menu via `/edit-menu` page
2. Edge Function updates Storyblok content
3. Storyblok webhook triggers Netlify rebuild
4. Site regenerated with new static pages
5. Changes live on CDN within 1-2 minutes

### Storyblok Story Details

- **Story ID:** 69315002926347
- **Slug:** speisekarte
- **Space ID:** 336393
- **Page Structure:** Page with multiple components in `body` array
- **Target Component:** MenuContentBox (found within the body array)
- **MenuContentBox Fields:**
  - `date` (string): Format "YYYY-MM-DD HH:MM"
  - `menu_items` (string): Multi-line text with menu items

---

## Security

✅ **Password:** Stored server-side only in environment variables  
✅ **Management API Token:** Never exposed to client-side code  
✅ **Session:** Stored in sessionStorage (cleared when browser closes)  
✅ **HTTPS:** Automatically provided by Netlify  
✅ **Input Validation:** Server-side validation before updating Storyblok  

---

## Troubleshooting

### Password doesn't work
- ✅ Check that `MENU_PASSWORD` is set in Netlify environment variables
- ✅ Ensure you redeployed after adding the variable

### "Server configuration error"
- ✅ Check that `STORYBLOK_MANAGEMENT_TOKEN` is set correctly
- ✅ Verify the token is valid in Storyblok settings
- ✅ Redeploy the site

### Changes don't save
- ✅ Check the browser console for error messages
- ✅ Verify the Storyblok token has write permissions
- ✅ Ensure the story ID (69315002926347) is correct
- ✅ Verify the MenuContentBox component exists in the story's body array

### Preview doesn't update
- ✅ This is a client-side feature and should work immediately
- ✅ Check browser console for JavaScript errors

---

## Local Development

### Running locally:

1. Ensure `.env` file has both variables set
2. Run: `pnpm dev`
3. Navigate to: `https://localhost:3001/edit-menu`
4. Use password: `zeigldonnerstag`

---

## Future Enhancements (Optional)

Possible improvements if needed:

- 📝 Add audit log to track who changed what
- 👥 Support multiple user accounts
- 📅 Schedule future menu publications
- 📧 Email notifications on menu updates
- 🖼️ Image upload for menu photos
- 📱 Convert to Progressive Web App (PWA)

---

## Support

For technical issues or questions, contact the site administrator.

**Last Updated:** December 7, 2025
