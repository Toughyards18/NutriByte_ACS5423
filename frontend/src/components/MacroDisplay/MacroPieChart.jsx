// file: frontend/src/components/MacroDisplay/MacroPieChart.jsx
// This component displays a pie chart for the macros using the recharts library.

import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#3498db", "#f1c40f", "#2ecc71"];

export default function MacroPieChart({ macros })
{
    const data = [
        { name: "Carbs", value: macros.carbs.current },
        { name: "Fat", value: macros.fat.current },
        { name: "Protein", value: macros.protein.current }
    ];

    return (
        <div className="flex justify-center">
            <PieChart width={250} height={250}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={90}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </div>
    );
}
