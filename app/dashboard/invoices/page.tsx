import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Invoices',
};

// URL의 쿼리 파라미터가 변경되면, Next.js는 해당 페이지를 다시 렌더링합니다.
export default async function Page({ 
  searchParams, // Next.js의 Page 컴포넌트가 렌더링될 때, 페이지의 URL에서 쿼리,page 문자열을 자동으로 파싱하여 파라미터로 받아온다.
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> {/* key는 React에게 어떤 컴포넌트가 변경되었는지 식별하도록 돕습니다. key가 없으면 React는 컴포넌트를 동일한 것으로 간주할 수 있으며, 업데이트나 상태 변경이 발생해도 Suspense가 컴포넌트를 새로 로딩하거나 fallback을 올바르게 표시하지 않을 수 있습니다. */}
        <Table query={query} currentPage={currentPage} /> {/* Table 컴포넌트에 쿼리 전달 */}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}