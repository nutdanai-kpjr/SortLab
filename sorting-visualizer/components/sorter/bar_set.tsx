import Bar from "./bar";
import styles from "../../styles/BarSet.module.css";
import { useState } from "react";

export default function BarSet() {
//this component manage the array of numbers that will be sorted
//it will render the array of bars
//it will also manage the animation of the bars

    const [numArray, setNumArray] = useState([25,12,40,20,1,2,3,4,5,7]);

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const handleSort = async () => {
    console.log('sort');
    //sort the array of numbers
    let old = [...numArray];
     // bubble sort algorithm

    for (let i = 0; i < old.length; i++) {
        for (let j = 0; j < old.length - 1; j++) {
          console.log(old[j], old[j + 1]);
          
            if (old[j] > old[j + 1]) {
                var temp = old[j];
                old[j] = old[j + 1];
                old[j + 1] = temp;
                console.log('swap');
            
              
                setNumArray([...old])
                await sleep(200); 
                    
                
                // old = [...numArray];
            
        }}
        
    }
    


}

    return ( 
    
    <div>
      <div className={styles.container}>
      {/* generate 5 bar components */}
      {numArray.map((v, i) => <Bar key={i}

      value={v} color={i % 2 === 0 ? "red" : "blue"} />
      
      
      )}
      </div>

      <button onClick={async () => {await handleSort()}}>Sort</button>
    </div>);

  }


