import axios from 'axios'
import {useState,useEffect} from 'react'
import { Card ,Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useNavigate } from 'react-router-dom';


let storeData=[];
let duplicatearr =[];
const getdataURL = `${process.env.REACT_APP_API_KEY}/getitemsData`;

// const DeletegetCarIndexURL = `${process.env.REACT_APP_API_KEY}/deleteBikes?code=`;

const upsertURL = `${process.env.REACT_APP_API_KEY}/upsertitemsData`;



function HomePage ()
{
    
    const[dataList,setDataList]=useState([]);
  // const [open, setOpen] = useState(false);

  //const [fetchData1,setFetchData1]=useState([])

  useEffect (() => {

    getData();
   

  },[])

  const getData = () => {

        axios.post(getdataURL)
        .then(res => {
             
            console.log('ressss  ',res);
            setDataList(res.data);
            duplicatearr=res.data;
            if(res.data.length === 0)
            {
                console.log('inside another call function')
                fetchData();
            }
        })
        .catch(err => {
            console.log('errr234 ',err)
        })
  }
          const fetchData = () => {

            axios.get('https://dummyjson.com/products')
                                    .then(res => {
                                        console.log('inside res ',res);
                                        storeData=res.data.products;
                                        console.log('url ',upsertURL);
                                        console.log('dat to pass ',storeData);
                                        let passData =[];
                                        let catchdata =[];
                                        storeData.map(d => {

                                            d.images=d.images[0];
                                            passData.push(d)
                                        })
                                        
                                        console.log('passed image ',passData);

                                        passData.map(i=>{
                                           // console.log(i,"map")
                                            delete i.id;
                                            delete i.thumbnail
                                         //   console.log(i,"after delete")
                                            axios.post(upsertURL,i)
                                        .then(res => {
                                          //  console.log('inside result ',res);

                                        })
                                        .catch(err => {
                                            console.log('inside err ',err);
                                        })
                                        })

                                        getData();
                                       
                                    })
                                    .catch(err => {
                                      console.log('catch err ',err);
                      })

          } 

       
                   //   console.log(dataList,"Datalist")

               const handleSearch  = (event) => {
                  let searchValue = event.target.value;
                
                    const filterData = dataList.filter(da => {
                      return da.category.includes(searchValue)
                    })
                    setDataList(filterData);
                
               }     
               const handleClear = () => {

                window.location.reload(true);
                console.log("inside Abort")
                setDataList(duplicatearr);
               }   
               
  return (
    
  
     <div>
      <div className='inputClass'>
      <input type='search' title='Search Products' placeholder='Search Products' onChange={handleSearch} ></input>
      <button className='buttonClass' style={{marginLeft: 5}} onClick ={handleClear} > clear </button>
      </div>
      
     <div className='appClass'>
      {
        
      dataList.length>0 &&
      dataList.map((data) => {
     // console.log('each data ',data)
       return <Book Book={data}> </Book>
       
     })}  
     
    </div>
  
    </div>
   
  );
}
const Book = (props) => {
    
    const navigate =useNavigate()

    const handleAddRecord =() => {
        console.log('inside new record')
        navigate("/invoiceDetailPage", {state:{ record: {} }})
      }
   const handleClick = (item) => {

    console.log('inside click ',item);
    navigate("/invoiceDetailPage", { state: { record: { item } } })
   }
  return (
    
      <Card>
      <img className ='imgClass' src={props.Book.images} id= {props.Book.id}  alt='' >
      </img>
      <h1 className ='TitleClass' >{props.Book.title}</h1>
      <h1 className ='TitleClass' >{props.Book.brand}</h1>
      <h4 className ='TitleClass' style={{color:'#617d98', fontSize:'1rem',marginTop:'0.25rem'}} > {props.Book.category} </h4>
      <p>Price: <strong style ={{color:'blue'}}>${props.Book.price}</strong> </p>
      {/* <p>Available Pieces: <strong style={{color:'blueviolet'}}> {props.Book.stock} </strong></p> */}
      <p> Ratings: <strong style={{color: props.Book.rating >4.0 ? 'green' : 'red'}}>  {props.Book.rating} </strong> </p>
      <p style={{opacity:.6}}> {props.Book.description} </p>
      <p style={{color:'green',opacity:.7}}> Max Discount upto {props.Book.discountPercentage} % </p>
        <Button x onClick={() => handleClick(props.Book)}>
            Buy
        </Button>
    </Card>

  )
}

export default HomePage