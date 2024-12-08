"use client";
import { useState, useEffect } from "react";
import Modal from "./modal";
import { FaPlus } from "react-icons/fa6";
import { FaFilter } from "react-icons/fa";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";

const categories = [
  "Yiyecek",
  "Ulaşım",
  "Kira",
  "Sağlık",
  "Eğlence",
  "Giyim",
  "Eğitim",
  "Ev Alışverişi",
  "Faturalar",
  "Diğer",
];

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    description: "",
    category: "",
    amount: "",
    date: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Tüm Kategoriler");

  useEffect(() => {
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    if (expenses.length > 0) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  const handleAddExpense = () => {
    const newExp = { ...newExpense, id: Date.now() };
    setExpenses([...expenses, newExp]);
    setNewExpense({
      name: "",
      description: "",
      category: "",
      amount: "",
      date: "",
    });
    setIsModalOpen(false);
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setFilterCategory(selectedValue);
    setSelectedCategory(selectedValue);
  };

  const handleSortChange = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
  };

  const filteredExpenses = expenses
    .filter((expense) =>
      filterCategory ? expense.category === filterCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "desc") {
        return new Date(b.date) - new Date(a.date);
      } else {
        return new Date(a.date) - new Date(b.date);
      }
    });

  return (
    <div className="bg-[#0B0B0B] p-3 md:p-5 lg:p-6 h-full">
      <h2 className="font-bold text-4xl text-[#ced3d3] mb-3">Harcamalar</h2>
      <div className="flex justify-end gap-4 items-center mb-6">
        <button
          className="bg-[#6c9ec2c1] hover:bg-[#426279c1] text-[#ced3d3] text-sm font-semibold px-4 rounded h-8 flex items-center gap-1.5"
          onClick={() => setIsModalOpen(true)}
        >
          <FaPlus />
          <span>Ekle</span>
        </button>

        <div className="relative inline-block">
          <button
            className="text-[#6c9ec2c1] hover:text-[#ced3d3] border border-[#6c9ec2c1] rounded-lg h-8 w-8 flex justify-center items-center shadow-lg hover:border-[#ced3d3]"
            onClick={() => setIsCategoryOpen((prev) => !prev)}
          >
            <FaFilter />
          </button>

          {isCategoryOpen && (
            <ul
              className="absolute left-0 mt-2 py-2 w-40 bg-[#ced3d3] border border-gray-300 rounded shadow-lg z-10 space-y-1.5 text-md"
              onMouseLeave={() => setIsCategoryOpen(false)}
            >
              <li
                className={
                  "px-4 hover:bg-[#6c9ec2c1] hover:text-[#f0f4f4] cursor-pointer"
                }
                onClick={() => {
                  handleFilterChange({ target: { value: "" } });
                  setIsCategoryOpen(false);
                }}
              >
                Tüm Kategoriler
              </li>
              {categories.map((category, index) => (
                <li
                  className={
                    "px-4 hover:bg-[#6c9ec2c1] hover:text-[#f0f4f4] cursor-pointer"
                  }
                  key={index}
                  onClick={() => {
                    handleFilterChange({ target: { value: category } });
                    setIsCategoryOpen(false);
                  }}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="text-[#6c9ec2c1] hover:text-[#ced3d3] border border-[#6c9ec2c1] rounded-lg h-8 w-8 flex justify-center items-center shadow-lg hover:border-[#ced3d3] text-xl"
          onClick={handleSortChange}
        >
          <HiMiniArrowsUpDown />
        </button>
      </div>
      <div className="text-[#ced3d3] mb-2 font-bold text-xs bg-[#6c9ec2c1] rounded-md px-2 py-1">
        {selectedCategory ? selectedCategory : "Tüm Harcamalar"}
      </div>
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-[#426279c1] text-sm lg:text-lg">
            <th className="px-1 lg:px-4 py-2 text-[#ced3d3] text-start">
              Harcama Adı
            </th>
            <th className="px-1 md:px-4 py-2 text-[#ced3d3] text-start">
              Açıklama
            </th>
            <th className="px-1 md:px-4 py-2 text-[#ced3d3] text-start hidden lg:block">
              Kategori
            </th>
            <th className="px-1 md:px-4 py-2 text-[#ced3d3] text-start">
              Tutar
            </th>
            <th className="px-1 md:px-4 py-2 text-[#ced3d3] text-start">
              Tarih
            </th>
            <th className="px-1 md:px-4 py-2 text-[#ced3d3] text-start"></th>
          </tr>
        </thead>
        <tbody className="bg-gray-700 text-[#ced3d3] text-xs lg:text-[16px]">
          {filteredExpenses.map((expense) => (
            <tr key={expense.id} className="border-b">
              <td className="px-1 md:px-4 py-2 text-[#ced3d3] max-w-[100px] lg:max-w-[200px] break-words whitespace-normal">
                {expense.name}
              </td>
              <td className="px-1 md:px-4 py-2 text-[#ced3d3] max-w-[100px] lg:max-w-[200px] break-words whitespace-normal ">
                {expense.description}
              </td>
              <td className="px-1 md:px-4 py-2 text-[#ced3d3] w-[150px] hidden lg:block">
                {expense.category}
              </td>
              <td className="px-1 md:px-4 py-2 text-[#ced3d3] w-[100px] lg:w-[120px]">
                {expense.amount} ₺
              </td>
              <td className="px-1 md:px-4 py-2 text-[#ced3d3] w-[100px] lg:w-[120px]]">
                {new Date(expense.date).toLocaleDateString()}
              </td>
              <td className="px-1 md:px-4 py-2 w-[30px] lg:w-[50px]">
                <button
                  className="text-[#ced3d3]"
                  onClick={() => handleDeleteExpense(expense.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newExpense={newExpense}
        setNewExpense={setNewExpense}
        handleAddExpense={handleAddExpense}
        categories={categories}
        type="expense"
      />
    </div>
  );
}
