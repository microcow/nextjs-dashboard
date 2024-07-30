'use client';

import { useDebouncedCallback } from 'use-debounce';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search({ placeholder }: { placeholder: string }) { //placeholder는 파라미터를 받는 역할만 하고 해당 컴포넌트에서 사용되지 않고 아래 retrun에서 사용됨
  const searchParams = useSearchParams(); 
  // useSearchParams 훅은 ★ 현재 페이지의 쿼리 문자열을 파싱하여 URLSearchParams 객체를 반환합니다.
  // React의 useSearchParams 훅을 사용하면, 쿼리 파라미터의 변경에 따라 컴포넌트가 리렌더링됩니다
  const pathname = usePathname(); // 현재 경로를 가져옴 (/dashbaord/invoices)
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term) => { 
    // useDebouncedCallback : 전달하는 첫번째 파라미터를 두번째 파라미터의 시간이 지난 후 실행 (이용자가 900ms 동안 입력을 멈춘다면, 코드를 실행함 / 입력될때 마다 데이터베이스 쿼리가 실행되는 것을 방지하기 위함)
    console.log(`Searching... ${term}`);

    const params = new URLSearchParams(searchParams); 
    // new URLSearchParams : 이 객체는 URL 쿼리 문자열을 생성, 수정, 읽는 데 사용됩니다.
    // ★ URLSearchParams 객체는 생성 시점의 쿼리 문자열 값을 기반으로 조작되며, React의 훅과는 독립적
    if (term) { // if (term)은 term이 빈 문자열이 아니거나 null, undefined가 아닌 경우를 확인합니다.
      params.set('page', '1'); // 새로운 검색어 입력 시 'page'를 1로 설정
      params.set('query', term); 
      // URL의 쿼리 매개변수에 query=term을 설정합니다. (key & value) query={term} 형태의 문자열로 params에 저장됨
    } else {
      params.delete('query'); // 입력된 검색어가 빈 문자열인 경우, URL에서 query 매개변수를 삭제합니다.
    }
    replace(`${pathname}?${params}`);
    // return을 쓰지 않고 replace를 쓰는 이유? 
    // 페이지를 다시 로드하지 않아도 replace는 즉시 URL을 변경하고 브라우저 히스토리를 업데이트하는 데 사용됩니다. 
  }, 900);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => { // onChange는 React에서 사용되는 이벤트 핸들러로, HTML 폼 요소(예: <input>, <textarea>, <select> 등)의 값이 변경될 때 마다 ★실시간으로★ 호출됩니다.
          handleSearch(e.target.value); 
          // e는 onChange 이벤트가 발생할 때 React가 전달하는 이벤트 객체이다.
          // e.target은 이벤트가 발생한 요소를 참조합니다. 이 경우 e.target은 사용자가 상호작용한 <input> 요소를 가리킵니다.
          // e.target.value는 <input> 요소의 현재 값을 나타냅니다. 사용자가 입력 필드에 입력한 텍스트가 됩니다.
        }}
        defaultValue={searchParams.get('query')?.toString()} 
        // 검색을 하지 않고 검색창에 글자만 친 경우, 새로고침 하더라도 검색창에 작성했던 글자가 사라지지 않음
        // defalutValue : 새로고침 시 input 검색창의 기본값 설정(placeholder와 달리 클릭 시 안사라짐 + 진한 글자색)
        // handleSearch에서 저장한 'query'값을 불러옴
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
