'use server';

import { z } from 'zod'; // Zod는 입력 데이터의 타입을 검사하고, 타입 안전성을 보장하며, 데이터의 구조를 정의하는 데 사용됩니다.
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache'; 
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData); ////
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

const FormSchema = z.object({ // FormSchema 스키마 생성
    id: z.string(), // id는 문자열(string) 타입이여야함
    customerId: z.string({
      invalid_type_error: 'Please select a customer.',
      // invalid_type_error는 Zod 라이브러리에서 사용하는 에러 메시지 유형 중 하나입니다. 이 에러는 스키마가 기대하는 타입과 실제 제공된 값의 타입이 일치하지 않을 때 발생한다.
    }),
    amount: z.coerce
      .number() // 문자열이 숫자로 강제 변환(coerce)됩니다.
      .gt(0, { message: 'Please enter an amount greater than $0.' }), // Zod의 .gt() 함수를 사용하여 항상 0보다 큰 값을 요구하도록 설정
      status: z.enum(['pending', 'paid'], {
        invalid_type_error: 'Please select an invoice status.',
      }),
    date: z.string(),
});
   // 변수를 검증할 때 사용하는 객체의 키 이름과 스키마의 필드 이름이 일치해야만 검증이 올바르게 이루어집니다
  const CreateInvoice = FormSchema.omit({ id: true, date: true }) // FormSchema 스키마에서 id와 date가 제외(omit)된 스키마 생성

  export type State = {
    errors?: {
      customerId?: string[];
      amount?: string[];
      status?: string[];
    };
    message?: string | null;
  };

  export async function createInvoice(prevState: State, formData: FormData) {
    // prevState는 useActionState 훅에서 전달된 이전 상태를 나타냅니다(필수 prop임). 여기선 안쓰임

   
    const validatedFields = CreateInvoice.safeParse({  // formData가 스키마(CreateInvoice)와 일치하는지 검증하고, 일치하면 해당 데이터를 반환(true 또는 false)합니다. 반환된 값은 validatedFields 객체에 담김
      // 예를들어, customerId가 formData.get('customerId')로 데이터를 가져왔는데 String타입이 아닐경우 CreateInvoice.safeParse는 false를 반환하게되고 validatedFields는 false가 되게 됨
      // safeParse()는 성공 또는 오류 필드를 포함하는 객체를 반환 // 데이터 서버검증을 위해 .parse 말고 .safeParse 사용. 
      // 데이터 검증 함수인 zod 라이브러리의 .parse와 .safeParse의 함수의 차이 알기 (next교육자료 13강, 14강) 
          // .parse 메서드는 주어진 데이터를 스키마에 따라 검증하고, 검증에 성공하면 데이터를 반환하며, 검증에 실패하면 예외를 던짐
          // .safeParse 메서드는 예외를 던지지 않고, 검증 결과를 객체로 반환
    customerId: formData.get('customerId'), // formData 객체에서 'customerId' 필드의 값을 가져옵니다.
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) { // validatedFields.success가 false인 경우를 확인하는 조건문입니다. 즉, validatedFields 객체의 success 필드가 false일 때, 이 조건문이 실행
    console.log(validatedFields);
    return {
      errors: validatedFields.error.flatten().fieldErrors, // 검증 오류를 포함하는 객체로, 각 필드별 오류 메시지를 포함합니다.
      // 만약, customerId가 String타입이 아닐 경우 위에서 설정한 invalid_type_error에 따라 errors 객체에는 'Please select a customer.' 문자열이 담긴 후 return됨
      // return된 오류 객체는 useActionState훅의 state에 저장되며, state.errors로 사용가능하다.
      // return 문이 실행되면 그 아래의 코드는 실행되지 않고 즉시 함수가 종료
      message: 'Missing Fields. Failed to Create Invoice.', // 사용자에게 검증 실패를 알리는 메시지
    };
  }
  const { customerId, amount, status } = validatedFields.data;
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