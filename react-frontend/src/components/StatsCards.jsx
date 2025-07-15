import React from 'react';

const StatsCards = ({ taskStats }) => {
  const stats = [
    { label: 'Total Tasks', value: taskStats.total, color: 'text-blue-600' },
    { label: 'Completed', value: taskStats.completed, color: 'text-green-600' },
    { label: 'Active', value: taskStats.active, color: 'text-orange-600' },
    { label: 'Overdue', value: taskStats.overdue, color: 'text-red-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm border">
          <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
          <div className="text-sm text-gray-600">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;