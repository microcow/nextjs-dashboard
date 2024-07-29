import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';
import CardWrapper from '@/app/ui/dashboard/cards';

export default async function Page() {
  console.log('page---');
  //const latestInvoices = await fetchLatestInvoices();
  const {
    numberOfInvoices,
    numberOfCustomers,
    totalPaidInvoices,
    totalPendingInvoices,
  } = await fetchCardData(); // fetchLatestInvoices() 가져오기가 완료될 때까지 기다립니다
   return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}> {/* Suspense는 특정 컴포넌트가 로딩상태를 관리하기 위한 것이며, <RevenueChart/>가 로딩되기 전까지 fallback={<RevenueChartSkeleton />}이 보여진다 */}
          <RevenueChart/>
        </Suspense> 
        {/* Next의 라우팅 시스템과 리액트의 Suspense 설명
          우선 next에서 실행 시 page.tsx가 먼저 라우팅되고 loading.tsx가 라우팅된다.
         page에 로딩이 오래걸리는 컴포넌트가 있다면 다른 컴포넌트들도 함께 기다리면서 화면 전체가 loading.tsx로 출력되었지만,
         오래로딩되는 컴포넌트에 Suspense 태그를 걸어주면 빨리 로딩되는 다른 컴포넌트도 오래로딩되는 컴포넌트를 함께 기다릴 필요 없이 Suspense 태그가 걸린 컴포넌트만 대체 UI(fallback)가 출력된다.
         따라서, 화면 전체가 loading.tsx로 출력되는 게 아닌 미리 출력가능한 컴포넌트는 출력되고 Suspense태그만 대체 UI로 출력된다 */}
         {/* 원래 해당 페이지에서 return문 전에 로딩이 오래걸리는 데이터를 직접 가져와서 출력했기에 한부분만 로딩이 오래 걸려도 전체 페이지가 모두 로딩되었는데
         Suspense를 사용하기 위해 데이터를 직접 여기서 return문 전에 가져오지 않고 데이터 가져오기 컴포넌트가 가져오도록 변경 후 해당 컴포넌트를 호출하도록 바꿈으로서 화면 전체가 로딩되는게 아닌 Suspense 태그가 걸린 컴포넌트만 로딩되도록 바뀜 */}
        
        <Suspense fallback={<LatestInvoicesSkeleton />}>
        <LatestInvoices />                                  {/* <LatestInvoices latestInvoices={latestInvoices} /> : LatestInvoices컴포넌트의 파라미터(latestInvoices) 값으로 파라미터(latestInvoices)을 넘겨주고 해당 컴포넌트를 실행*/}
        </Suspense>
      </div>
    </main>
  );
}

    