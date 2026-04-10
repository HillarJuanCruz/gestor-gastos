import { cn } from "@/lib/utils";

interface BalanceCardProps {
  title: string;
  amount: number;
  variant?: "default" | "ingreso" | "egreso" | "balance";
}

export default function BalanceCard({ title, amount, variant = "default" }: BalanceCardProps) {
  const isPositiveBalance = variant === "balance" && amount >= 0;
  const isNegativeBalance = variant === "balance" && amount < 0;

  const containerClasses = cn(
    "p-5 rounded-xl border shadow-sm flex flex-col justify-between transition-all hover:shadow-md hover:-translate-y-1",
    {
      "bg-card border-border": variant === "default" || variant === "ingreso" || variant === "egreso",
      "bg-emerald-50/50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/50": isPositiveBalance,
      "bg-red-50/50 border-red-100 dark:bg-red-950/20 dark:border-red-900/50": isNegativeBalance,
    }
  );

  const titleClasses = cn("text-sm font-medium", {
    "text-muted-foreground": variant === "default" || variant === "ingreso" || variant === "egreso",
    "text-emerald-700 dark:text-emerald-400": isPositiveBalance,
    "text-red-700 dark:text-red-400": isNegativeBalance,
  });

  const valueClasses = cn("font-bold mt-2", {
    "text-3xl text-foreground": variant === "default",
    "text-3xl text-emerald-600 dark:text-emerald-400": variant === "ingreso",
    "text-3xl text-red-600 dark:text-red-400": variant === "egreso",
    "text-4xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-400": isPositiveBalance,
    "text-4xl font-extrabold tracking-tight text-red-700 dark:text-red-400": isNegativeBalance,
  });

  return (
    <div className={containerClasses}>
      <span className={titleClasses}>{title}</span>
      <span className={valueClasses}>
        ${amount.toLocaleString("es-AR", { minimumFractionDigits: 2 })}
      </span>
    </div>
  );
}
