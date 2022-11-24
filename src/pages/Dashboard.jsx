import React, { useEffect, useState } from 'react';
import GraficoPie from 'component/dashboard/GraficoPie';


export default function Dashboard() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch(process.env.API_URL+'equipos', { method: 'GET' });
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.log(error);
    }
  }
  const getLabels = async () => {
    try {
      const response = await fetch(process.env.API_URL+'tipos/equipos', { method: 'GET' });
      const responseData = await response.json();
      setLabels(responseData);
    } catch (error) {
      console.log(error);
    }
  }

  const formatData = () => {
    const format = labels.reduce((acc, cur) => {
      const filtro = data.filter((equipos) => equipos.codigo_tipos_equipos == cur);
      acc.push({ label: cur, value: filtro.length });
      return acc;
    }, []);
    return format.sort((a, b) => b.value - a.value);
  }
  
  useEffect(() => {
    getLabels();
    getData();
  }, []);

  return (
    <div style={{ width: 300 }}>
      <GraficoPie data={formatData()} />
    </div>
  )
}