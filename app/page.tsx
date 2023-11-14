import Image from 'next/image'
import Pagination from './components/Pagination'
import LatestIssues from './LatestIssues'
import IssueSummary from './IssueSummary'
import prisma from '@/prisma/client'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const inProgress = await prisma.issue.count({
    where: { status: 'IN_PROGRESS' },
  })
  const done = await prisma.issue.count({ where: { status: 'DONE' } })

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap='4'>
      <Flex direction='column' gap='4'>
        <IssueSummary open={open} inProgress={inProgress} done={done} />
        <IssueChart open={open} inProgress={inProgress} done={done} />
      </Flex>
      <LatestIssues />
    </Grid>
  )
}
