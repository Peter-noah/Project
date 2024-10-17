// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const token = request.cookies.get('authToken'); // Assuming you use a cookie to store auth token

  // If user is logged in, redirect them from index to home
  if (request.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next(); // Allow request to continue if no redirection is needed
}

export const config = {
  matcher: '/', // Apply middleware only on the root path
};