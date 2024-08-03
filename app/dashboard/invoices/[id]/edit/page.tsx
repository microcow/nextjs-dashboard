import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';


export default async function Page({ params }: { params: { id: string } }) { //params는 객체이고 그 객체 안에 id라는 문자열 타입의 속성이 있다는 뜻 (추후 id말고 다른 것도 받을 수 있기에 유지보수 측면에서 id를 직접 받지 않고 이렇게 받는듯)
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id), //해당 함수 return값이 invoice에 담김
        fetchCustomers(), // 해당 함수 return값이 customers에 담김
      ]);

      if (!invoice) { // invoice의 값이 없다면
        notFound(); 
        // notFound함수가 실행되면 페이지 렌더링을 중단하고 404 페이지로 리다이렉트된다.
        // 만약 not-found.tsx 세그먼트가 구현되어 있는 경우 해당 세그먼트로 라우팅된다.
        // not-found.tsx 파일을 만들어 404 페이지를 정의할 수 있다.
      }

  return (
    <main>
      <Breadcrumbs // 상단의 Invoices/ Edit Invoice 부분 링크 연결
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}