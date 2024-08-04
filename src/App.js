import React, { useState } from 'react';
import SchedulerConfig from './schedulerConfig';
import ProcessList from './processList';
import ScheduleMatrix from './scheduleMatrix';
import OperatingSystem from './operatingSystem';
import './styles/app.css';

function App() {
    const [algorithm, setAlgorithm] = useState('FIFO');
    const [quantum, setQuantum] = useState(4);
    const [overhead, setOverhead] = useState(2);
    const [processes, setProcesses] = useState([]);
    const [scheduleMatrix, setScheduleMatrix] = useState([]);
    const [turnaroundTimes, setTurnaroundTimes] = useState([]);
    const [averageTurnaround, setAverageTurnaround] = useState(null); // Novo estado para o turnaround médio

    const addProcess = (process) => {
        const newProcess = { ...process, id: processes.length + 1 };
        setProcesses([...processes, newProcess]);
    };

    const removeProcess = (id) => {
        setProcesses(processes.filter(process => process.id !== id));
    };

    const resetScheduler = () => {
        setProcesses([]);
        setScheduleMatrix([]);
        setTurnaroundTimes([]);
        setAverageTurnaround(null); // Resetar o turnaround médio
    };

    const generateSchedule = () => {
        const os = new OperatingSystem();
        os.setQuantum(quantum);
        os.setOverhead(overhead);
        processes.forEach(p => os.addProcess(p.id, p.arrivalTime, p.burstTime, p.deadline));

        switch (algorithm) {
            case 'FIFO':
                os.scheduleFIFO();
                break;
            case 'SJF':
                os.scheduleSJF();
                break;
            case 'EDF':
                os.scheduleEDF();
                break;
            case 'RoundRobin':
                os.scheduleRoundRobin();
                break;
        }

        setScheduleMatrix(os.scheduleMatrix || []);

        // Calcular e definir os tempos de retorno
        const times = os.calculateTurnaroundTimes();
        setTurnaroundTimes(times);

        // Calcular o turnaround médio
        const turnaroundSum = times.reduce((sum, { turnaroundTime }) => sum + (turnaroundTime || 0), 0);
        const turnaroundCount = times.length;
        const average = turnaroundCount > 0 ? turnaroundSum / turnaroundCount : 0;
        setAverageTurnaround(average);
    };

    return (
        <div>
            <SchedulerConfig setAlgorithm={setAlgorithm} setQuantum={setQuantum} setOverhead={setOverhead} />
            <ProcessList processes={processes} addProcess={addProcess} removeProcess={removeProcess} />
            <button onClick={generateSchedule}>Gerar Matriz de Agendamento</button>
            <button onClick={resetScheduler}>Resetar Escalonador</button>
            <ScheduleMatrix scheduleMatrix={scheduleMatrix} processes={processes} />
            <div>
                <h3>Tempo de Retorno dos Processos:</h3>
                <ul>
                    {turnaroundTimes.map(({ id, turnaroundTime }) => (
                        <li key={id}>Processo {id}: {turnaroundTime !== null ? `${turnaroundTime} unidades de tempo` : 'Não completado'}</li>
                    ))}
                </ul>
                {averageTurnaround !== null && (
                    <div>
                        <h4>Turnaround Médio: {averageTurnaround.toFixed(2)} unidades de tempo</h4>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
