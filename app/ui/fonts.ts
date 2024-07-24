import { Inter, Lusitana } from 'next/font/google'; // next/font/google 모듈에서 Inter 함수와 Lusitana 함수를 임포트


export const inter = Inter({ subsets: ['latin'] });
// Inter 함수는 Google Fonts에서 제공하는 Inter 폰트를 불러오는 함수입니다
// { subsets: ['latin'] } 옵션은 이 폰트가 라틴 문자 집합을 포함하도록 설정합니다.
// 해석 : subsets 폰트 파일에서 특정 문자 집합만 포함하도록 지정할 수 있습니다. 이 경우, latin 문자 집합만 포함되도록 요청합니다. 이렇게 하면 폰트 파일의 크기가 줄어들 수 있습니다.

export const lusitana = Lusitana({
    weight: ['400', '700'],
    subsets: ['latin'],
  });