export default function Modal({
  isOpen,
  onClose,
  newExpense,
  setNewExpense,
  handleAddExpense,
  categories,
  type,
}) {
  if (!isOpen) return null;

  const isFormValid = () => {
    return (
      newExpense.name !== "" &&
      newExpense.description !== "" &&
      newExpense.category !== "" &&
      newExpense.amount !== "" &&
      newExpense.date !== ""
    );
  };

  const label = type === "income" ? "Gelir Adı" : "Harcama Adı";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <div className="mb-4">
          <label className="block mb-2">{label}</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newExpense.name}
            onChange={(e) =>
              setNewExpense({ ...newExpense, name: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Açıklama</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={newExpense.description}
            onChange={(e) =>
              setNewExpense({ ...newExpense, description: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Kategori</label>
          <select
            className="w-full p-2 border rounded"
            value={newExpense.category}
            onChange={(e) =>
              setNewExpense({ ...newExpense, category: e.target.value })
            }
          >
            <option value="">Kategori Seç</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tutar</label>
          <input
            type="number"
            className="w-full p-2 border rounded"
            value={newExpense.amount}
            onChange={(e) =>
              setNewExpense({ ...newExpense, amount: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Tarih</label>
          <input
            type="date"
            className="w-full p-2 border rounded"
            value={newExpense.date}
            onChange={(e) =>
              setNewExpense({ ...newExpense, date: e.target.value })
            }
          />
        </div>

        {!isFormValid() && (
          <p className="text-red-500 font-semibold text-sm mb-4">
            Tüm alanlar doldurulmadan ekleme yapılamaz.
          </p>
        )}

        <div className="flex justify-end gap-4">
          <button
            className="bg-[#ae2f2fc1] text-white px-4 py-2 rounded font-semibold w-[80px]"
            onClick={onClose}
          >
            Kapat
          </button>

          <button
            className={`px-4 py-2 rounded font-semibold w-[80px] ${
              isFormValid()
                ? "bg-[#6c9ec2c1]  text-white"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
            }`}
            onClick={handleAddExpense}
            disabled={!isFormValid()}
          >
            Ekle
          </button>
        </div>
      </div>
    </div>
  );
}
