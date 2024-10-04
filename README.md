# VTC INTECOM x NextJS 14

**Nextjs 14.1.0**

var mn = mọi người ^^

# 1.Bên cắt html

## Chú ý

- next.config.js
  - Sửa trường NEXT_PUBLIC_MODE trong env thành 'html' để có thể build dạng export out.
  - Sửa trường NEXT_PUBLIC_MODE trong env thành 'html' để unoptimized image.
  ```
  output: process.env.NEXT_PUBLIC_MODE == "web" ? "standalone" : "export",
  images: {
    unoptimized: process.env.NEXT_PUBLIC_MODE == "web" ? false : true,
  ```

## Hướng dẫn

- ví dụ trong component Template
- Để khai báo 1 backgound, mn hãy đặt tên bg-Tên (ví dụ: className={`relative lg:p-10 p-4 bg-background-demo bg-contain w-[640px] bg-no-repeat bg-center lg:h-[410px]`})
  trong file tailwind.config.ts khai báo như ví dụ: "background-demo": renderUrlImage("/assets/images/bg_vuqy_demo.png"),
- vị trí để ảnh luôn là public/assets/images

### Setup popup:

- mn copy phần khai báo này, import các module cần thiết (phần import vscode sẽ tự gợi ý, ko cần cop cũng được)

```
import appSlice from "@/app/appSlice";
import { useAppDispatch } from "@/redux/hooks";
const dispatch = useAppDispatch();
const { updateModalState } = appSlice.actions;
```

### Mở popup:

```
dispatch(updateModalState(<MessageTemplate message="Demo mở popup" />));
```

### Đóng popup

```
dispatch(updateModalState(null));
```

- popup có thể mở và đóng tại bất kì page hay component nào cũng được
- css tại globals.css nếu muốn css chung cho toàn project, nếu muốn style riêng cho page thì mn tạo 1 file style.module.css cùng cấp với page, file này sẽ chỉ áp dụng css cho page,
  sẽ ko sợ bị đặt trùng tên,
- hạn chế dùng jquery, chỉ sử dụng trong trường hợp ko còn cách nào khác
- khi bắt đầu dựng html hãy xóa component Template, comnponent này chỉ làm ví dụ để tham khảo

# 2.Bên dev

## Chú ý:

- next.config.js
  - Sửa trường NEXT_PUBLIC_MODE trong env thành 'web' để có thể build dạng standalone.
  - Sửa trường NEXT_PUBLIC_MODE trong env thành 'web' để sử dụng optimized image.
  - Sửa trường NEXT_PUBLIC_BASE_PATH trong env nếu web có chia path.
  ```
  output: process.env.NEXT_PUBLIC_MODE == "web" ? "standalone" : "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    unoptimized: process.env.NEXT_PUBLIC_MODE == "web" ? false : true,
  ```
- Khi dev thì cần bật requireAuth trong file /app/layout.tsx lên.
  ```
  import { requireAuth } from "@/services/server-side/authen";
  token = await requireAuth();
  ```

## Hướng dẫn:

Các hook có sẵn
-Chuyển title thành slug (toSlug)
-Gọi hàm share Fb (onShareFb)
-Paging: truyền css được cắt vào props, type1 là phân trang có 3 chấm, type2 là phân trang ko có dấu 3 chấm
-loading progres bar
-các hàm gọi số dư, đăng nhập, khi muốn gọi lại số dư thay đổi state refresh của redux

# Nghiệp vụ API

- API thông tin User

```
POST {{domain}}/UserInfo
Authorization: Bearer Token
Request: (JSON body)
  interface RequestBackend {
    time: number;
    sign: string;
    makerCode: string;
    func: string;
    fromIP: string;
    data: Object;
  }
Response: (JSON body)
  interface Data<T> {
    code: number;
    mess: string;
    data: T;
  }
```

- API Dịch vụ / Sự kiện

```
POST {{domain}}/Event
Authorization: Bearer Token
Request: (JSON body)
  interface RequestBackend {
    time: number;
    sign: string;
    makerCode: string;
    func: string;
    fromIP: string;
    data: Object;
  }
Response: (JSON body)
Loại dữ liệu đơn
  interface Data<T> {
    code: number;
    mess: string;
    data: T;
  }
Loại dữ liệu danh sách
  export interface MetaData<T> {
    code: number;
    mess: string;
    data: DataT<T>;
  }

  export interface DataT<T> {
    total: number;
    list: T[];
  }
```

# Nghiệp vụ Authen

**Chú ý: Để đảm bảo việc fetch API ở Server Side và Client Side để được authen, Frontend cần phải fetch API authen từ phía Server Side**

## Cơ chế sử dụng:

# Các tính năng tái sử dụng

## Each component

- Cho phép user tạo ra view loop nhiều element từ array data.
- Giúp hạn chế các warning và error trong quá trình loop các element vô danh (thiếu key hoặc thiếu index).

### Hướng dẫn

