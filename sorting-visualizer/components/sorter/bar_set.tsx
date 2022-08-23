import Bar from "./bar";
import styles from "../../styles/BarSet.module.css";
import {COLORS} from "../../styles/color";
import { useState } from "react";

export default function BarSet() {
//this component manage the array of numbers that will be sorted



    const [numArray, setNumArray] = useState([25,12,40,20,1,2,3,4,5,7]);
    const [colorArray, setColorArray] = useState(Array(numArray.length).fill(COLORS.PRIMARY));

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    const handleSort = async () => {
    console.log('sort');
    //sort the array of numbers
    let arr = [...numArray];
    let colorArr = [...colorArray];
     // bubble sort algorithm
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
          // console.log(arr[j], arr[j + 1]);
          console.log(COLORS.PRIMARY);
          colorArr[j] = COLORS.WARNING;
          colorArr[j + 1] = COLORS.WARNING;
          // colorArr[j] = COLORS​.PRIMARY;
          // colorArr[j + 1] = COLORS.PRIMARY
          setColorArray([...colorArr]);
          await sleep(100); 
            // Set the comparing element to be the secondary color
            if (arr[j] > arr[j + 1]) {
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                console.log('swap');
                colorArr[j+1] = COLORS.SUCCESS;


                setColorArray([...colorArr]);
                setNumArray([...arr])
                await sleep(200);     
            }
            colorArr[j] = COLORS.PRIMARY;
            colorArr[j + 1] = COLORS.PRIMARY;
            setColorArray([...colorArr]);
            await sleep(100);
      
      
      }
        
    }
    


    }

    const handleShuffle = async() => {
        console.log('shuffle');
        let arr = [...numArray];
        for (let i = 0; i < arr.length; i++) {
            let j = Math.floor(Math.random() * arr.length);
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            setNumArray([...arr]);
            await sleep(200);
        }
    }

    return ( 
    
    <div>
      <div className={styles.container}>
      {/* generate 5 bar components */}
      {numArray.map((v, i) => <Bar key={i}

      value={v} color={colorArray[i]} />
      
      
      )}
      </div>

      <button onClick={async () => {await handleSort()}}>Sort</button>
      <button onClick={async () => {await handleShuffle()}}>Shuffle</button>
    </div>);

  }


