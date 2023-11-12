import { issueSchema } from '@/app/validationSchema'
import prisma from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json()
  const validation = issueSchema.safeParse(body)
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 })
  }

  // update issue in database
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  })
  if (!issue) {
    return NextResponse.json({ message: 'Issue not found' }, { status: 404 })
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: Number(params.id) },
    data: {
      title: body.title,
      description: body.description,
    },
  })

  return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  })
  if (!issue) {
    return NextResponse.json({ message: 'Invalid Issue' }, { status: 404 })
  } 

  // delete issue from database
  await prisma.issue.delete({
    where: { id: issue.id },
  })

  return NextResponse.json({})

}