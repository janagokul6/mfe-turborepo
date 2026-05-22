'use client';

import Protected from '../../components/Protected';
import Remote from '../../components/Remote';

export default function CartPage() {
  return (
    <Protected>
      <Remote scope="cartApp" module="Cart" />
    </Protected>
  );
}
