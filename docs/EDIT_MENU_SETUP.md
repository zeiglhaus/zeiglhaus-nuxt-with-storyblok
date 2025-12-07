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

### Files Created

```
composables/useAuth.ts                    # Authentication composable
server/api/auth/validate.post.ts          # Password validation endpoint
server/api/update-menu.post.ts            # Storyblok update endpoint
pages/edit-menu.vue                       # Main edit interface
```

### Files Modified

```
nuxt.config.ts                            # Added runtime config
.env                                       # Environment variables
```

### Storyblok Story Details

- **Story ID:** 120487464890834
- **Slug:** menu-config
- **Space ID:** 336393
- **Component:** menu-config
- **Fields:**
  - `date` (string): Format "YYYY-MM-DD HH:MM"
  - `menu_text` (string): Multi-line text

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
- ✅ Ensure the story ID (120487464890834) is correct

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
