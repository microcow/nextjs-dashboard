import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import styles from '@/app/ui/home.module.css';
import { lusitana } from './ui/fonts';
import Image from 'next/image';


export default function Page() { //해당 페이지 호출 시 export default function으로 함수를 생성한 뒤 return한 내용이 출력되게 된다.
  return (
    <main className="flex min-h-screen flex-col p-6"> {/* CSS설정 방법 1. Tailwind CSS 프레임 워크를 사용하여 HTML 요소에 스타일을 적용하는 방법 */}
      {/* </main><main className={styles.shape}> */} {/* CSS설정 방법 2. 직접 만든 CSS 모듈을 가져와서 사용하는 방법 (shape는 '@/app/ui/home.module.css' 경로에있음) */}
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52"> 
        {<AcmeLogo /> }
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Acme.</strong> This is the example for the{' '} {/* {' '}는 JavaScript의 JSX 또는 TSX 파일에서 문자열 내에 공백(space)을 삽입*/}
            <a href="https://nextjs.org/learn/" className="text-blue-500"> 
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
         <Image
         src="/hero-desktop.png"
         width={600}
         height={760}
          className="hidden md:block" // 화면이 미디움크기일때 해당 이미지 숨김
          alt="Screenshots of the dashboard project showing desktop version" // 이미지 대체 텍스트
         />
          <Image
         src="/hero-mobile.png"
         width={560}
         height={620}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
         />
        </div>
      </div>
      <div
  className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px] border-l-transparent border-r-transparent border-b-black"
/>
    </main>
  );
}
