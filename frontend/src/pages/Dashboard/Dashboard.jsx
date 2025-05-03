// src/pages/Dashboard/Dashboard.jsx
import { useState, useEffect } from "react";
import { getDailyLogs, createDailyLog } from "../../logic/apiManager";
import MacroRings from "../../components/MacroDisplay/MacroRings";
import MacroPieChart from "../../components/MacroDisplay/MacroPieChart";

export default function Dashboard()
{
    const [logs, setLogs] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [newFood, setNewFood] = useState({ date: '', foods: [], notes: '' });
    const [totals, setTotals] = useState({ carbs: 0, fat: 0, protein: 0 });

    useEffect(() =>
    {
        async function loadLogs()
        {
            const { data, error } = await getDailyLogs();
            if (!error)
            {
                setLogs(data);
                calculateMacros(data);
            }
        }
        loadLogs();
    }, []);

    const calculateMacros = (logs) =>
    {
        let totalCarbs = 0;
        let totalFat = 0;
        let totalProtein = 0;

        logs.forEach(log =>
        {
            log.foods.forEach(food =>
            {
                food.nutrients?.forEach(nutrient =>
                {
                    if (nutrient.nutrientName === "Carbohydrate")
                    {
                        totalCarbs += nutrient.amount || 0;
                    } else if (nutrient.nutrientName === "Total lipid")
                    {
                        totalFat += nutrient.amount || 0;
                    } else if (nutrient.nutrientName === "Protein")
                    {
                        totalProtein += nutrient.amount || 0;
                    }
                });
            });
        });

        setTotals({ carbs: totalCarbs, fat: totalFat, protein: totalProtein });
    };

    const handleNewLog = async (e) =>
    {
        e.preventDefault();
        const { data, error } = await createDailyLog(newFood);
        if (!error)
        {
            setLogs(prev => [...prev, data]);
            setIsPanelOpen(false);
            calculateMacros([...logs, data]);
        } else
        {
            alert("Failed to create log.");
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Main Content */}
            <div className="flex-1 p-6">
                <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

                {/* Macro Displays */}
                <div className="flex gap-10 mb-10">
                    <MacroRings carbs={totals.carbs} fat={totals.fat} protein={totals.protein} />
                    <MacroPieChart carbs={totals.carbs} fat={totals.fat} protein={totals.protein} />
                </div>

                <button
                    onClick={() => setIsPanelOpen(true)}
                    className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                    + Add Daily Log
                </button>

                {/* List of daily logs */}
                <ul className="mt-6 space-y-4">
                    {logs.map((log) => (
                        <li key={log._id} className="bg-white p-4 rounded shadow">
                            <div className="font-semibold">{log.date}</div>
                            <div>{log.foods.length} foods logged</div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Collapsible Right Panel */}
            {isPanelOpen && (
                <div className="w-96 bg-white border-l p-6 shadow-md relative animate-slide-in-right">
                    <button
                        onClick={() => setIsPanelOpen(false)}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                    >
                        ✕
                    </button>
                    <h2 className="text-2xl font-bold mb-6">New Daily Log</h2>
                    <form onSubmit={handleNewLog}>
                        <label className="block mb-2 font-semibold">Date</label>
                        <input
                            type="date"
                            className="border p-2 w-full mb-4"
                            value={newFood.date}
                            onChange={(e) => setNewFood({ ...newFood, date: e.target.value })}
                            required
                        />

                        <label className="block mb-2 font-semibold">Notes</label>
                        <textarea
                            className="border p-2 w-full mb-4"
                            value={newFood.notes}
                            onChange={(e) => setNewFood({ ...newFood, notes: e.target.value })}
                        />

                        {/* Future: Add foods dynamically here */}

                        <button type="submit" className="bg-green-600 text-white py-2 w-full rounded hover:bg-green-700">
                            Save Log
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
