var idCount = 1;
var data = [];

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formulario");
    const taskInput = document.getElementById("task");
    const taskDescriptionInput = document.getElementById("task-description");
    const listaDatos = document.getElementById("hero");

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        const description = taskDescriptionInput.value.trim();

        if (!task || !description) return; // Asegurar que no se envíen datos vacíos

        const newTask = {
            id: idCount++,
            task: task,
            description: description,
            status: false,
        };

        data.push(newTask);

        imprimirDatos();

        // Limpiar los inputs
        taskInput.value = "";
        taskDescriptionInput.value = "";
    });
});

const imprimirDatos = () => {
    const listaDatos = document.getElementById("hero");
    listaDatos.innerHTML = ''; // Limpiar antes de volver a pintar

    if (data.length === 0) {
        listaDatos.innerHTML = `<p class="hero-blank">
            <i class="bi bi-radioactive"></i>
            <br>
            No hay tareas disponibles
        </p>`;
        return;
    }

    data.forEach((taskItem) => {
        if (!taskItem) return;

        const nuevoElemento = `
        <div class="hero-card ${taskItem.status ? 'hero-card--complete' : ''}">
            <div class="card_task">
                <p>${taskItem.task}</p>
                <span>${taskItem.description}</span>
            </div>
            <div class="card_buttons">
                <button class="check" onclick="actualizar(${taskItem.id})">
                    <i class="bi bi-check-lg"></i>
                </button>
                <button onclick="eliminar(${taskItem.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </div>`;

        listaDatos.innerHTML += nuevoElemento;
    });
};

const actualizar = (id) => {
    data = data.map(task => task.id === id ? { ...task, status: !task.status } : task);
    imprimirDatos();
};

const eliminar = (id) => {
    data = data.filter(task => task.id !== id);
    imprimirDatos();
};

