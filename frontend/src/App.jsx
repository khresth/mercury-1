import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, Star, AlertTriangle, Wallet, Plus, User } from 'lucide-react';

const mockUsers = [
  { address: '0x1234...5678', rating: 4.5, completed: 23, balance: 1250.5 },
  { address: '0x8765...4321', rating: 4.2, completed: 15, balance: 750.25 },
  { address: '0x9999...1111', rating: 3.8, completed: 8, balance: 2100.75 },
];

function App() {
  const [user, setUser] = useState({ address: '', rating: 0, completed: 0, isConnected: false });
  const [loans, setLoans] = useState([
    { id: '1', lender: mockUsers[0].address, lenderRating: 4.5, amount: 100, interestRate: 10, duration: 30, status: 'available', totalRepayment: 110 },
    { id: '2', lender: mockUsers[1].address, lenderRating: 4.2, amount: 500, interestRate: 8, duration: 60, status: 'available', totalRepayment: 540 },
    { id: '3', lender: mockUsers[2].address, lenderRating: 3.8, amount: 250, interestRate: 100, duration: 14, status: 'available', totalRepayment: 500 },
  ]);

  const connectWallet = () => {
    const u = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    setUser({ ...u, isConnected: true });
  };
  const disconnect = () => setUser({ address: '', rating: 0, completed: 0, isConnected: false });

  const createLoan = (amount, interest, duration) => {
    const newLoan = {
      id: Date.now().toString(),
      lender: user.address,
      lenderRating: user.rating,
      amount,
      interestRate: interest,
      duration,
      status: 'available',
      totalRepayment: Math.round(amount * (1 + interest / 100)),
    };
    setLoans(prev => [newLoan, ...prev]);
  };

  const acceptLoan = id =>
    setLoans(loans.map(l => (l.id === id ? { ...l, status: 'active', borrower: user.address } : l)));

  const repayLoan = id => {
    setLoans(loans.map(l => (l.id === id ? { ...l, status: 'completed' } : l)));
    setUser(u => ({ ...u, rating: Math.min(5, u.rating + 0.1), completed: u.completed + 1 }));
  };

  const available = loans.filter(l => l.status === 'available');
  const userLoans = loans.filter(l => l.lender === user.address || l.borrower === user.address);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Mercury</h1>
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">P2P Lending</span>
          </div>
          {user.isConnected ? (
            <button onClick={disconnect} className="text-sm border px-3 py-1 rounded-md">
              {user.address}
            </button>
          ) : (
            <button onClick={connectWallet} className="flex items-center gap-1 text-sm bg-blue-600 text-white px-3 py-1 rounded-md">
              <Wallet size={14} /> Connect
            </button>
          )}
        </div>
      </header>

      {!user.isConnected ? (
        <div className="max-w-2xl mx-auto mt-20 bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to Mercury</h2>
          <p className="text-gray-600 mb-4">Set your own loan terms & borrow instantly.</p>
          <div className="text-sm text-gray-500 space-y-1">
            <p>🔹 Transparent marketplace</p>
            <p>🔹 Smart-contract automation</p>
            <p>🔹 Trust built via ratings</p>
          </div>
        </div>
      ) : (
        <>
          <section className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Available', value: `$${available.reduce((a, b) => a + b.amount, 0)}` },
              { label: 'Avg Interest', value: `${(available.reduce((a, b) => a + b.interestRate, 0) / available.length || 0).toFixed(1)}%` },
              { label: 'Active Offers', value: available.length },
              { label: 'Smart Contract', value: '100%' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-blue-600">{s.value}</span>
                <span className="text-xs text-slate-500">{s.label}</span>
              </div>
            ))}
          </section>

          <main className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
            {/* Create Loan */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="font-semibold mb-3 flex items-center gap-1"><Plus size={18}/> Create Offer</h3>
                <CreateLoanForm createLoan={createLoan} balance={user.balance} />
              </div>
              <div className="bg-white rounded-xl shadow p-4">
                <h3 className="font-semibold mb-2 flex items-center gap-1"><User size={18}/> Profile</h3>
                <p className="text-sm">{user.address}</p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={`${i < Math.floor(user.rating) ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor"/>
                  ))}
                  <span className="ml-1 text-xs">{user.rating}/5</span>
                </div>
              </div>
            </aside>

            {/* Loan Marketplace */}
            <section className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold">Available Loans</h2>
              {available.map(l => (
                <div key={l.id} className="bg-white rounded-xl shadow p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-green-600">${l.amount}</span>
                    <span className="text-sm text-slate-500">{l.lender}</span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div><TrendingUp className="inline w-4 h-4 mr-1 text-blue-500" />{l.interestRate}%</div>
                    <div><Clock className="inline w-4 h-4 mr-1 text-purple-500" />{l.duration}d</div>
                    <div><DollarSign className="inline w-4 h-4 mr-1 text-green-500" />${l.totalRepayment}</div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className={`${i < Math.floor(l.lenderRating) ? 'text-yellow-400' : 'text-slate-300'}`} fill="currentColor"/>
                      ))}
                      <span className="text-xs">{l.lenderRating}</span>
                    </div>
                  </div>

                  {l.interestRate > 50 && (
                    <div className="flex items-center gap-1 text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                      <AlertTriangle size={14}/> High Risk
                    </div>
                  )}

                  <button onClick={() => acceptLoan(l.id)} className="w-full bg-green-600 text-white py-2 rounded-md text-sm">
                    Accept Loan
                  </button>
                </div>
              ))}
            </section>

            {/* My Loans */}
            {userLoans.length > 0 && (
              <section className="lg:col-span-3 mt-8">
                <h2 className="text-lg font-semibold mb-4">My Loans</h2>
                <div className="space-y-4">
                  {userLoans.map(l => (
                    <div key={l.id} className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
                      <div>
                        <span className="font-bold">${l.amount}</span> @ {l.interestRate}%
                        <p className="text-sm text-slate-500">Status: {l.status}</p>
                      </div>
                      {l.status === 'active' && (
                        <button onClick={() => repayLoan(l.id)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Repay</button>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </>
      )}

      <footer className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <AlertTriangle className="inline w-4 h-4 mr-2" />
          This is a demo. No real money is involved. Peer-to-peer lending carries risk; use only what you can afford to lose.
        </div>
      </footer>
    </div>
  );
}

function CreateLoanForm({ createLoan, balance }) {
  const [amt, setAmt] = React.useState('');
  const [int, setInt] = React.useState(10);
  const [dur, setDur] = React.useState(30);
  return (
    <div className="space-y-3">
      <input type="number" placeholder="Amount ($)" value={amt} onChange={e => setAmt(e.target.value)} className="w-full border rounded px-2 py-1 text-sm"/>
      <label className="text-xs text-slate-600">Interest %</label>
      <input type="range" min="1" max="200" value={int} onChange={e => setInt(+e.target.value)} className="w-full"/>
      <span className="text-xs">{int}%</span>
      <label className="text-xs text-slate-600">Duration (days)</label>
      <input type="range" min="1" max="365" value={dur} onChange={e => setDur(+e.target.value)} className="w-full"/>
      <span className="text-xs">{dur} days</span>
      <button
        onClick={() => createLoan(+amt, int, dur)}
        disabled={!amt || +amt > balance}
        className="w-full bg-blue-600 text-white py-2 rounded-md text-sm disabled:opacity-50"
      >
        Post Offer
      </button>
    </div>
  );
}

export default App;