"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { activity, heatmap } from "@/lib/product";

export function LearningRhythmChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={activity} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="minutes" x1="0" x2="0" y1="0" y2="1">
            <stop offset="5%" stopColor="#19c7b7" stopOpacity={0.55} />
            <stop offset="95%" stopColor="#19c7b7" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.25)" />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,.25)" }} />
        <Area type="monotone" dataKey="minutes" stroke="#19c7b7" strokeWidth={3} fill="url(#minutes)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function SkillHeatmapChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={heatmap} layout="vertical" margin={{ left: 12, right: 8, top: 8, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,.22)" />
        <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
        <YAxis type="category" dataKey="skill" width={90} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid rgba(148,163,184,.25)" }} />
        <Bar dataKey="cohort" fill="#d9e3ef" radius={[0, 8, 8, 0]} />
        <Bar dataKey="student" fill="#7161ef" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
