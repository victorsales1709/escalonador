import React, { useState, useEffect } from 'react';
import './styles/scheduleMatrix.css'; // Certifique-se de adicionar este arquivo de estilo

function ScheduleMatrix({ scheduleMatrix, processes }) {
    const [displayedMatrix, setDisplayedMatrix] = useState([]);
    const [columnIndex, setColumnIndex] = useState(0);

    useEffect(() => {
        const updateMatrix = () => {
            if (columnIndex < Math.max(...processes.map(p => scheduleMatrix[p.id]?.length || 0))) {
                setDisplayedMatrix(prev => {
                    return processes.map(process => {
                        const states = scheduleMatrix[process.id] || [];
                        return states.slice(0, columnIndex + 1);
                    });
                });
                setColumnIndex(prev => prev + 1);
            }
        };

        const interval = setInterval(updateMatrix, 125);

        return () => clearInterval(interval);
    }, [columnIndex, processes, scheduleMatrix]);

    const maxColumns = Math.max(...processes.map(p => scheduleMatrix[p.id]?.length || 0));

    return (
        <div className='matrix-container'>
            <h2>Matriz de Agendamento</h2>
            <table className='schedule-table'>
                <thead>
                    <tr>
                        <th>Tempo</th>
                        {Array.from({ length: maxColumns }, (_, i) => (
                            <th key={i}>{i}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {processes.map((process) => (
                        <tr key={process.id}>
                            <td>Processo {process.id}</td>
                            {displayedMatrix[process.id - 1]?.map((state, time) => (
                                <td key={time} className={`matrix-cell ${state}`}>
                                    {/* Removido o estado dentro da célula */}
                                </td>
                            ))}
                            {Array.from({ length: maxColumns - (displayedMatrix[process.id - 1]?.length || 0) }, (_, i) => (
                                <td key={i + (displayedMatrix[process.id - 1]?.length || 0)} className='matrix-cell'></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ScheduleMatrix;
