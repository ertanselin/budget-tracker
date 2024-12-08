"use client";
import { useState, useEffect } from "react";
import PieChart from "./pie-chart";

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    const savedIncomes = localStorage.getItem("incomes");
    if (savedIncomes) {
      setIncomes(JSON.parse(savedIncomes));
    }
  }, []);

  const getTotalByCategory = (data) => {
    return data.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + parseFloat(item.amount);
      return acc;
    }, {});
  };

  const gelirKategoriToplamlari = getTotalByCategory(incomes);
  const giderKategoriToplamlari = getTotalByCategory(expenses);

  const incomeChartData = {
    labels: Object.keys(gelirKategoriToplamlari),
    values: Object.values(gelirKategoriToplamlari),
    colors: Object.keys(gelirKategoriToplamlari).map(
      (_, index) =>
        `hsl(${
          (index * 360) / Object.keys(gelirKategoriToplamlari).length
        }, 70%, 60%)`
    ),
  };

  const expenseChartData = {
    labels: Object.keys(giderKategoriToplamlari),
    values: Object.values(giderKategoriToplamlari),
    colors: Object.keys(giderKategoriToplamlari).map(
      (_, index) =>
        `hsl(${
          (index * 360) / Object.keys(giderKategoriToplamlari).length
        }, 70%, 60%)`
    ),
  };

  return (
    <div className="bg-[#0B0B0B] p-3 md:p-5 lg:p-6 h-full text-white">
      <h2 className="font-bold text-4xl text-[#ced3d3] mb-10">Anasayfa</h2>

      <div className="flex flex-wrap gap-10">
        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[#6c9ec2c1] text-2xl font-semibold mb-2">
            Harcamalar
          </h4>
          <table className="min-w-full border-collapse mb-4 bg-[#4b7491c1]">
            <thead>
              <tr>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Toplam Gider</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(giderKategoriToplamlari).map((kategori) => (
                <tr key={kategori}>
                  <td className="border p-2">{kategori}</td>
                  <td className="border p-2">
                    {giderKategoriToplamlari[kategori]} ₺
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[#6c9ec2c1] text-2xl font-semibold mb-2">
            Gelirler
          </h4>
          <table className="min-w-full border-collapse mb-4 bg-[#4b7491c1]">
            <thead>
              <tr>
                <th className="border p-2">Kategori</th>
                <th className="border p-2">Toplam Gelir</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(gelirKategoriToplamlari).map((kategori) => (
                <tr key={kategori}>
                  <td className="border p-2">{kategori}</td>
                  <td className="border p-2">
                    {gelirKategoriToplamlari[kategori]} ₺
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex-1 min-w-[300px]">
          <h4 className="text-[#6c9ec2c1] text-2xl font-semibold mb-2">
            Toplam Durum
          </h4>
          <table className="min-w-full border-collapse mb-4 bg-[#4b7491c1]">
            <thead>
              <tr>
                <th className="border p-2">Toplam Gelir</th>
                <th className="border p-2">Toplam Gider</th>
                <th className="border p-2">Net Durum</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">
                  {Object.values(gelirKategoriToplamlari).reduce(
                    (sum, value) => sum + value,
                    0
                  )}{" "}
                  ₺
                </td>
                <td className="border p-2">
                  {Object.values(giderKategoriToplamlari).reduce(
                    (sum, value) => sum + value,
                    0
                  )}{" "}
                  ₺
                </td>
                <td className="border p-2">
                  {Object.values(gelirKategoriToplamlari).reduce(
                    (sum, value) => sum + value,
                    0
                  ) -
                    Object.values(giderKategoriToplamlari).reduce(
                      (sum, value) => sum + value,
                      0
                    )}
                  ₺
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 mt-16 justify-center items-center">
        <div className="flex-1 max-h-[500px] max-w-[500px]">
          <PieChart data={expenseChartData} title="Harcamalar" />
        </div>
        <div className="flex-1 max-h-[500px] max-w-[500px]">
          <PieChart data={incomeChartData} title="Gelirler" />
        </div>
      </div>
    </div>
  );
}
