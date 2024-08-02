import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
 


export default async function Page({ params }: { params: { id: string } }) { //params는 객체이고 그 객체 안에 id라는 문자열 타입의 속성이 있다는 뜻
    const id = params.id;
    const [invoice, customers] = await Promise.all([
        fetchInvoiceById(id), //해당 함수 return값이 invoice에 담김
        fetchCustomers(), // 해당 함수 return값이 customers에 담김
      ]);
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