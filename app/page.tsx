import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'

export default async function Home({searchParams}: {searchParams: {page: string}}) {
  const open = await prisma.issue.count({where: {status: 'OPEN'}})
  const inProgress = await prisma.issue.count({where: {status: 'IN_PROGRESS'}})
  const done = await prisma.issue.count({where: {status: 'DONE'}})

  return (
    <>
      <LatestIssues />
      <IssueSummary open={open} inProgress={inProgress} done={done}/>
    </>
  )
}
