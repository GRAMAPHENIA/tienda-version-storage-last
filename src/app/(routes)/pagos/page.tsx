// src/pages/pagos/page.tsx
import PaymentForm from "@/components/Payment/PaymentForm";
import PaymentSummary from "@/components/Payment/PaymentSummary";

const PaymentPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Proceso de Pago</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-1">
          <PaymentForm />
        </div>
        <div className="lg:col-span-1">
          <PaymentSummary />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
