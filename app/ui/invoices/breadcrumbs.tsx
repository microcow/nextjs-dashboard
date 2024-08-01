import { clsx } from 'clsx';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={clsx(lusitana.className, 'flex text-xl md:text-2xl')}> {/*<ol> 태그는 "ordered list"의 약자로, 순서가 있는 목록을 정의할 때 사용됩니다. */}
        {breadcrumbs.map((breadcrumb, index) => ( 
          // map 함수는 배열의 각 요소를 순회하면서 주어진 함수를 호출하여 새로운 배열을 만듭니다.
          // 그럼 첫번째 순회 시 breadcrumb는 breadcrumbs 배열변수의 [0]번째 요소이고 index는 0
          // 두번째 순회 시 breadcrumb는 breadcrumb는 배열변수의 [1]번째 요소이고 index는 1 이런식
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span> // <span> 태그는 인라인 요소로, 특정 텍스트 부분을 그룹화하여 스타일링하거나 스크립트로 조작할 수 있게 합니다.
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
