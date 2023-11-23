import { useEffect, useState } from "react";


export const useSorted = (unsorted) => {
  const [sorted, setSorted] = useState([]);

  useEffect(() => {
    const sortByLastActive = (array) => {
      return array.sort((a, b) => {
        const dateA = new Date(a.timeBought);
        const dateB = new Date(b.timeBought);
        return dateB - dateA;
      })
    }
    if (unsorted) {
      setSorted(sortByLastActive(Object.values(unsorted)));
    }
  }, [unsorted])

  return sorted;
}


export const useExpenses = (products) => {
  const [expenses, setExpenses] = useState({});
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    let total = 0;
    let obj = {
      GROCERIES: 0,
      HOUSEHOLD_ITEMS: 0,
      ELECTRONICS: 0,
      CLOTHES: 0,
      FOOTWEAR: 0,
      OTHER: 0,
    };

    products.forEach((product) => {
      total = total + product.price * product.amount
      obj[product.category] = obj[product.category] + product.price * product.amount;
    });

    setExpenses(obj);
    setTotalExpense(total)
  }, [products])

  return { totalExpense, expenses };
}