```
  {
    list && <Each of={list} render={(e, i) =>
      <Link
        className="m-5 text-black"
        key={i}
        href={`/demo/${e.LocationID}`}
      >
        {e.LocationName}
      </Link>
    } />
  }
```

## UpperCase cụm từ trong đoạn văn

- Cho phép user truyền vào đoạn văn và trả về đoạn văn gồm các cụm từ có chữ cái đầu tiên in hoa

```
upperCaseFirstLetter("thứ ba 26/03/2024, 17:03")
```

```
Output:
Thứ Ba 26/03/2024, 17:03
```

## Link điều hướng Store Mobile

- Cho phép gắn link vào QR code để truy cập vào web và điều hướng đến store phù hợp với OS.

### Hướng dẫn

#### B1: Setup middleware

- Copy file middleware.ts từ /application/middleware/middleware.ts vào dir gốc của project.

#### B2: config link store trên middleware

- Thay thế link store vào OS tương ứng

```
    if (device.includes("iOS")) {
      return NextResponse.rewrite(
        new URL(
          `https://apps.apple.com/vn/app/ufc-si%C3%AAu-sao-b%C3%B3ng-%C4%91%C3%A1/id1572417749?l=vi`,
          request.url
        )
      );
    }
    return NextResponse.rewrite(
      new URL(
        `https://play.google.com/store/apps/details?id=ufc.sieusaobongda.bongda.sieusao.fifa.game.thethao.online.vtc.game`,
        request.url
      )
    );
```

#### B3: Dựng page tương ứng với routing điều hướng

Path /app/tai-game

```
import { logInfo } from "@/utils/log-helper";
import { NextRequest } from "next/server";
import React from "react";

const TaiGame = ({ searchParams }: { searchParams: { os: string } }) => {
  logInfo("Page Tai Game", { searchParams });
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "10%" }}>
        Xin Chào !!! Thiết bị: {searchParams.os}
      </h1>
      <div style={{ marginTop: "50%" }}></div>
    </div>
  );
};

export default TaiGame;

```

## Bảo vệ hình ảnh

### Mô tả:

Use-case dành cho các hình ảnh muốn chặn tải xuống hoặc leak trước thời gian public hoặc sau thời gian kết thúc.

### Hướng dẫn:

- Copy folder /application/api vào folder /app
- Sử dụng SecureImage:

```
      <SecureImage
        width={2560}
        height={1000}
        alt="Secure Image"
        src={"https://au.vtc.vn/media/media/images/images/Anh%20Banner/2-4-2024-au-april-2560x1000.png"}
        startTime={moment(startTime).tz('Asia/Bangkok').unix()}
        endTime={moment(endTime).tz('Asia/Bangkok').unix()}
      />
```

## Lazy Load Section One Page

### Mô tả:

Use-case cho trường hợp muốn load từng section trên web theo cuộn trang. Tối ưu tốc độ tải web và giúp web nhẹ hơn. SEO tối ưu hơn khi chỉ chấm điểm section được hiện thị mặc định.

### Hướng dẫn:

Chú ý chỉ sử dụng cho client-side rendering

```
'use client'
import useIntersectionObserver from "@/components/hooks/useIntersectionObserver";
const [isInViewTinMoi, refTinMoi] = useIntersectionObserver(
    0.1,
    "-200px",
    "h-[1000px] lg:h-[200px]"
  );
return (
  <div>
    <Section1 />
    <div className={`opacity-0 h-[1000px] lg:h-[200px]`} ref={refTinMoi}>
      {isInViewTinMoi && <TinMoi />}
    </div>
  </div>
)
```

- Section1 sẽ là section mặc định được view.
- TinMoi là section được view theo nhu cầu theo scroll trang.
- useIntersectionObserver() có 3 tham số
  - threshold là độ trễ hiển thị
  - rootMargin là độ lùi scroll trang.
    - VD: -200px có nghĩa là nếu user scroll đến trước 200px của section TinMoi thì section này sẽ được hiển thị trước.
  - heightElement là className tailwind để style chiều cao cho section.

### download ảnh

-sử dụng api/download-image có sẵn

- gọi hàm handleDownloadImage trong helper

# Docker - K8s & Jenkins

## Cấu trúc triển khai:

### Jenkins file:

- File jenkins.config.yaml chứa deploy_environment đại diện cho chế đội build của WEB.
  - Nếu là prod thì sẽ lấy env của file .env.production.sample để build.
  - Nếu là beta thì sẽ lấy env của file .env.development.sample để build.

### Docker file

Bao gồm 3 stage:

- Stage Base: chứa image của OS alpine và môi trường NodeJS
- Stage deps: chứa kịch bản cài đặt các package có trong project
  - Chú ý project phải có đủ package.json và (yarn.lock hoặc package-lock.json)
- Stage builder: chứa kịch bản build project NextJS
- Stage runner: chứa kịch bản các câu lệnh để start application với build của stage builder.

```bash
docker build . -t webbase -f docker/beta/Dockerfile

docker-compose up
```
