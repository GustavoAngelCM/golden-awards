import { collection, doc, DocumentData, QueryDocumentSnapshot, query, where, updateDoc } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from '../config/firebase'
import Head from 'next/head'


const Note: NextPage = () => {
  const [snapshot] = useCollection(query(collection(firestore, 'notes'), where("acepted", "==", true), where("read", "==", false)), {
    snapshotListenOptions: { includeMetadataChanges: true },
  })

  const readNote = async (data: QueryDocumentSnapshot<DocumentData>) => {
    await updateDoc(doc(firestore, 'notes', data.id), { read: true })
  }

  return (
    <div className={'flex w-screen h-screen justify-center items-center bg-lith3 flex-col'}>
      <Head>
        <title>Golden night awards</title>
      </Head>
      <div className={'flex w-screen h-screen justify-center items-center flex-col backdrop-blur-sm'}>
        <div className={'bg-white p-4  sm:w-8/12 rounded-md shadow-lg w-11/12'}>
          <div className={'mt-3 md:h-5/6 h-5/6 overflow-y-auto scrollbar-thin scrollbar-thumb-green-700 scrollbar-track-green-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full'}>
            {
              snapshot?.docs.map(_note => (
                <div key={_note.id} className={'flex border-l-4 border-green-500 p-2 shadow-md m-2 justify-between '}>
                  <p className={'text-green-500 text-xl flex flex-col text-center'}>
                    {_note.data().text}
                  </p>
                  <div>
                    <button className={'text-xs'} onClick={() => readNote(_note)}>
                      <svg className={"h-8 w-8 text-green-500"} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M7 12l5 5l10 -10" />  <path d="M2 12l5 5m5 -5l5 -5" /></svg>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>

        </div>
      </div>
    </div>
  )
}

export default Note