'use client';

import { useState } from 'react';

interface CreditFormData {
  age: number;
  income: number;
  emp_length: number;
  loan_grade: number;
  loan_amnt: number;
  loan_int_rate: number;
  loan_percent_income: number;
  default_on_file: number;
  cred_hist_length: number;
  home_OTHER: number;
  home_OWN: number;
  home_RENT: number;
  loan_EDUCATION: number;
  loan_HOMEIMPROVEMENT: number;
  loan_MEDICAL: number;
  loan_PERSONAL: number;
  loan_VENTURE: number;
}

export default function Home() {
  const [formData, setFormData] = useState<CreditFormData>({
    age: 24,
    income: 50000,
    emp_length: 4.0,
    loan_grade: 2,
    loan_amnt: 10000,
    loan_int_rate: 12.5,
    loan_percent_income: 0.20,
    default_on_file: 0,
    cred_hist_length: 3.0,
    home_OTHER: 0,
    home_OWN: 0,
    home_RENT: 1,
    loan_EDUCATION: 0,
    loan_HOMEIMPROVEMENT: 0,
    loan_MEDICAL: 0,
    loan_PERSONAL: 1,
    loan_VENTURE: 0,
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: parseFloat(value) || 0 };
      if (name === 'loan_amnt' || name === 'income') {
        const income = name === 'income' ? parseFloat(value) || 1 : prev.income || 1;
        const amnt = name === 'loan_amnt' ? parseFloat(value) || 0 : prev.loan_amnt;
        updated.loan_percent_income = parseFloat((amnt / income).toFixed(2));
      }
      return updated;
    });
  };

  const handleHomeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      home_RENT: value === 'RENT' ? 1 : 0,
      home_OWN: value === 'OWN' ? 1 : 0,
      home_OTHER: value === 'OTHER' ? 1 : 0,
    }));
  };

  const handleIntentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      loan_EDUCATION: value === 'EDUCATION' ? 1 : 0,
      loan_HOMEIMPROVEMENT: value === 'HOMEIMPROVEMENT' ? 1 : 0,
      loan_MEDICAL: value === 'MEDICAL' ? 1 : 0,
      loan_PERSONAL: value === 'PERSONAL' ? 1 : 0,
      loan_VENTURE: value === 'VENTURE' ? 1 : 0,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/predicthttps://creditworthinesspredictor-production.up.railway.app/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentHomeValue = () => {
    if (formData.home_RENT === 1) return 'RENT';
    if (formData.home_OWN === 1) return 'OWN';
    if (formData.home_OTHER === 1) return 'OTHER';
    return 'MORTGAGE';
  };

  const getCurrentIntentValue = () => {
    if (formData.loan_EDUCATION === 1) return 'EDUCATION';
    if (formData.loan_HOMEIMPROVEMENT === 1) return 'HOMEIMPROVEMENT';
    if (formData.loan_MEDICAL === 1) return 'MEDICAL';
    if (formData.loan_PERSONAL === 1) return 'PERSONAL';
    if (formData.loan_VENTURE === 1) return 'VENTURE';
    return 'DEBTCONSOLIDATION';
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-6xl h-auto max-h-[90vh] bg-white shadow-2xl rounded-xl flex flex-col md:flex-row overflow-hidden border border-gray-200">
        
        {/* LEFT COLUMN: Entry Inputs */}
        <form onSubmit={handleSubmit} className="w-full md:w-2/3 p-5 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200 bg-white">
          <div>
            <div className="mb-3">
              <h2 className="text-xl font-black text-gray-900 tracking-tight">Credit Assessment Portal</h2>
              <p className="text-xs text-gray-500">Configure parameters precisely to update predictive matrix variables.</p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Age</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Income ($)</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Emp Length (Yrs)</label>
                <input type="number" name="emp_length" value={formData.emp_length} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5 font-sans">Credit Hist (Yrs)</label>
                <input type="number" name="cred_hist_length" value={formData.cred_hist_length} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Loan Amount ($)</label>
                <input type="number" name="loan_amnt" value={formData.loan_amnt} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Interest Rate (%)</label>
                <input type="number" step="0.01" name="loan_int_rate" value={formData.loan_int_rate} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Loan Grade</label>
                <select name="loan_grade" value={formData.loan_grade} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  {[1, 2, 3, 4, 5, 6, 7].map((g) => (
                    <option key={g} value={g}>Grade {String.fromCharCode(64 + g)} ({g})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Prior Default?</label>
                <select name="default_on_file" value={formData.default_on_file} onChange={handleChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option value={0}>Clear Record (0)</option>
                  <option value={1}>Defaulter File (1)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Home Status</label>
                <select value={getCurrentHomeValue()} onChange={handleHomeChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option value="RENT">Rent</option>
                  <option value="OWN">Own</option>
                  <option value="MORTGAGE">Mortgage</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-0.5">Loan Intent</label>
                <select value={getCurrentIntentValue()} onChange={handleIntentChange} className="w-full p-1.5 text-sm border border-gray-300 rounded text-black focus:ring-1 focus:ring-blue-500 outline-none bg-white">
                  <option value="PERSONAL">Personal</option>
                  <option value="EDUCATION">Education</option>
                  <option value="MEDICAL">Medical</option>
                  <option value="VENTURE">Venture</option>
                  <option value="HOMEIMPROVEMENT">Home Improvement</option>
                  <option value="DEBTCONSOLIDATION">Debt Consolidation</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white p-2.5 rounded font-bold text-sm hover:bg-blue-700 transition disabled:opacity-50">
              {loading ? 'Processing Model Inputs...' : 'Evaluate Application'}
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: Real-time Analysis & Prediction Outcomes */}
        <div className="w-full md:w-1/3 p-5 bg-gray-50 flex flex-col justify-between">
          <div>
            <h3 className="text-md font-bold text-gray-800 border-b border-gray-200 pb-1.5 mb-3">Live Metrics</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs border-b border-gray-200 pb-1">
                <span className="text-gray-500">Loan-To-Income</span>
                <span className="font-mono font-bold text-gray-900">{formData.loan_percent_income} ({Math.round(formData.loan_percent_income * 100)}%)</span>
              </div>
              <div className="flex justify-between text-xs border-b border-gray-200 pb-1">
                <span className="text-gray-500">Requested Principal</span>
                <span className="font-mono font-bold text-gray-900">${formData.loan_amnt.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-xs border-b border-gray-200 pb-1">
                <span className="text-gray-500">Reported Annual Yield</span>
                <span className="font-mono font-bold text-gray-900">${formData.income.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Result Output Display area */}
          <div className="mt-4 flex-1 flex flex-col justify-center">
            {prediction !== null ? (
              <div className={`p-4 rounded-lg text-center border shadow-sm ${
                prediction === 1 
                  ? 'bg-red-50 text-red-700 border-red-200' 
                  : 'bg-green-50 text-green-700 border-green-200'
              }`}>
                <div className="text-2xl mb-1">{prediction === 1 ? '⚠️' : '✅'}</div>
                <div className="text-xs tracking-wider uppercase font-black">Decision Output</div>
                <div className="text-md font-extrabold mt-0.5">
                  {prediction === 1 ? 'HIGH RISK DEFAULT' : 'APPROVED ASSIGNMENT'}
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg text-center border border-dashed border-gray-300 text-gray-400 text-xs">
                Awaiting input execution matrix diagnostics.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}