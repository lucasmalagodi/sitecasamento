import { useState } from 'react';

const DataGrid = ({
  columns,
  data,
  onAction,
  actions,
  defaultSort = { column: '', direction: 'asc' },
  filterField,
  filterPlaceholder
}) => {
  const [filtro, setFiltro] = useState('');
  const [ordenacao, setOrdenacao] = useState(defaultSort);

  const handleOrdenacao = (coluna) => {
    setOrdenacao(prev => ({
      coluna,
      direcao: prev.coluna === coluna && prev.direcao === 'asc' ? 'desc' : 'asc'
    }));
  };

  const dadosFiltradosEOrdenados = data
    .filter(item => {
      return !filtro || (item[filterField] && item[filterField].toLowerCase().includes(filtro.toLowerCase()));
    })
    .sort((a, b) => {
      const valorA = a[ordenacao.coluna];
      const valorB = b[ordenacao.coluna];
      
      if (ordenacao.coluna === 'createdAt') {
        return ordenacao.direcao === 'asc' 
          ? new Date(valorA) - new Date(valorB)
          : new Date(valorB) - new Date(valorA);
      }
      
      if (typeof valorA === 'string') {
        return ordenacao.direcao === 'asc'
          ? valorA.localeCompare(valorB)
          : valorB.localeCompare(valorA);
      }
      
      return ordenacao.direcao === 'asc'
        ? valorA - valorB
        : valorB - valorA;
    });

  return (
    <div>
      {/* Filtro */}
      {filterField && (
        <div className="mb-4">
          <input
            type="text"
            placeholder={filterPlaceholder}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full md:w-64 px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
          />
        </div>
      )}

      {/* Grid */}
      <div className="bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.field}
                    className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider cursor-pointer hover:bg-gray-800"
                    onClick={() => handleOrdenacao(column.field)}
                  >
                    {column.headerName} {ordenacao.coluna === column.field && (ordenacao.direcao === 'asc' ? '↑' : '↓')}
                  </th>
                ))}
                {actions && <th className="px-6 py-3 text-left text-xs font-medium text-rose-200 uppercase tracking-wider">Ações</th>}
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {dadosFiltradosEOrdenados.map((row, index) => {
                return (
                  <tr key={row.id || index}>
                    {columns.map((column) => {
                      return (
                        <td key={column.field} className="px-6 py-4 whitespace-nowrap">
                          {column.renderCell ? (
                            column.renderCell(row)
                          ) : (
                            <div className="text-sm text-gray-300">{row[column.field]}</div>
                          )}
                        </td>
                      );
                    })}
                    {actions && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {actions.map((action) => (
                            <button
                              key={action.type}
                              onClick={() => onAction(action.type, row)}
                              className={typeof action.className === 'function' ? action.className(row) : action.className}
                              title={action.title}
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataGrid; 