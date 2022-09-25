import { addDoc, collection, deleteDoc, doc, DocumentData, QueryDocumentSnapshot, query, where, setDoc, updateDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useState } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../config/firebase'
import Head from 'next/head'


const Note: NextPage = () => {
  const [note, setNote] = useState('')
  const [snapshot, loading, error] = useCollection(query(collection(firestore, 'notes'), where("acepted", "==", false)), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const onChangueNote = (e: any) => setNote(e.target.value)

  // const addNote = () => {
  //   addDoc(collection(firestore, 'notes'), {
  //     text: note,
  //     created_at: new Date()
  //   })
  //   setNote('')
  // }

  const removeNote = async (data: QueryDocumentSnapshot<DocumentData>) => {
    await deleteDoc(doc(firestore, 'notes', data.id))
  }

  const aceptedNote = async (data: QueryDocumentSnapshot<DocumentData>) => {
    await updateDoc(doc(firestore, 'notes', data.id), { acepted: true })
  }

  return (
    <div className={'flex w-screen h-screen justify-center items-center bg-lith3 flex-col'}>
      <Head>
        <title>Golden night awards</title>
      </Head>
      <div className={'flex w-screen h-screen justify-center items-center flex-col backdrop-blur-sm'}>
        <div className={'bg-white p-4  sm:w-8/12 rounded-md shadow-lg w-11/12'}>
          <div className={'mt-3 md:h-5/6 h-5/6 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-700 scrollbar-track-orange-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'}>
            {
              snapshot?.docs.map(_note => (
                <div key={_note.id} className={'flex border-l-4 border-orange-500 p-2 shadow-md m-2 justify-between '}>
                  <p className={'text-orange-500 text-xl flex flex-col text-center'}>
                    {_note.data().text}
                  </p>
                  <div>
                    <button className={'text-xs'} onClick={() => aceptedNote(_note)}>
                      <svg className={"h-8 w-8 text-green-500"} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>
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

          </div>

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