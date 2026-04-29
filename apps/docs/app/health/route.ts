export async function GET() {
  return new Response('ok', {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}

export async function HEAD() {
  return new Response(null, { status: 200 });
}
