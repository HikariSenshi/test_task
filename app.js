const exerciseList = document.getElementById('exercise-list')
const fieldList = document.getElementById('fields')
const runBtn = document.getElementById('run-btn')
const answerArea = document.getElementById('answer-area')
let activeExerciseIndex = 0

const exercises = [
    {
        name: 'Игра с числами ',
        fields: [
            {
                title: 'Число',
                toType: value => +value
            },
            {
                title: 'Степень',
                toType: value => value
            }
        ],
        algorithm: (n, s) => (ret => (ret / n) % 1 === 0 ? ret / n : -1)((n + '').split('').reduce((a, c) => a + Math.pow(c, s++), 0))
    },
    {
        name: 'Вычисление общей длины интервалов',
        fields: [
            {
                title: 'Введите ваши интервалы в форме двумерного массива',
                toType: value => JSON.parse(value)
            }
        ],
        algorithm: data  => (( data => {
                           for (i = data.length - 1; i > 0 ; i--) {
                               for(let j = 0;j < data.length;j++){
                                   if(data[i]==data[j]){ console.log(true); continue;}
                                   if ((data[j][0] <= data[i][1]) && (data[j][1] >= data[i][0])) {
                                       let save = [Math.min(data[i][0], data[j][0]), Math.max(data[i][1], data[j][1])];
                                       data.pop()
                                       data[j]=save
                                       break;
                                   }

                               }
                           }
                           return data;
                           })(data).reduce((a,c)=> a+=(c[1]-c[0]),0))

    }
];


const init = () => {
    renderExerciseList()
    renderFields()
    runBtn.onclick = run.bind(this)
}

const run = () => {
    const exercise = exercises[activeExerciseIndex]
    const params = []
    exercise.fields.forEach((field, i) => {
        const fieldArea = document.getElementById('id' + activeExerciseIndex + i)
        params.push(field.toType(fieldArea.value))
    })
    answerArea.innerHTML = exercise.algorithm(...params)
}

const changeExercise = index => {
    activeExerciseIndex = index
    renderFields()
}

const renderExerciseList = () => {
    exerciseList.innerHTML = ''
    exercises.forEach((exercise, i) => {
        const span = document.createElement('span')
        span.innerHTML = exercise.name
        span.onclick = changeExercise.bind(this, i)
        exerciseList.append(span)
    })
}

const renderFields = () => {
    const exercise = exercises[activeExerciseIndex]
    fieldList.innerHTML = ''
    exercise.fields.forEach((field, i) => {
        fieldList.innerHTML += `<label>${field.title}</label><textarea id=id${activeExerciseIndex + '' + i}>`
    })
}

init()