import SeccionGastos from '@/components/gasto/gasto-seccion';

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <section className="p-6 rounded-xl mb-8 bg-white shadow-sm border border-slate-100">
        <SeccionGastos />
      </section>
    </div>
  );
}
