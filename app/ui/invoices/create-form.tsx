'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({ customers }: { customers: CustomerField[] }) {
  const initialState: State = { message: null, errors: {} };
  // initialState라는 변수를 선언하고, 이 변수의 타입을 State로 지정
  //= { message: null, errors: {} }: initialState 변수의 값을 { message: null, errors: {} }로 초기화합니다. 즉, message는 null이고, errors는 빈 객체입니다.
  
  const [state, formAction] = useActionState(createInvoice, initialState);
  // 여기서 state는 현재 상태를 나타내며, formAction은 폼이 제출될 때 호출되는 함수이다
  // useActionState 훅은 [state, formAction] 값을 반환합니다 (구조 분해 할당을 사용하여 useActionState 훅의 반환 값을 state와 formAction이라는 두 개의 변수에 할당)
  /* ★ state에는 createInvoice 함수의 prevState 값이 오게 되지만, createInvoice 함수에서 직접적으로 prevState 객체를 반환하고 있지 않고 필요에 따라 prevState 객체의 하위 객체만 단독으로(ex. errors) 전달하고 있음
     어쨌든 하위 객체인 errors를 사용하려면 state.errors 이런 식으로 사용해야함  */

  return (
    <form action={formAction}> 
    {/* Next.js action은 form 제출(이용자가 sumit 버튼 클릭) 시 함수(formAction)가 실행되며,
    Next.js는 서버 측에서 이 데이터를 자동으로 파싱하여 FormData 객체로 전달합니다. (단, 호출받는 함수가 'use server' 지시어를 사용하는 경우에만 FormData타입으로 전달됨) */}
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error" 
              // aria-describedby는 그냥 시각장애인 등을 돕기위한 스크린 리더일 뿐 해당 코드가 없어라도 동작에 문제x
              // id="customer-error"가 실행되면 오류메시지를 읽어줌
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true"> {/* (서버 측 데이터 검증 방법) */}
            {/* 해당 부분은 state.errors객체가 없다면(오류가 발생하지 않는다면) 실행되지 않음 */}
            {/* id="customer-error" : 이 id 속성은 select 입력의 오류 메시지를 담고 있는 HTML 요소를 고유하게 식별합니다. aria-describedby가 관계를 설정하기 위해 필요 */}
            {/* aria-live="polite" : 스크린 리더가 콘텐츠 변경 사항을 사용자에게 알리는 방식을 제어합니다. "polite" 값은 사용자에게 방해되지 않도록 유휴 상태일 때 변경 사항을 알려준다 */}
        {state.errors?.customerId &&
          state.errors.customerId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Enter USD amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                // required // required 속성은 HTML 폼 요소에서 사용되며, 사용자가 해당 입력 필드를 비워두지 못하도록 하는 데 사용됩니다.(클라이언트 측 검증방법)
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        {/* Invoice Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set the invoice status
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="pending"
                  name="status"
                  type="radio"
                  value="pending"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="pending"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  Pending <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="paid"
                  name="status"
                  type="radio"
                  value="paid"
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                />
                <label
                  htmlFor="paid"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Paid <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
