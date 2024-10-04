export const dynamic = 'force-dynamic';
import { logInfo } from '@/utils/log-helper';
import { AxiosError } from 'axios';
import { NextResponse } from 'next/server';
import moment from 'moment';
export async function GET(request: Request) {
  try {
    // 👇 get the image src,width, andq quality from query params
    const { searchParams } = new URL(request.url);
    const time = searchParams.get('time') ?? '';
    let mess = '';
    const localeTime = layThoiGianQuocTe();
    const crrTime = parseInt(time);

    // Chuyển thời gian từ máy tính và thời gian quốc tế về cùng một múi giờ

    // Tính khoảng chênh lệch thời gian
    const chenhLech = Math.abs(crrTime - localeTime);
    if (chenhLech <= 60) {
      logInfo('check-timezone', { crrTime, localeTime }, { chenhLech });
      return NextResponse.json('Giờ đã đồng bộ', {
        status: 200,
      });
    } else {
      logInfo('check-timezone', { chenhLech });
      return NextResponse.json('Giờ chưa đồng bộ', {
        status: 405,
      });
    }
  } catch (e) {
    if (e instanceof AxiosError) {
      logInfo('Secure Image', { mess: 'AxiosError' }, { error: e.toString() });
      return NextResponse.json('', { status: 500 });
    }
  }
}

// Hàm để lấy thời gian quốc tế
function layThoiGianQuocTe() {
  return moment().utc().unix();
}
