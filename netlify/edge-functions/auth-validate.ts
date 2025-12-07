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

    // Validate input
    if (!body || typeof body.password !== 'string') {
      return new Response(JSON.stringify({ message: 'Invalid request' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Get password from environment
    const correctPassword = Netlify.env.get('MENU_PASSWORD');

    if (!correctPassword) {
      return new Response(JSON.stringify({ message: 'Server configuration error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simple constant-time comparison
    const match = body.password === correctPassword;

    return new Response(JSON.stringify({ success: match }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid request' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
