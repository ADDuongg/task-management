import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PUBLIC_ROUTES = ['/api/auth/login', '/api/auth/register', '/api/auth/resetpass', '/api/auth/forgotpass'];

export async function middleware(req: NextRequest) {
  if (PUBLIC_ROUTES.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const authorizationHeader = req.headers.get('authorization');

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Missing or invalid token' }, { status: 401 });
  }

  const token = authorizationHeader.split(' ')[1];

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET); 
    await jwtVerify(token, secret); 
  } catch (error) {
    console.error('Token verification failed:', error);
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
