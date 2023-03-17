
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


  // const [points,setPoints] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 22,
  //   13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
  //   25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 46,
  //   37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48,
  //   49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 69, 61,
  //   62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
  //   74, 75, 76, 77, 78, 79, 80, 81, 92, 84, 85, 86,
  //   87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  //   99, 100, ])
  const [points,setPoints] = useState([1, 2])

  const [direction,setDirection] = useState("ArrowRight")
  const [toggle,setToggle] = useState(false)
  
  const [food,setFood] = useState(randomIntFromInterval((12 + 1), (12 * 12)))
 
  // const [food,setFood] = useState(randomIntFromInterval((12 + 1), (12 * 12)))

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
 
  
 const setFoodFunc = (points) => {
  let newFood = randomIntFromInterval(1, (12 * 12));

    while(points.includes(newFood)) {
 
      newFood = randomIntFromInterval(1, (12 * 12))
    } 

    setFood(newFood)

 }

  useEffect(() => {
   
    const intervalId = setInterval(() => {
      if(gameOver){
return
      }
      setPoints(prevPoints => {
      
        const newPoints = [...prevPoints];
  
let newPoint;
       
        if(direction == "ArrowRight") { 
          if( ((newPoints[newPoints.length - 1] - newPoints[newPoints.length - 2]) < 0) &&  ((newPoints[newPoints.length - 1] - newPoints[newPoints.length - 2]) > -6) ) {
return newPoints
          }     
          newPoint = newPoints[newPoints.length - 1] + 1
          if((newPoint % 12) == 1){
           newPoint = newPoint - 12;
          }
          
        
        }
        if(direction == "ArrowLeft") {  
          
          if( ((newPoints[newPoints.length - 2] - newPoints[newPoints.length - 1]) < 0) &&  ((newPoints[newPoints.length - 2] - newPoints[newPoints.length - 1]) > -6) ) {
            return newPoints
              } 

          newPoint = newPoints[newPoints.length - 1] - 1 
      
          if((newPoint % 12) == 0){
           newPoint = newPoint + 12;
          }
          
        
        }
        if(direction == "ArrowDown") {
          if( ((newPoints[newPoints.length - 1] - newPoints[newPoints.length - 2]) < 0) 
          && ((newPoints[newPoints.length - 1] - newPoints[newPoints.length - 2]) > 6) 
          ) {
            return newPoints
                      }  
           newPoint = newPoints[newPoints.length - 1] + 12 
           if(newPoint > (12 * 12)){
            newPoint = newPoint%12;
           }

         
       
        }
        if(direction == "ArrowUp") {
          if( ((newPoints[newPoints.length - 2] - newPoints[newPoints.length - 1]) < 0)
          && ((newPoints[newPoints.length - 2] - newPoints[newPoints.length - 1]) > 6)
          ) {
            return newPoints
              } 

          newPoint = newPoints[newPoints.length - 1] - 12 
           if(newPoint < (0)){
            newPoint = (12*12) + (newPoint%12);
           }

          
       
        }
  
    
        

       
       if(prevPoints.includes(newPoint)){
       
          setGameOver(true)
        }

        if(newPoint == food) {
          setScore(prevScore => {
            return prevScore+ 1;
          })
          setFoodFunc(newPoints)
        }
        else {
          newPoints.shift()
        }
        
       

        newPoints.push(newPoint)
      
        
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

<div className="row">
  <div className='col-4 offset-4'>
    <div className='row'>
    <div className=" col-md-4">
  
  </div>
    <div className=" col-md-4">
    <button type="button" className="btn btn-outline-secondary btn-lg d-block"
    onClick={() => {
      if(direction == "ArrowLeft" || direction == "ArrowRight" ){
        setDirection("ArrowUp")
       }
    }}
    ><i className="fa fa-arrow-up" /></button>
  </div>
  <div className=" col-md-4">
  
  </div>
 


  <div className=" col-md-4">
  <button type="button" className="btn btn-outline-secondary btn-lg"
     onClick={() => {
       if(direction == "ArrowUp" || direction == "ArrowDown" ){
        
        setDirection("ArrowLeft")
       }
    }}
    ><i className="fa fa-arrow-left" /></button>
  </div>
  <div className=" col-md-4">
  
  </div>
  <div className=" col-md-4">
  <button type="button" className="btn btn-outline-secondary btn-lg" 
    onClick={() => {
      if(direction == "ArrowUp" || direction == "ArrowDown" ){
       
       setDirection("ArrowRight")
      }
   }}
    
    ><i className="fa fa-arrow-right" /></button>
  </div>

  <div className=" col-md-4">
  
  </div>
  <div className=" col-md-4">
  <button type="button" className="btn btn-outline-secondary btn-lg"

onClick={() => {
 if(direction == "ArrowLeft" || direction == "ArrowRight" ){
   setDirection("ArrowDown")
  }
  
}}

><i className="fa fa-arrow-down" /></button>
  </div>
  <div className=" col-md-4">
  
  </div>
    </div>
  </div>


 

</div>



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
