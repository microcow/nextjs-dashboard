'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // useSearchParams() 메서드의 return값을 searchParams에 저장
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams); // params에 새로운 URLSearchParams 객체를 저장
    if (term) { // if (term)은 term이 빈 문자열이 아니거나 null, undefined가 아닌 경우를 확인합니다.
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { // onChange는 React에서 사용되는 이벤트 핸들러로, HTML 폼 요소(예: <input>, <textarea>, <select> 등)의 값이 변경될 때 호출됩니다.
          handleSearch(e.target.value); 
          // e는 onChange 이벤트가 발생할 때 React가 전달하는 이벤트 객체이다.
          // e.target은 이벤트가 발생한 요소를 참조합니다. 이 경우 e.target은 사용자가 상호작용한 <input> 요소를 가리킵니다.
          // e.target.value는 <input> 요소의 현재 값을 나타냅니다. 사용자가 입력 필드에 입력한 텍스트가 됩니다.
        }}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
