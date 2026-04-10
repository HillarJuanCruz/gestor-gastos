import SeccionGastos from '@/components/transaccion/transaccion-seccion';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <section className="p-6 rounded-xl bg-card shadow-sm border border-border transition-colors duration-300">
        <SeccionGastos />
      </section>
    </div>
  );
}
