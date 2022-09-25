import { addDoc, collection} from 'firebase/firestore'
import type { NextPage } from 'next'
import { useState } from 'react'
import { firestore } from '../config/firebase'
import Head from 'next/head'


const Note: NextPage = () => {
  const [note, setNote] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const onChangueNote = (e: any) => setNote(e.target.value)

  const closeMessageError = () => {
    setErrorMessage('')
  }

  const closeMessageSuccess = () => {
    setSuccessMessage('')
  }

  const addNote = () => {
    try {
      addDoc(collection(firestore, 'notes'), {
        text: note,
        created_at: new Date(),
        acepted: false,
        read: false
      })
      setSuccessMessage('Mensaje enviado.')
    } catch (error) {
      setErrorMessage('Algo ocurrio vuelve a intetar.')
    }
    setNote('')
  }

  return (
    <div className={'flex w-screen h-screen justify-center items-center bg-lith3 flex-col'}>
      <Head>
        <title>Golden night awards</title>
      </Head>
      <div className={'flex w-screen h-screen justify-center items-center flex-col backdrop-blur-sm'}>
        <div className={'bg-white p-4  sm:w-8/12 rounded-md shadow-lg w-11/12'}>
          {
            (errorMessage !== '') && (
              <div className={`flex flex-col items-start sm:w-full md:w-full border-l-4 p-2 border-red-500 bg-red-50`}>
                <h4 className={`text-lg uppercase font-medium w-full flex justify-between text-red-500`}> Noo... <span onClick={closeMessageError} className={'text-right cursor-pointer'}>X</span></h4>
                <p className={`$text-base text-red-900`}>{errorMessage}</p>
              </div>
            )
          }
          {
            (successMessage !== '') && (
              <div className={`flex flex-col items-start sm:w-full md:w-full border-l-4 p-2 border-green-500 bg-green-50`}>
                <h4 className={`text-lg uppercase font-medium w-full flex justify-between text-green-500`}> Si... <span onClick={closeMessageSuccess} className={'text-right cursor-pointer'}>X</span></h4>
                <p className={`$text-base text-green-900`}>{successMessage}</p>
              </div>
            )
          }
          <div className='flex justify-center'>
            <textarea
              value={note}
              className={'sm:w-11/12 resize-none md:w-9/12 text-center p-2 my-3 mr-2 bg-red-100 rounded-md focus:outline-none focus:border-red-500 focus:red-2 focus:ring-red-500 overflow-y-auto scrollbar-thin scrollbar-thumb-red-700 scrollbar-track-red-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'}
              placeholder={'Message'}
              onChange={onChangueNote}
              rows={3}
            ></textarea>
            <button
              className={'bg-red-500 my-3 py-2 px-4 rounded-lg text-white uppercase text-l font-medium hover:bg-red-600 active:bg-red-700 focus:outline-none focus:red focus:ring-red-400'}
              onClick={addNote}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note