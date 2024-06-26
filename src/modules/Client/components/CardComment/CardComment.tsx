/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Group,
  Menu,
  Paper,
  rem,
  Text,
  TypographyStylesProvider
} from '@mantine/core'
import { Comment } from '../../interfaces'
import { formatTimeToReadable } from 'src/modules/Share/utils'
import { IconCornerDownRight, IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { DeleteCommentCommandHandler } from '../../services/Comment/deleteComment.command-handler'
import FormEditComment from '../FormEditComment'
import FormReplyComment from '../FormReplyComment/FormReplyComment'

interface Props {
  comment: Comment
  user_id?: string
}

const CardComment = ({ comment, user_id }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const [isEditReply, setIsEditReply] = useState(false)
  const [isReply, setIsReply] = useState(false)
  const deleteCommentCommandHandler = new DeleteCommentCommandHandler()

  const handleDeleteComment = (id: string) => {
    Swal.fire({
      title: 'Are you sure you want delete this comment?',
      text: 'You will not be able to undo once confirmed!',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#26C6DA',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCommentCommandHandler.handle(
          id,
          () => {
            Swal.fire('Deleted!', 'Your comment has been deleted.', 'success')
          },
          (error: any) => {
            console.log(error)
          }
        )
      }
    })
  }

  return (
    <div>
      {isEdit ? (
        <FormEditComment comment={comment} setIsEdit={setIsEdit} />
      ) : (
        <Paper withBorder radius='md' className='py-5 px-8'>
          <Group className='mb-2' justify='space-between'>
            <Group>
              <Avatar src={comment.user.avatar} alt='Jacob Warnhalter' radius='xl' />
              <div>
                <Text fz='sm'>{comment.user.username}</Text>
                <Text fz='xs' c='dimmed'>
                  {formatTimeToReadable(comment.created_at)}
                </Text>
              </div>
            </Group>
            {comment.user._id === user_id && (
              <Menu shadow='md' position='right-start'>
                <Menu.Target>
                  <Button
                    variant='transparent'
                    size='xs'
                    rightSection={<IconDotsVertical style={{ width: rem(14), height: rem(14) }} />}
                    className='text-black font-medium'
                  ></Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => setIsEdit(true)}
                  >
                    Edit
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    onClick={() => handleDeleteComment(comment._id)}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
          <TypographyStylesProvider className='pl-[54px] pt-3 text-base'>
            <Text className='font-semibold'>{comment.content}</Text>
          </TypographyStylesProvider>
          <Group className='pl-[54px]'>
            {isReply ? (
              <FormReplyComment comment={comment} setIsReply={setIsReply} />
            ) : (
              <ActionIcon variant='subtle' color='gray' onClick={() => setIsReply(true)}>
                <IconCornerDownRight style={{ width: rem(60), height: rem(60) }} stroke={1.5} />
              </ActionIcon>
            )}
          </Group>
          {comment.comment_reply[0].content && (
            <Card className='pl-[54px] mt-4'>
              {comment.comment_reply.map((reply, index) => (
                <Card.Section className='my-2 ' key={index}>
                  {isEditReply ? (
                    <FormEditComment comment={reply} setIsEdit={setIsEditReply} />
                  ) : (
                    <>
                      <Group className='mb-2' justify='space-between'>
                        <Group>
                          <Avatar src={reply.user.avatar} alt='Jacob Warnhalter' radius='xl' />
                          <div>
                            <Text fz='sm'>{reply.user.username}</Text>
                            <Text fz='xs' c='dimmed'>
                              reply at {formatTimeToReadable(reply.created_at)}
                            </Text>
                          </div>
                        </Group>
                        {reply.user._id === user_id && (
                          <Menu shadow='md' position='right-start'>
                            <Menu.Target>
                              <Button
                                variant='transparent'
                                size='xs'
                                rightSection={
                                  <IconDotsVertical style={{ width: rem(14), height: rem(14) }} />
                                }
                                className='text-black font-medium'
                              ></Button>
                            </Menu.Target>
                            <Menu.Dropdown>
                              <Menu.Item
                                leftSection={
                                  <IconEdit style={{ width: rem(14), height: rem(14) }} />
                                }
                                onClick={() => setIsEditReply(true)}
                              >
                                Edit
                              </Menu.Item>
                              <Menu.Item
                                leftSection={
                                  <IconTrash style={{ width: rem(14), height: rem(14) }} />
                                }
                                onClick={() => handleDeleteComment(reply._id)}
                              >
                                Delete
                              </Menu.Item>
                            </Menu.Dropdown>
                          </Menu>
                        )}
                      </Group>

                      <TypographyStylesProvider className='pl-[54px] pt-3 text-base'>
                        <Text className='font-semibold'>{reply.content}</Text>
                      </TypographyStylesProvider>
                    </>
                  )}
                </Card.Section>
              ))}
            </Card>
          )}
        </Paper>
      )}
    </div>
  )
}

export default CardComment
