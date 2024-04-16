import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { AppRouter } from './constants'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === AppRouter.DOCUMENT) {
    return NextResponse.redirect(
      new URL(`${AppRouter.DOCUMENT}/quick-start`, request.url)
    )
  }
  if (request.nextUrl.pathname === '/dashboard') {
    return NextResponse.redirect(new URL('/dashboard/ipfs-files', request.url))
  }
}
