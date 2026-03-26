import { http, HttpResponse } from 'msw'

const BASE_URL = import.meta.env.VITE_PREFIX_URL || '/api'

export const authHandlers = [
  http.post(`${BASE_URL}/login`, async ({ request }) => {
    const { email, password } = (await request.json()) as { email: string; password: string }

    if (email !== 'admin@example.com' && password !== '1234') return new HttpResponse(null, { status: 401 })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return HttpResponse.json(
      {
        accessToken: 'mock-access-token-' + Date.now(),
        user: { name: 'Juny Jo', email, role: 'Admin' },
      },
      {
        headers: {
          'Set-Cookie': `refreshToken=mock-refresh-token-${Date.now()}; HttpOnly; Path=/; Max-Age=86400; SameSite=Strict`,
        },
      },
    )
  }),

  http.post(`${BASE_URL}/refresh`, async ({ cookies }) => {
    const { refreshToken } = cookies

    if (!refreshToken) return new HttpResponse(null, { status: 401 })

    await new Promise((resolve) => setTimeout(resolve, 1000))

    return HttpResponse.json({
      accessToken: 'new-mock-access-token-' + Date.now(),
    })
  }),

  http.post(`${BASE_URL}/logout`, async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return HttpResponse.json(
      { message: 'Logged out' },
      {
        headers: {
          'Set-Cookie': 'refreshToken=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict',
        },
      },
    )
  }),
]
