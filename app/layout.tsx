import '@/app/ui/global.css'; //app - ui - global 경로의 css 스타일 import
import { inter } from './ui/fonts';

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
      {/* <html>과 <body> 태그를 설정하며, children을 <body>에 렌더링합니다.
       즉, 모든 페이지 컴포넌트는 이 레이아웃의 children으로 전달되어 렌더링됩니다. */}
       {/* antialiased는 CSS 클래스 또는 Tailwind CSS 유틸리티 클래스입니다.
       이 클래스는 텍스트의 계단 현상을 줄여서 더 부드럽고 깔끔하게 보이도록 텍스트를 렌더링합니다. */}
    </html>
  );
}
