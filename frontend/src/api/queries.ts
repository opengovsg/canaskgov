import {
  QueryClient,
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { Answer, Like, Question, ScreenState, UserLikeData } from '../data'
import { api, getQuestions } from './api'
import { notification } from 'antd'

export function useQuestionsQuery(
  queryKey: QueryKey,
  screenState: ScreenState,
) {
  return useQuery(queryKey, () => getQuestions(screenState))
}

export function useQuestionQuery(queryKey: QueryKey, id?: string) {
  return useQuery(queryKey, () =>
    api.url(`/question/${id}`).get().json<Question>(),
  )
}

export type UpdateLikesFn = (
  queryClient: QueryClient,
  data: UserLikeData,
  variables: { like: Like; id: number },
) => void

export enum LikeType {
  QUESTION = 'question',
  ANSWER = 'answer',
}

export function useLikeMutation(
  likeType: LikeType,
  updateLikesFn: UpdateLikesFn,
) {
  const queryClient = useQueryClient()
  const updateLikes = updateLikesFn.bind(null, queryClient)
  return useMutation(
    (params: { id: number; like: Like }) => {
      const { id, like } = params
      if (like === Like.UP) {
        return api.url(`/like/${likeType}/${id}/up`).post().json<UserLikeData>()
      } else {
        return api
          .url(`/like/${likeType}/${id}/down`)
          .post()
          .json<UserLikeData>()
      }
    },
    {
      onError: (error, variables, context) => {
        notification.error({
          message: 'Could not perform Like operation',
          description: `${error}`,
          // duration: 0,
        })
      },
      onSuccess: updateLikes,
    },
  )
}

export function questionListQueryUpdateQuestionLikesFn(
  invalidQueryKey: QueryKey,
) {
  return (
    queryClient: QueryClient,
    data: UserLikeData,
    variables: { like: Like; id: number },
  ) => {
    const questions = queryClient.getQueryData<Question[]>(invalidQueryKey)
    if (questions) {
      queryClient.setQueryData(
        invalidQueryKey,
        questions.map((q: Question) => {
          if (q.id !== variables.id) {
            return q
          } else {
            return { ...q, ...data }
          }
        }),
      )
    }
  }
}

export function questionQueryUpdateQuestionLikesFn(invalidQueryKey: QueryKey) {
  return (
    queryClient: QueryClient,
    data: UserLikeData,
    variables: { like: Like; id: number },
  ) => {
    const question = queryClient.getQueryData<Question>(invalidQueryKey)
    if (question) {
      queryClient.setQueryData(invalidQueryKey, { ...question, ...data })
    }
  }
}

export function questionQueryUpdateAnswerLikesFn(invalidQueryKey: QueryKey) {
  return (
    queryClient: QueryClient,
    data: UserLikeData,
    variables: { like: Like; id: number },
  ) => {
    const question = queryClient.getQueryData<Question>(invalidQueryKey)
    if (question) {
      queryClient.setQueryData(invalidQueryKey, {
        ...question,
        answers: question.answers?.map((a: Answer) => {
          if (a.id !== variables.id) {
            return a
          } else {
            return { ...a, ...data }
          }
        }),
      })
    }
  }
}