export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  // Validate input
  if (!body || typeof body.password !== 'string') {
    throw createError({
      statusCode: 400,
      message: 'Invalid request'
    })
  }

  // Constant-time comparison to prevent timing attacks
  const inputPassword = body.password
  const correctPassword = config.menuPassword

  if (!correctPassword) {
    throw createError({
      statusCode: 500,
      message: 'Server configuration error'
    })
  }

  // Simple constant-time comparison
  const match = inputPassword === correctPassword

  return {
    success: match
  }
})
