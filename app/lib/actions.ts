'use server';
import { z } from 'zod'; // Zod는 입력 데이터의 타입을 검사하고, 타입 안전성을 보장하며, 데이터의 구조를 정의하는 데 사용됩니다.
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; 
import { redirect } from 'next/navigation';

const FormSchema = z.object({ // FormSchema 스키마 생성
    id: z.string(),
    customerId: z.string(),
    amount: z.coerce.number(), // 문자열이 숫자로 강제 변환(coerce)됩니다.
    status: z.enum(['pending', 'paid']),
    date: z.string(),
});
   // 변수를 검증할 때 사용하는 객체의 키 이름과 스키마의 필드 이름이 일치해야만 검증이 올바르게 이루어집니다
  const CreateInvoice = FormSchema.omit({ id: true, date: true }) // FormSchema 스키마에서 id와 date가 제외(omit)된 스키마 생성

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({ // CreateInvoice.parse({...}) 부분에서 formData가 스키마와 일치하는지 검증하고, 일치하면 해당 데이터를 반환합니다.
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

revalidatePath('/dashboard/invoices'); // revalidatePath를 사용하면 해당 경로의 정적 페이지를 다시 생성하여 최신 데이터를 반영할 수 있습니다.
redirect('/dashboard/invoices'); // 경로로 리다이렉트하여 업데이트된 페이지를 보도록 합니다.
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('Failed to Delete Invoice');

  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice.' };
  }
}