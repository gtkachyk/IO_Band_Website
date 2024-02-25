// import { useState, useEffect } from 'react'

// function App() {
//   const [data, setData] = useState([])

//   useEffect(() => {
//     async function fetchData() {
//       try{
//         const response = await fetch(`${import.meta.env.VITE_API_URL}songs`);
//         if (!response.ok){
//           throw new Error('Network response was not ok');
//         }
//         const result = await response.json();
//         setData(result);
//       } catch (error){
//         console.error('Error fetching data:', error);
//       }
//     }

//     fetchData();
//   }, [])

//   console.log("Data retrieved:");
//   console.log(data);

//   return (
//     <>
//       Hello world
//     </>
//   )
// }

// export default App
