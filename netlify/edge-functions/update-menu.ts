import { type Context } from "@netlify/edge-functions";

export default async (request: Request, context: Context) => {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();

    // Validate authentication - require password for each request
    if (!body || typeof body.password !== 'string') {
      return new Response(JSON.stringify({ message: 'Unauthorized: Password required' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get environment variables
    const menuPassword = Netlify.env.get('MENU_PASSWORD');
    const managementToken = Netlify.env.get('STORYBLOK_MANAGEMENT_TOKEN');

    if (!managementToken) {
      return new Response(JSON.stringify({ message: 'Server configuration error: Missing management token' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify password
    if (body.password !== menuPassword) {
      return new Response(JSON.stringify({ message: 'Forbidden: Invalid password' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Validate input
    if (typeof body.menu_text !== 'string' || typeof body.date !== 'string') {
      return new Response(JSON.stringify({ message: 'Invalid request: menu_text and date are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { menu_text, date } = body;
    const spaceId = '336393';
    const storyId = '69315002926347';
    const apiBase = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${storyId}`;

    // 1. Fetch current story
    const currentStoryResponse = await fetch(apiBase, {
      headers: {
        Authorization: managementToken
      }
    });

    if (!currentStoryResponse.ok) {
      throw new Error(`Failed to fetch story: ${currentStoryResponse.statusText}`);
    }

    const currentStory = await currentStoryResponse.json();

    // 2. Find the MenuContentBox component in the body array
    const menuBox = currentStory.story.content.body.find(
      (block: any) => block.component === 'MenuContentBox'
    );

    if (!menuBox) {
      return new Response(JSON.stringify({ message: 'MenuContentBox component not found in story' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 3. Update the MenuContentBox fields
    menuBox.date = date;
    menuBox.menu_items = menu_text;

    // 4. Update and publish story in one call
    const updateResponse = await fetch(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: managementToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        story: {
          content: currentStory.story.content
        },
        publish: 1
      })
    });

    if (!updateResponse.ok) {
      throw new Error(`Failed to update story: ${updateResponse.statusText}`);
    }

    const updateResult = await updateResponse.json();

    return new Response(JSON.stringify({
      success: true,
      message: 'Menü erfolgreich aktualisiert und veröffentlicht. Die Änderungen sind in 1-2 Minuten auf der Webseite sichtbar.',
      story: updateResult.story
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Storyblok API error:', error);
    
    return new Response(JSON.stringify({
      message: error.message || 'Fehler beim Aktualisieren des Menüs'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
