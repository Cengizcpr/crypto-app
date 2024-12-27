const { NextResponse } = require('next/server');

function middleware(request) {
  const token = request.cookies.get('token');
  const { pathname } = request.nextUrl;

  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.next();
  }

  if (pathname === '/' || pathname.startsWith('/form')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!validateToken(token.value)) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

async function validateToken(token) {
  try {
    const response = await axios.get(
      'http://localhost:5000/api/validate-token',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.status == 200;
  } catch (error) {
    return false;
  }
}

module.exports = {
  middleware,
  config: {
    matcher: ['/login', '/register', '/form/*', '/'],
  },
};
