'use client';
 
import { useEffect } from 'react';
 
// error.tsx는 포괄적인 에러에 대한 세그먼트이며, 에러 발생(존재하지 않는 경로로 접근, 예상치 못한 오류 등) 시 포괄적으로 이용자에게 노출되는 화면임

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }; // error: JavaScript의 기본 Error 객체의 인스턴스입니다. 이 객체는 에러에 대한 정보를 담고 있습니다.
  reset: () => void; 
  // 사용자가 "Try again" 버튼을 클릭하면 reset 함수가 호출
  // reset 함수는 에러 경계 컴포넌트에서 제공하는 함수로, 에러가 발생한 상태를 초기화하여 컴포넌트가 정상적으로 다시 렌더링되도록 합니다.
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset() // try again버튼을 누르면 reset함수가 호출되고 오류가 발생 직전 상태로 돌아감
        }
      >
        Try again
      </button>
    </main>
  );
}