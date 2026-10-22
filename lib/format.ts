// Formatação padrão do portal (CLAUDE.md > Convenções):
// datas em dd/mm/aaaa no fuso de São Paulo e dinheiro guardado em centavos.

const TIME_ZONE = "America/Sao_Paulo";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: TIME_ZONE,
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

/** 2026-05-19T15:30:00Z -> "19/05/2026" */
export function formatDate(value: Date | string): string {
  return dateFormatter.format(new Date(value));
}

/** 2026-05-19T15:30:00Z -> "19/05/2026 12:30" */
export function formatDateTime(value: Date | string): string {
  return dateTimeFormatter.format(new Date(value)).replace(",", "");
}

/** 5671521 -> "R$ 56.715,21" */
export function formatMoney(cents: number): string {
  if (!Number.isInteger(cents)) {
    throw new Error("Valores em dinheiro devem estar em centavos inteiros.");
  }
  // Intl usa espaço não separável depois de "R$"; trocamos por espaço comum.
  return moneyFormatter.format(cents / 100).replace(/ /g, " ");
}
