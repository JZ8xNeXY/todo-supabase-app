import Link from 'next/link'
import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { GetStaticProps } from 'next'
import { Layout } from '../components/layout'
import { supabase } from '../utils/supabase'
import { Task, Notice } from '../types/types'


type StaticProps = {
  tasks: Task[]
  notices: Notice[]
}



export const getStaticProps: GetStaticProps = async () => {
  console.log('getStaticProps/ssg invoked')

  const { data: tasks, error: tasksError } = await supabase
    .from('todos')
    .select('*')

  if (tasksError) {
    console.error('Error fetching tasks:', tasksError)
  } else {
    console.log('Tasks fetched successfully:', tasks)
  }

  const { data: notices, error: noticesError } = await supabase
    .from('notices')
    .select('*')

  if (noticesError) {
    console.error('Error fetching notices:', noticesError)
  } else {
    console.log('Notices fetched successfully:', notices)
  }

  return { props: { tasks: tasks || [], notices: notices || [] } }
}


const Ssg: NextPage<StaticProps> = ({ tasks, notices }) => {
  const router = useRouter()
  return (
    <Layout title="SSG">
      <p className="mb-3 text-blue-500">SSG</p>
      <ul className="mb-3">
        {tasks.map((task) => {
          return (
            <li key={task.id}>
              <p className="text-lg font-extrabold">{task.title}</p>
            </li>
          )
        })}
      </ul>
      <ul className="mb-3">
        {notices.map((notice) => {
          return (
            <li key={notice.id}>
              <p className="text-lg font-extrabold">{notice.content}</p>
            </li>
          )
        })}
      </ul>
    </Layout>
  )
}


export default Ssg