import '@/app/ui/global.css'; //app - ui - global 경로의 css 스타일 import
import { inter } from './ui/fonts';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: { 
    template: '%s | Acme Dashboard', // 템플릿의 내용은 %s특정 페이지 제목으로 대체됩니다
    // 부모 세그먼트에서 설정한 %s 부분에 자식 페이지에서 지정한 title 값이 자동으로 들어가게 됩니다.
    default: 'Acme Dashboard', // 웹 페이지의 기본 제목을 'Acme Dashboard'로 설정
  },
  description: 'The official Next.js Course Dashboard, built with App Router.', // 웹 페이지의 설명을 'The official Next.js Course Dashboard, built with App Router.'로 설정
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'), // 메타데이터의 기본 URL을 'https://next-learn-dashboard.vercel.sh'로 설정
}; 
// 메타데이터 설정 이유 - SEO 개선: 검색 엔진이 페이지 내용을 더 잘 이해하고 인덱싱하도록 도와준다
// 명확한 제목과 설명으로 검색 결과에서 더 많은 클릭을 유도

export default function RootLayout({
  children,
}: {
  children: React.ReactNode; 
  // children: React.ReactNode; : children 프로퍼티가 React.ReactNode 타입의 값을 받을 수 있다고 선언하는 코드
  // React.ReactNode 타입: React에서 렌더링 가능한 모든 요소를 포함하는 타입
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body> 
      {/* (★ next.js를 관통하는 이론 ★)
      <html>과 <body> 태그를 설정하며, children을 <body>에 렌더링합니다.
      즉, 모든 Page.tsx 세그먼트는 이 레이아웃의 children으로 전달되어 렌더링됩니다.(RootLayout이기 때문) 

      ★★ 예를들어, app/dashboard/invoice/Layout.tsx가 있다고 치면, app/dashboard/invoice/Layout.tsx보다 하위(상속받는)에 있는 page.tsx(예를들어 app/dashboard/invoice/create/page.tsx) 세그먼트는 app/dashboard/invoice/Layout.tsx에 children을 전달함
      그러나, app/dashboard/invoice.Layout.tsx보다 상위(예를들어 app/dashboard/page.tsx)에 있으면 해당 page.tsx는 app/dashboard/invoice.Layout.tsx에 children을 전달하지 않고 상위 Layout.tsx에만 children을 전달함
      또한, 보다 하위 Layout.tsx에는 children값을 넘겨주지 않지만 보다 상위 Layout.tsx에는 children 값을 넘겨줌 */}

       {/* antialiased는 CSS 클래스 또는 Tailwind CSS 유틸리티 클래스입니다.
       이 클래스는 텍스트의 계단 현상을 줄여서 더 부드럽고 깔끔하게 보이도록 텍스트를 렌더링합니다. */}
    </html>
  ); // test
}
