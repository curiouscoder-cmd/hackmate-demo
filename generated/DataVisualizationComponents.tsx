```tsx
import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-table'; // Or your preferred table library

// Define data types for better type safety
interface ChartData {
  name: string;
  value: number;
}

interface TableData {
  [key: string]: string | number;
}


const ChartComponent: React.FC<{ data: ChartData[] }> = ({ data }) => {
  // Error handling: Check for empty data
  if (!data || data.length === 0) {
    return <div>No data to display.</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

const TableComponent: React.FC<{ data: TableData[] ; columns: string[] }> = ({ data, columns }) => {
    //Error Handling: Check for empty data and columns
    if (!data || data.length === 0 || !columns || columns.length === 0){
        return <div>No data or columns to display</div>
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    {columns.map((column) => (
                        <Th key={column}>{column}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {data.map((row) => (
                    <Tr key={row.name}> {/* Assuming 'name' is a unique identifier */}
                        {columns.map((column) => (
                            <Td key={`${row.name}-${column}`}>{row[column]}</Td>
                        ))}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    )
}


export { ChartComponent, TableComponent };
```