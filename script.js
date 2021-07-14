const word = document.getElementById('word')
const text =document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl =document.getElementById('time')
const settingsBtn = document.getElementById('settings-btn')
const endgameEl = document.getElementById('end-game-container')
const settings = document.getElementById('settings')
const settingsForm =document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

const words = [
    'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving'
];

let randomWord;

let score = 0;
let time = 10



let difficulty =
    localStorage.getItem('difficulty') !== null ? 
    localStorage.getItem('difficulty') : 'medium'


 //난이도 선택안하면 무조건 중간인거네 
    
difficultySelect.value = 
    localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty') : 'medium'



//텍스트 초점 맞추기 막 그런건가
text.focus()

//만약에 맞혔을 경우 다음 거 나오는데 1초 기다리기인가
const timeInterval = setInterval(updateTime, 1000)

function getRandomWord(){
    //역시 이거 썼네
    //random 0부터 1사이 랜덤 이러면 words의 단어가 랜덤으로 나온다
    return words[Math.floor(Math.random()*words.length)]
}

//일단 랜덤단어를 randword에 넣는다
function addWordToDOM(){
    randomWord =getRandomWord();
    word.innerHTML = randomWord;
}
function updateScore(){
    score++
    scoreEl.innerHTML = score
}
function updateTime(){
    time--;
    timeEl.innerHTML = time + 's'
    //10s 막 이렇게 보이기 위해서 뒤에 s 적었음

    if(time === 0){
        clearInterval(timeInterval)
        gameOver();
    }
}

function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `

    endgameEl.style.display ='flex'
}



//시작시 먼저 단어를 보여주고 시작!!
addWordToDOM();

text.addEventListener('input', e=> {
    const insertedText = e.target.value

    if(insertedText === randomWord){
        addWordToDOM()
        updateScore()

        //clear
        e.target.value = ''

        if(difficulty === 'hard'){
            time += 2

        }
        else if( difficulty === 'medium'){
            time += 3
        }
        else {
            time += 5
        }
        
        updateTime()
    }
})

settingsBtn.addEventListener('click', ()=>settings.classList.toggle('hide'))

settingsForm.addEventListener('change', e=> {
    difficulty = e.target.value
    localStorage.setItem('difficulty', difficulty)
})


