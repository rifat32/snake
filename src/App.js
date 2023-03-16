
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const itemList = [];
  for (let i = 1; i <= ((12*12)); i++) {
    itemList.push(i);
  }
  const [score,setScore] = useState(0)
  const [gameOver,setGameOver] = useState(false)

  const [level,setLevel] = useState("easy")


  const [points,setPoints] = useState([1,2])
  const [direction,setDirection] = useState("ArrowRight")
  const [toggle,setToggle] = useState(false)

  const [food,setFood] = useState(randomIntFromInterval((12 + 1), (12 * 12)))

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
 
  
 const setFoodFunc = () => {
  let newFood = randomIntFromInterval(1, (12 * 12));
    while(points.includes(newFood)) {
      newFood = randomIntFromInterval(1, (12 * 12))
    } 

    setFood(newFood)

 }

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      setPoints(prevPoints => {
      
        const newPoints = [...prevPoints];
  
let newPoint;
       
        if(direction == "ArrowRight") {      
          newPoint = newPoints[newPoints.length - 1] + 1
          if((newPoint % 12) == 1){
           newPoint = newPoint - 12;
          }
          
        
        }
        if(direction == "ArrowLeft") {                                                                                 
          newPoint = newPoints[newPoints.length - 1] - 1 
      
          if((newPoint % 12) == 0){
           newPoint = newPoint + 12;
          }
          
        
        }
        if(direction == "ArrowDown") {
           newPoint = newPoints[newPoints.length - 1] + 12 
           if(newPoint > (12 * 12)){
            newPoint = newPoint%12;
           }

         
       
        }
        if(direction == "ArrowUp") {
          newPoint = newPoints[newPoints.length - 1] - 12 
           if(newPoint < (0)){
            newPoint = (12*12) + (newPoint%12);
           }

          
       
        }
  
    
        

        if(newPoint == food) {
          setScore(prevScore => {
            return prevScore+ 1;
          })
          setFoodFunc()
        }
       else if(prevPoints.includes(newPoint)){
          console.log("final",newPoint,newPoints)
          setGameOver(true)
        }
        else {
          newPoints.shift()
        }
        
       

        newPoints.push(newPoint)
      
        console.log(newPoints)
        return newPoints;
      });
    }, (
level == "easy"?300:(
  level == "medium"?200:(
    level == "hard"?100:500
  )
)

    )
    );
  
    return () => clearInterval(intervalId);
  }, [direction,level]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {

        case 'ArrowLeft':
         if(direction == "ArrowUp" || direction == "ArrowDown" ){
        
          setDirection("ArrowLeft")
         }
         
          break;
        
        case 'ArrowRight':
          if(direction == "ArrowUp" || direction == "ArrowDown" ){
            setDirection("ArrowRight")
           }
          break;
        case 'ArrowUp':
          if(direction == "ArrowLeft" || direction == "ArrowRight" ){
            setDirection("ArrowUp")
           }
         
          break;
        case 'ArrowDown':
          if(direction == "ArrowLeft" || direction == "ArrowRight" ){
            setDirection("ArrowDown")
           }
     
        
         
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  return (
    <div className='container'>
      <h1>
        Snake Game
      </h1>
     <div className='row'>

{
  gameOver?(<div>
<h1>Game Over</h1>
<h1>Score:{score}</h1>
<button onClick={() => {
  window.location.reload()
}} >Play Again</button>

  </div>):(
itemList.map((el,index) => {
  

  return (<div className={`col-1 ${points.includes(el)?"bg-danger text-danger":"bg-white text-white"} `}>
    <span className={` ${(el==(points[points.length - 1] ))?"text-success bg-success":
   ( (food == el)?"bg-warning text-warning":"")
    } `}>
    O
    </span>
    
  </div>)
})
  )
}

<h1>Score:{score}</h1>

<div className='row'>
<div className='col-4'>

<button className={`btn btn-primary`} onClick={() => {
  setLevel("easy")
}} disabled={level=="easy"}> Easy</button>
</div>
<div className='col-4'>

<button className={`btn btn-primary`} onClick={() => {
  setLevel("medium")
}} disabled={level=="medium"}> Medium</button>
</div>
<div className='col-4'>

<button className={`btn btn-primary`} onClick={() => {
  setLevel("hard")
}} disabled={level=="hard"}> Hard</button>
</div>


</div>

     </div>



    </div>
  );
}

export default App;
