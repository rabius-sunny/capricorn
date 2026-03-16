import { NextResponse } from 'next/server';
import ImageKit from 'imagekit';

export async function GET() {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return NextResponse.json(
      { error: 'ImageKit env vars not configured.' },
      { status: 500 }
    );
  }

  const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });
  const authParams = imagekit.getAuthenticationParameters();

  return NextResponse.json({ ...authParams, publicKey });
}
