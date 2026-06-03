import React, { useEffect, useState } from 'react';
import API from '../../services/api';
import { type FinancialReport } from '../../types/finance';

const Ledger: React.FC = () => {
  const [report, setReport] = useState<FinancialReport | null>(null);
  const [selectedTermId, setSelectedTermId] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFinancialData = async () => {
      setLoading(true);
      try {
        const response = await API.get<FinancialReport>(`/finance/reports/term/${selectedTermId}`);
        setReport(response.data);
      } catch (error) {
        console.error('Failed to compile ledger accounts data.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFinancialData();
  }, [selectedTermId]);

  if (loading) {
    return <div className="p-8 text-center text-white">Compiling Balance Sheet Ledger...</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Title Header Layout */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            💼 Academy Financial Ledger
          </h1>
          <p className="text-sm text-gray-400">Real-time tuition fee tracking, cash inflows, and operational expenses</p>
        </div>

        {/* Evaluation Window Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="finance-term-select" className="text-sm text-gray-400">Accounting Statement Loop:</label>
          <select
            id="finance-term-select"
            value={selectedTermId}
            onChange={(e) => setSelectedTermId(Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value={1}>Term 1 Statement</option>
            <option value={2}>Term 2 Statement</option>
            <option value={3}>Term 3 Statement</option>
          </select>
        </div>
      </div>

      {report && (
        <>
          {/* Executive Analytics KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Cash Inflow Metric */}
            <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-md">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Revenue Inflows</span>
              <div className="text-2xl font-extrabold text-emerald-400 mt-2">
                ${report.totalInflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Cash Outflow Metric */}
            <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-md">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Operational Expenses</span>
              <div className="text-2xl font-extrabold text-red-400 mt-2">
                ${report.totalOutflow.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Net Margin Profit/Loss Metric */}
            <div className="bg-gray-800 border border-gray-700 p-5 rounded-xl shadow-md">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Net Accounting Surplus</span>
              <div className={`text-2xl font-extrabold mt-2 ${report.netProfit >= 0 ? 'text-blue-400' : 'text-orange-500'}`}>
                ${report.netProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Allocation Category Distribution Breakdowns */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Budget Line Category Allocation Breakdown</h2>
            <div className="space-y-4">
              {Object.entries(report.breakdownByCategory).map(([category, value]) => (
                <div key={category} className="bg-gray-900 p-4 rounded-lg border border-gray-750 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-semibold tracking-wide text-white uppercase">
                      {category.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-200">
                      ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
              {Object.keys(report.breakdownByCategory).length === 0 && (
                <p className="text-center py-6 text-gray-500 text-sm">No transaction allocations assigned to this period block yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Ledger;