import { addDoc, collection, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, query, where } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../config/firebase'
import Head from 'next/head'


const Note: NextPage = () => {
  const [note, setNote] = useState('')
  // const [snapshot, loading, error] = useCollection(query(collection(firestore, 'notes'), where("acepted", "==", true)), {
  //   // const [snapshot, loading, error] = useCollection(collection(firestore, 'notes'), {
  //   snapshotListenOptions: { includeMetadataChanges: true },
  // })

  const onChangueNote = (e: any) => setNote(e.target.value)

  const addNote = () => {
    addDoc(collection(firestore, 'notes'), {
      text: note,
      created_at: new Date(),
      acepted: false,
      read: false
    })
    setNote('')
  }

  const removeNote = async (data: QueryDocumentSnapshot<DocumentData>) => {
    await deleteDoc(doc(firestore, 'notes', data.id))
  }

  return (
    <div className={'flex w-screen h-screen justify-center items-center bg-lith3 flex-col'}>
      <Head>
        <title>Golden night awards</title>
      </Head>
      <div className={'flex w-screen h-screen justify-center items-center flex-col backdrop-blur-sm'}>
        <div className={'bg-white p-4  sm:w-8/12 rounded-md shadow-lg w-11/12'}>
        {/* <div className={'bg-white p-4 sm:h-4/6 h-4/6 sm:w-8/12 rounded-md shadow-lg w-11/12'}> */}
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

          {/* <div className={'mt-3 md:h-5/6 h-5/6 overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'}>

            {
              snapshot?.docs.map(_note => (
                <div key={_note.id} className={'flex border-l-4 border-green-500 p-2 shadow-md m-2 justify-between '}>
                  <p className={'text-green-500 text-xl flex flex-col text-center'}>
                    {_note.data().text}
                  </p>
                  <div>
                    <button>
                      <svg className="h-8 w-8 text-orange-200" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <rect x="8" y="8" width="12" height="12" rx="2" />
                        <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
                      </svg>
                    </button>
                    <button className={'text-xs'} onClick={() => removeNote(_note)}>
                      <svg className="h-8 w-8 text-red-500 float-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            }

          </div> */}

        </div>
      </div>
      {/* <div className={'absolute bottom-2 right-2'}>
        <button onClick={toConfig} className={'bg-gray-500 my-1 p-2 rounded-full text-white uppercase text-xs font-medium hover:bg-gray-600 active:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400'}>
          <svg className="h-8 w-8 text-white" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6-6a6 6 0 0 1 -8 -8l3.5 3.5" />
          </svg>
        </button>
      </div> */}
    </div>
  )
}

export default Note