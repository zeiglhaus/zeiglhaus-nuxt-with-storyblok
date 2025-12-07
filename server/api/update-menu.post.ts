export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validate authentication - require password for each request
  if (!body || typeof body.password !== 'string') {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized: Password required'
    })
  }

  // Verify password
  if (body.password !== config.menuPassword) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden: Invalid password'
    })
  }

  // Validate input
  if (typeof body.menu_text !== 'string' || typeof body.date !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Invalid request: menu_text and date are required'
    })
  }

  const { menu_text, date } = body
  const managementToken = config.storyblokManagementToken
  const spaceId = '336393'
  const storyId = '69315002926347'

  if (!managementToken) {
    throw createError({
      statusCode: 500,
      message: 'Server configuration error: Missing management token'
    })
  }

  const apiBase = `https://mapi.storyblok.com/v1/spaces/${spaceId}/stories/${storyId}`

  try {
    // 1. Fetch current story
    const currentStory = await $fetch<{ story: any }>(apiBase, {
      headers: {
        Authorization: managementToken
      }
    })

    // 2. Find the MenuContentBox component in the body array
    const menuBox = currentStory.story.content.body.find(
      (block: any) => block.component === 'MenuContentBox'
    )

    if (!menuBox) {
      throw createError({
        statusCode: 500,
        message: 'MenuContentBox component not found in story'
      })
    }

    // 3. Update the MenuContentBox fields
    menuBox.date = date
    menuBox.menu_items = menu_text

    // 4. Update and publish story in one call
    const updateResponse = await $fetch<{ story: any }>(apiBase, {
      method: 'PUT',
      headers: {
        Authorization: managementToken,
        'Content-Type': 'application/json'
      },
      body: {
        story: {
          content: currentStory.story.content
        },
        publish: 1
      }
    })

    return {
      success: true,
      message: 'Menü erfolgreich aktualisiert und veröffentlicht. Die Änderungen sind in 1-2 Minuten auf der Webseite sichtbar.',
      story: updateResponse.story
    }
  } catch (error: any) {
    console.error('Storyblok API error:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Fehler beim Aktualisieren des Menüs'
    })
  }
})
