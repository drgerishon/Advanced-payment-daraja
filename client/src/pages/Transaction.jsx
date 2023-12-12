import axios from 'axios';
import { useEffect, useState } from 'react';

const Transaction = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');
  const [formData, setFormdata] = useState([]);
  const [error, setError] = useState(false);

  console.log(phone, amount);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/stk', {
        phone,
        amount,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get('http://localhost:8000/details');
        setFormdata(response.data.transactionData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransaction();
  }, []);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); 
  };
  return (
    <div className="w-full flex justify-center h-screen">
      <div className="bg-slate-700 w-full border">
        <h1 className="text-center text-3xl text-white ">
          Pay with <span className="text-green-500">Mpesa</span>
        </h1>
        <div>
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col p-3 gap-4">
              {/* <input className="rounded-lg p-2 w-full" placeholder="Account Numner"/> */}
              <input
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg p-2 w-full"
                placeholder="Phone Numner"
              />
              <input
                name="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="rounded-lg p-2 w-full"
                placeholder="Amount"
              />
              <button
                type="submit"
                className="bg-blue-400 w-full border rounded-md mt-3 font-bold p-3"
              >
                Send Amount
              </button>
            </div>
          </form>
          {error && <p className="text-red-700">{error}</p>}

        </div>
      </div>
      <div className=" bg-slate-700 w-full border">
        <h2 className="text-center text-3xl text-white">Transaction Datails</h2>
        {formData.map((tran, index) => (
          <table key={index} className="text-white  p-4 m-5 w-full">
            <thead className='font-bold'>
              <td>Phone</td>
              <td>Amount</td>
              <td>Reference</td>
              <td>T-Date</td>
            </thead>
            <tbody>
              <tr>
                <td>{tran.phone}</td>
                <td>{tran.amount}</td>
                <td>{tran.transaction_Id}</td>
                <td>{formatTimestamp(tran.createdAt)}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default Transaction;
