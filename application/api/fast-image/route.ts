export const dynamic = 'force-dynamic';
import Security from '@/security/url-handler';
import { logInfo } from '@/utils/log-helper';
import axios, { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import NodeCache from 'node-cache';
const imageCache = new NodeCache();
export async function GET(request: Request) {
  try {
    // 👇 get the image src,width, andq quality from query params
    const { searchParams } = new URL(request.url);
    let url = searchParams.get('url');
    const width = searchParams.get('w') ?? '384';
    const quality = searchParams.get('q') ?? '75';

    let mess = '';

    if (!url) {
      mess = '400 Bad request. url is missing';
      logInfo('Secure Image', {}, { mess });
      return NextResponse.json(mess, {
        status: 400,
      });
    }
    // decrypt url data
    let urlDecrypt = url;
    if (!url.includes('mediaaustore')) {
      url = url.replaceAll(' ', '+');
      urlDecrypt = new Security().decrypt(url);
    }
    const keyCache = `${urlDecrypt}|${width}|${quality}`;
    const headers = new Headers();
    // 👇set content type to webp.
    headers.set('content-type', 'image/webp');
    const imageCacheData = imageCache.get(keyCache) as Buffer;
    if (imageCacheData) {
      return new NextResponse(imageCacheData, {
        status: 200,
        statusText: 'OK',
        headers,
      });
    } else {
      const response = await axios.get(urlDecrypt, {
        responseType: 'arraybuffer',
      });

      // 👇 use sharp to resize the image based on the parameters
      const optimized = await sharp(response.data)
        .resize({
          withoutEnlargement: true,
          width: parseInt(width),
        })
        .webp({ quality: parseInt(quality) }) //transform to webp format
        .toBuffer();
      imageCache.set(keyCache, optimized, 86400);
      // 👇send buffered image
      return new NextResponse(optimized, {
        status: 200,
        statusText: 'OK',
        headers,
      });
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      logInfo('Secure Image', { mess: 'AxiosError' }, { error: e.toString() });
      return NextResponse.json('', { status: 500 });
    }
  }
}
