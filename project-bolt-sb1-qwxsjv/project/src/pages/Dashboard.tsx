import React, { useState } from 'react';
import { Clock, Calendar } from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B'];

export default function Dashboard() {
  const [absenceFilter, setAbsenceFilter] = useState('week');
  
  const stats = {
    totalStudents: 150,
    todayAbsences: 12,
    peakHour: '8:00 AM',
  };

  // Simulated data for charts
  const weeklyAttendanceData = [
    { day: 'Lun', present: 142, absent: 8 },
    { day: 'Mar', present: 138, absent: 12 },
    { day: 'Mié', present: 145, absent: 5 },
    { day: 'Jue', present: 140, absent: 10 },
    { day: 'Vie', present: 135, absent: 15 },
  ];

  const monthlyTrendData = [
    { month: 'Ene', rate: 95 },
    { month: 'Feb', rate: 93 },
    { month: 'Mar', rate: 94 },
    { month: 'Abr', rate: 92 },
  ];

  const attendanceDistributionData = [
    { name: 'Presentes', value: 85 },
    { name: 'Ausencias Justificadas', value: 10 },
    { name: 'Ausencias Injustificadas', value: 5 },
  ];

  // Simulated data for students with most absences
  const getAbsentStudents = () => {
    const weeklyAbsences = [
      { id: 1, name: 'Ana García', absences: 3, lastAbsence: '2024-03-18' },
      { id: 2, name: 'Carlos López', absences: 2, lastAbsence: '2024-03-17' },
      { id: 3, name: 'María Rodríguez', absences: 2, lastAbsence: '2024-03-15' },
    ];

    const monthlyAbsences = [
      { id: 1, name: 'Ana García', absences: 8, lastAbsence: '2024-03-18' },
      { id: 2, name: 'Pedro Sánchez', absences: 7, lastAbsence: '2024-03-10' },
      { id: 3, name: 'Carlos López', absences: 6, lastAbsence: '2024-03-17' },
      { id: 4, name: 'María Rodríguez', absences: 5, lastAbsence: '2024-03-15' },
    ];

    return absenceFilter === 'week' ? weeklyAbsences : monthlyAbsences;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Total Estudiantes</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">{stats.totalStudents}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Ausencias Hoy</h3>
          </div>
          <p className="mt-2 text-3xl font-semibold text-red-600">{stats.todayAbsences}</p>
        </div>

        <div className="card">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Hora Pico</h3>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <p className="mt-2 text-3xl font-semibold text-gray-900">{stats.peakHour}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Attendance Bar Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Asistencia Semanal</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" name="Presentes" fill="#4F46E5" />
                <Bar dataKey="absent" name="Ausentes" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Trend Line Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tendencia Mensual de Asistencia</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  name="Tasa de Asistencia (%)" 
                  stroke="#4F46E5" 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Distribution Pie Chart */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Distribución de Asistencia</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={attendanceDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {attendanceDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Students with Most Absences */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Estudiantes con Más Ausencias</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select
                className="input py-1"
                value={absenceFilter}
                onChange={(e) => setAbsenceFilter(e.target.value)}
              >
                <option value="week">Esta Semana</option>
                <option value="month">Este Mes</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estudiante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ausencias
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Última Ausencia
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {getAbsentStudents().map((student) => (
                  <tr key={student.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.absences}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.lastAbsence}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
