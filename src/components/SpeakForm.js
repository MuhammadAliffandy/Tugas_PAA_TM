import React ,{ useState , useEffect, } from 'react';
import { useRouter } from 'next/router'

const SpeakForm = () => {

    const route = useRouter()

    const [ personID , setPersonID ] = useState('')
    
    useEffect(()=>{
        const options = {
            method: 'GET',
            headers: new Headers({
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`
              })
        }

        fetch("http://localhost:3000/api/person",options)
        .then( response => {
        return response.json(); 
        } )
        .then( data => {
            setPersonID( data.person.id );
            sessionStorage.setItem('userID',data.person.id)
        }).catch(error => {
            if(error){
              alert('Masa anda telah habis! Silahkan login kembali');
              sessionStorage.setItem('userID','')
              route.push('/')
            } 
        });
    })


    const addConsume = async (speak) => {
        const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(speak)
        };
    
        await fetch("http://localhost:3000/api/add", 
        options)
        .then(response => {
          if (response.ok) {
            alert('SpeakUp Berhasil')
            document.getElementById('speakForm').reset()
            route.push('#speakupForum')
            return response.json();
          } else {
            throw new Error('Invalid register');
          }
        })
        .then(data => {
          return data ;
        })
        .catch(error => {
            if(error){
              alert('speak gagal ')
            } ;
        });
      }
    
    const addSpeak = (event) => {
        event.preventDefault()

        var titleValue = document.getElementById('titleSpeak').value;
        var textValue = document.getElementById('textSpeak').value;

        const forum = {
            personId : personID,
            title : titleValue,
            speak : textValue,
        }
        addConsume(forum)
      }


    return(
    <section className='flex items-center justify-center  h-[100vh]'>
        <div className=' flex flex-col bg-white w-[700px] h-[400px] gap-[20px] rounded-[20px] ' >
            <div className=' flex  flex-col items-center p-[20px] gap-[5px]' >
                <h2 className='text-2xl font-bold  text-green-700' >SpeakUp</h2>
                <p>Keluarkan semua keluhan yang ada rasakan</p>
            </div>
            <form id='speakForm' className='flex flex-col items-center gap-[15px] ' >
                <input  id='titleSpeak' className='w-[600px] p-[10px] text-black bg-green-200 bg-opacity-25 ' type='text' placeholder='Masukkan judul speak anda' ></input>
                <textarea  id='textSpeak' rows='5' cols='80' className='w-[600px] p-[10px] text-black bg-green-200 bg-opacity-25 ' placeholder='Tuliskan keluh kesah anda pada dunia' ></textarea>
                <button type='submit'  className='w-[600px] px-10 py-3 bg-green-600 text-white font-bold rounded-[5px]  hover:bg-green-900 hover:shadow-xl hover:shadow-gray-500' onClick={addSpeak}  >Speak</button>
            </form>
        </div>
    </section>
    )
}

export default SpeakForm;