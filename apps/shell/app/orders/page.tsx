'use client';

import Protected from '../../components/Protected';
import Remote from '../../components/Remote';

export default function OrdersPage() {
  return (
    <Protected>
      <Remote scope="orderApp" module="Orders" />
    </Protected>
  );
}
