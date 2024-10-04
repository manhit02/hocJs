export const dynamic = 'force-dynamic';
import { imageSignHelper } from '@/security/sign-helper';

import { logInfo } from '@/utils/log-helper';
import axios, { AxiosError } from 'axios';
import moment from 'moment-timezone';
import { NextResponse, userAgent } from 'next/server';
import sharp from 'sharp';
import NodeCache from 'node-cache';
import Security from '@/security/url-handler';
const imageCache = new NodeCache();
export async function GET(request: Request) {
  try {
    // 👇 get the image src,width, andq quality from query params
    const { searchParams } = new URL(request.url);
    let url = searchParams.get('url');
    const sign = searchParams.get('sign') ?? '';
    const time = searchParams.get('time') ?? '';
    const startTime = searchParams.get('startTime') ?? '';
    const endTime = searchParams.get('endTime') ?? '';
    const current_time = moment().tz('Asia/Bangkok').unix();
    const UIR = request.headers.get('Upgrade-Insecure-Requests');
    const fetchMode = request.headers.get('Sec-Fetch-Mode');
    const referer = request.headers.get('Referer');
    const agent = userAgent(request);
    const width = searchParams.get('w') ?? '384';
    const quality = searchParams.get('q') ?? '75';

    const home = process.env.BASE_WEB || '';
    let mess = '';
    if (!referer) {
      mess = '400 Bad request !!!';
      logInfo('Secure Image', { referer }, { mess });
      return NextResponse.json(mess, {
        status: 400,
      });
    }
    if (!referer.includes(home)) {
      mess = '400 Bad request !!!';
      logInfo('Secure Image', { referer }, { mess });
      return NextResponse.json(mess, {
        status: 400,
      });
    }
    if (!url) {
      mess = '400 Bad request. url is missing';
      logInfo('Secure Image', {}, { mess });
      return NextResponse.json(mess, {
        status: 400,
      });
    }

    if (agent.isBot) {
      mess = '400 Hello Bot, you cannot access.';
      logInfo('Secure Image', { isBot: agent.isBot }, { mess });
      return NextResponse.json(mess, {
        status: 400,
      });
    }

    if (UIR || fetchMode == 'navigate') {
      mess = '400 You cannot access this image.';
      logInfo('Secure Image', { UIR, fetchMode }, { mess });
      return NextResponse.json(mess, {
        status: 400,
      });
    }

    if (
      parseInt(time) <= 0 ||
      parseInt(startTime) <= 0 ||
      parseInt(endTime) <= 0
    ) {
      mess = '401 Invalid input.';
      logInfo(
        'Secure Image',
        {
          time: parseInt(time),
          startTime: parseInt(startTime),
          endTime: parseInt(endTime),
        },
        {
          mess,
        }
      );
      return NextResponse.json(mess, { status: 400 });
    }
    if (
      current_time - parseInt(time) > 60 ||
      current_time - parseInt(time) < -60
    ) {
      mess = '401 Invalid timer.';
      logInfo(
        'Secure Image',
        { time: current_time - parseInt(time) },
        {
          mess,
        }
      );
      return NextResponse.json(mess, { status: 401 });
    }
    if (current_time - parseInt(startTime) < 0) {
      mess = '401 Event is not start, please comeback later.';
      logInfo(
        'Secure Image',
        { startTime: current_time - parseInt(startTime) },
        { mess }
      );
      return NextResponse.json(mess, { status: 401 });
    }
    if (parseInt(endTime) - current_time < 0) {
      mess = '401 Event is end.';
      logInfo(
        'Secure Image',
        { endTime: parseInt(endTime) - current_time },
        {
          mess,
        }
      );
      return NextResponse.json(mess, { status: 401 });
    }
    const re_sign = imageSignHelper({
      time: parseInt(time),
      makerCode: process.env.MAKER_CODE ?? '',
      startTime: parseInt(startTime),
      endTime: parseInt(endTime),
    });
    if (sign !== re_sign) {
      mess = '401 Image has invalid sign.';
      logInfo(
        'Secure Image',
        {
          time: parseInt(time),
          makerCode: process.env.MAKER_CODE ?? '',
          startTime: parseInt(startTime),
          endTime: parseInt(endTime),
        },
        {
          mess,
          sign, re_sign,
        }
      );
      return NextResponse.json(mess, { status: 401 });
    }

    // 👇 get the image data using axios
    let urlDecrypt = url;
    if (!url.includes('au.vtc.vn')) {
      url = url.replaceAll(' ', '+');
      url = url.replaceAll('/', '//');
      urlDecrypt = new Security().decrypt(url);
    }

    const keyCache = `${urlDecrypt}|${width}|${quality}`;
    const headers = new Headers();
    headers.set('content-type', 'text/html');
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
