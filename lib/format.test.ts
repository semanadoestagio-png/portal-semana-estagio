import { describe, expect, it } from "vitest";

import { formatDate, formatDateTime, formatMoney } from "./format";

describe("formatDate", () => {
  it("mostra a data no fuso de São Paulo", () => {
    expect(formatDate("2026-05-19T15:30:00Z")).toBe("19/05/2026");
  });

  it("não adianta o dia para quem está perto da meia-noite em UTC", () => {
    // 01:00 UTC do dia 20 ainda é dia 19 em São Paulo
    expect(formatDate("2026-05-20T01:00:00Z")).toBe("19/05/2026");
  });
});

describe("formatDateTime", () => {
  it("mostra data e hora em dd/mm/aaaa HH:mm", () => {
    expect(formatDateTime("2026-05-19T15:30:00Z")).toBe("19/05/2026 12:30");
  });
});

describe("formatMoney", () => {
  it("formata centavos como reais", () => {
    expect(formatMoney(5671521)).toBe("R$ 56.715,21");
    expect(formatMoney(1000000)).toBe("R$ 10.000,00");
    expect(formatMoney(0)).toBe("R$ 0,00");
  });

  it("recusa valores que não estão em centavos", () => {
    expect(() => formatMoney(10.5)).toThrow();
  });
});
