class OperatingSystem {
    constructor() {
        this.processes = [];
        this.quantum = 2;
        this.overhead = 1;
        this.executionLog = [];
        this.scheduleMatrix = [];
    }

    addProcess(id, arrivalTime, burstTime, deadline) {
        let process = { id, arrivalTime, burstTime, deadline, originalBurstTime: burstTime, completionTime: null };
        this.processes.push(process);
    }

    setQuantum(quantum) {
        this.quantum = quantum;
    }

    setOverhead(overhead) {
        this.overhead = overhead;
    }

    calculateTurnaroundTimes() {
        return this.processes.map(process => {
            if (process.completionTime !== null) {
                return {
                    id: process.id,
                    turnaroundTime: process.completionTime - process.arrivalTime
                };
            }
            return { id: process.id, turnaroundTime: null }; // Processo ainda não finalizado
        });
    }

    scheduleFIFO() {
        let futureQueue = [...this.processes];
        futureQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
        let readyQueue = [];
        let currentTime = 0;
        let scheduleMatrix = [];

        // Inicializar a matriz de agendamento
        this.processes.forEach(process => {
            scheduleMatrix[process.id] = [];
        });

        while (futureQueue.length > 0 || readyQueue.length > 0) {
            // Mover processos da futureQueue para a readyQueue se eles chegaram
            while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                readyQueue.push(futureQueue.shift());
            }

            if (readyQueue.length > 0) {
                // Executa o processo na frente da fila
                while (readyQueue[0].burstTime > 0) {
                    readyQueue[0].burstTime -= 1;

                    // Mover processos da futureQueue para a readyQueue se eles chegaram
                    while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                        readyQueue.push(futureQueue.shift());
                    }

                    // Preencher a matriz com o estado atual dos processos
                    this.processes.forEach(process => {
                        if (process.arrivalTime > currentTime) {
                            scheduleMatrix[process.id].push('gray'); // Ainda não chegou
                        } else if (readyQueue.includes(process)) {
                            if (readyQueue[0] === process) {
                                scheduleMatrix[process.id].push('green'); // Processando
                            } else {
                                scheduleMatrix[process.id].push('yellow'); // Esperando
                            }
                        } else {
                            scheduleMatrix[process.id].push('white'); // Finalizado
                        }
                    });
                    currentTime += 1;
                }

                if (readyQueue[0].burstTime === 0) {
                    readyQueue[0].completionTime = currentTime; // Define o tempo de conclusão
                    readyQueue.shift(); // Remove o processo da fila se o burstTime for 0
                }
            } else {
                currentTime += 1;
            }
        }

        this.scheduleMatrix = scheduleMatrix;
    }

    scheduleSJF() {
        let futureQueue = [...this.processes];
        futureQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
        let readyQueue = [];
        let currentTime = 0;
        let scheduleMatrix = [];

        // Inicializar a matriz de agendamento
        this.processes.forEach(process => {
            scheduleMatrix[process.id] = [];
        });

        while (futureQueue.length > 0 || readyQueue.length > 0) {
            // Mover processos da futureQueue para a readyQueue se eles chegaram
            while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                readyQueue.push(futureQueue.shift());
            }

            // Ordena a readyQueue por burstTime para selecionar o processo com menor burstTime
            readyQueue.sort((a, b) => a.burstTime - b.burstTime);

            if (readyQueue.length > 0) {
                // Executa o processo na frente da fila (com menor burstTime)
                while (readyQueue[0].burstTime > 0) {
                    readyQueue[0].burstTime -= 1;

                    // Mover processos da futureQueue para a readyQueue se eles chegaram
                    while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                        readyQueue.push(futureQueue.shift());
                    }

                    // Preencher a matriz com o estado atual dos processos
                    this.processes.forEach(process => {
                        if (process.arrivalTime > currentTime) {
                            scheduleMatrix[process.id].push('gray'); // Ainda não chegou
                        } else if (readyQueue.includes(process)) {
                            if (readyQueue[0] === process) {
                                scheduleMatrix[process.id].push('green'); // Processando
                            } else {
                                scheduleMatrix[process.id].push('yellow'); // Esperando
                            }
                        } else {
                            scheduleMatrix[process.id].push('white'); // Finalizado
                        }
                    });
                    currentTime += 1;
                }

                if (readyQueue[0].burstTime === 0) {
                    readyQueue[0].completionTime = currentTime; // Define o tempo de conclusão
                    readyQueue.shift(); // Remove o processo da fila se o burstTime for 0
                }
            } else {
                currentTime += 1;
            }
        }

        this.scheduleMatrix = scheduleMatrix;
    }

    scheduleRoundRobin() {
        let futureQueue = [...this.processes];
        futureQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
        let readyQueue = [];
        let currentTime = 0;
        let scheduleMatrix = [];

        // Inicializar a matriz de agendamento
        this.processes.forEach(process => {
            scheduleMatrix[process.id] = [];
        });

        while (futureQueue.length > 0 || readyQueue.length > 0) {
            // Mover processos da futureQueue para a readyQueue se eles chegaram
            while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                readyQueue.push(futureQueue.shift());
            }

            if (readyQueue.length > 0) {
                let quantum = 0;
                let overhead = 0;

                // Executa o processo na frente da fila
                while (readyQueue[0].burstTime > 0 && quantum < this.quantum) {
                    readyQueue[0].burstTime -= 1;
                    quantum += 1;

                    // Mover processos da futureQueue para a readyQueue se eles chegaram
                    while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                        readyQueue.push(futureQueue.shift());
                    }

                    // Preencher a matriz com o estado atual dos processos
                    this.processes.forEach(process => {
                        if (process.arrivalTime > currentTime) {
                            scheduleMatrix[process.id].push('gray'); // Ainda não chegou
                        } else if (readyQueue.includes(process)) {
                            if (readyQueue[0] === process) {
                                scheduleMatrix[process.id].push('green'); // Processando
                            } else {
                                scheduleMatrix[process.id].push('yellow'); // Esperando
                            }
                        }
                    });
                    currentTime += 1;
                }

                // Overhead processing
                while (readyQueue[0].burstTime > 0 && overhead < this.overhead) {
                    overhead += 1;

                    // Mover processos da futureQueue para a readyQueue se eles chegaram
                    while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                        readyQueue.push(futureQueue.shift());
                    }

                    // Preencher a matriz com o estado atual dos processos
                    this.processes.forEach(process => {
                        if (process.arrivalTime > currentTime) {
                            scheduleMatrix[process.id].push('gray'); // Ainda não chegou
                        } else if (readyQueue.includes(process)) {
                            if (readyQueue[0] === process) {
                                scheduleMatrix[process.id].push('red'); // Sobrecarga
                            } else {
                                scheduleMatrix[process.id].push('yellow'); // Esperando
                            }
                        }
                    });
                    currentTime += 1;
                }

                if (readyQueue[0].burstTime === 0) {
                    readyQueue[0].completionTime = currentTime; // Define o tempo de conclusão
                    readyQueue.shift(); // Remove o processo da fila se o burstTime for 0
                } else {
                    readyQueue.push(readyQueue.shift()); // Move o processo para o final da fila
                }
            } else {
                currentTime += 1;
            }
        }

        this.scheduleMatrix = scheduleMatrix;
    }

    scheduleEDF() {
        let futureQueue = [...this.processes];
        futureQueue.sort((a, b) => a.arrivalTime - b.arrivalTime);
        let readyQueue = [];
        let currentTime = 0;
        let scheduleMatrix = [];

        // Inicializar a matriz de agendamento
        this.processes.forEach(process => {
            scheduleMatrix[process.id] = [];
        });

        while (futureQueue.length > 0 || readyQueue.length > 0) {
            // Mover processos da futureQueue para a readyQueue se eles chegaram
            while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                readyQueue.push(futureQueue.shift());
            }

            // Ordenar a readyQueue pelo prazo mais próximo (EDF)
            readyQueue.sort((a, b) => a.deadline - b.deadline);

            if (readyQueue.length > 0) {
                let quantum = 0;
                let overhead = 0;

                // Executa o processo na frente da fila
                while (readyQueue[0].burstTime > 0 && quantum < this.quantum) {
                    readyQueue[0].burstTime -= 1;
                    quantum += 1;

                    // Mover processos da futureQueue para a readyQueue se eles chegaram
                    while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                        readyQueue.push(futureQueue.shift());
                    }

                    // Preencher a matriz com o estado atual dos processos
                    this.processes.forEach(process => {
                        if (process.arrivalTime > currentTime) {
                            scheduleMatrix[process.id].push('gray'); // Ainda não chegou
                        } else if (readyQueue.includes(process)) {
                            if (readyQueue[0] === process) {
                                if (process.deadline <= (currentTime - process.arrivalTime)) {
                                    scheduleMatrix[process.id].push('black'); // Processando
                                } else {
                                    scheduleMatrix[process.id].push('green');
                                }
                            } else {
                                scheduleMatrix[process.id].push('yellow'); // Esperando
                            }
                        }
                    });
                    currentTime += 1;
                }

                // Overhead processing
                while (readyQueue[0].burstTime > 0 && overhead < this.overhead) {
                    overhead += 1;

                    // Mover processos da futureQueue para a readyQueue se eles chegaram
                    while (futureQueue.length > 0 && futureQueue[0].arrivalTime <= currentTime) {
                        readyQueue.push(futureQueue.shift());
                    }

                    // Preencher a matriz com o estado atual dos processos
                    this.processes.forEach(process => {
                        if (process.arrivalTime > currentTime) {
                            scheduleMatrix[process.id].push('gray'); // Ainda não chegou
                        } else if (readyQueue.includes(process)) {
                            if (readyQueue[0] === process) {
                                scheduleMatrix[process.id].push('red'); // Sobrecarga
                            } else {
                                scheduleMatrix[process.id].push('yellow'); // Esperando
                            }
                        }
                    });
                    currentTime += 1;
                }

                if (readyQueue[0].burstTime === 0) {
                    readyQueue[0].completionTime = currentTime; // Define o tempo de conclusão
                    readyQueue.shift(); // Remove o processo da fila se o burstTime for 0
                } else {
                    readyQueue.push(readyQueue.shift()); // Move o processo para o final da fila
                }
            } else {
                currentTime += 1;
            }
        }

        this.scheduleMatrix = scheduleMatrix;
    }
}

export default OperatingSystem;
