import React, { FC, useState } from 'react'
import { Button, Card, Tabs, Typography, Form, Input, Space } from 'antd'
import { SafetyCertificateOutlined } from '@ant-design/icons'
import { useNavigate, useParams } from 'react-router-dom'
import { QuestionCard } from './QuestionCard'
import { AnswerList } from './AnswerList'
import { QuestionList } from './QuestionList'
import { canAnswer, canScreen, Officer } from '../data'
import { useCheckLogin } from './Frame'
import {
  useLogoutOfficerMutation,
  useOtpGenerateMutation,
  useOtpVerifyMutation,
} from '../api'
import { useGlobalSearchParams } from './links'
import { routes } from '../constants'

const { Text, Title } = Typography
const { TabPane } = Tabs

interface OfficerViewProps {}

export const OfficerView: FC<OfficerViewProps> = (props: OfficerViewProps) => {
  const { checkLogin, currentUser, currentOfficer } = useCheckLogin()
  const [form] = Form.useForm()
  const [otpRequested, setOtpRequested] = useState(false)
  const otpGenerateMutation = useOtpGenerateMutation(() => {
    setOtpRequested(true)
  })
  const otpVerifyMutation = useOtpVerifyMutation(() => {
    setOtpRequested(false)
  })
  const onFormFinish = (values: { email: string; token?: string }) => {
    if (values.token) {
      otpVerifyMutation.mutate(values as { email: string; token: string })
    } else {
      otpGenerateMutation.mutate(values)
    }
  }
  const onFormFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }

  const logoutMutation = useLogoutOfficerMutation()
  const logout = () => {
    logoutMutation.mutate()
  }

  const globalSearchParams = useGlobalSearchParams()
  const navigagte = useNavigate()
  const onScreenClick = () => {
    navigagte(`${routes.screen}?${globalSearchParams}`)
  }

  return (
    <>
      <Typography.Title level={2} style={{ margin: '30px 0' }}>
        Public Officers
      </Typography.Title>
      {currentOfficer ? (
        <div>
          <Card
            // margin: vertical | horizontal
            style={{ margin: '30px 0' }}
          >
            <Typography.Title level={3}>You are Signed In</Typography.Title>
            <p>
              Signed in as <b>{currentOfficer.email}</b>
            </p>
            <Button type="ghost" onClick={logout}>
              Sign out
            </Button>
          </Card>
          <Card>
            <Typography.Title level={3}>Permissions</Typography.Title>
            <ul>
              <li>
                {canScreen(currentOfficer) ? (
                  <Space>
                    <Typography.Text>You can screen questions</Typography.Text>
                    <Button type="ghost" onClick={onScreenClick} size="small">
                      Screen
                    </Button>
                  </Space>
                ) : (
                  <p>You cannot screen questions</p>
                )}
              </li>
              <li>
                {canAnswer(currentOfficer) ? (
                  <Typography.Text>You can answer questions</Typography.Text>
                ) : (
                  <p>You cannot answer questions</p>
                )}
              </li>{' '}
            </ul>
          </Card>
        </div>
      ) : (
        <Card>
          <p>
            Only available for use by public officers with an email from{' '}
            <b>gov.sg</b>.
          </p>
          <Form
            layout="vertical"
            form={form}
            name="control-hooks"
            onFinish={onFormFinish}
            onFinishFailed={onFormFinishFailed}
          >
            <Form.Item name="email" label="Email" rules={[{ required: true }]}>
              <Input disabled={otpRequested} />
            </Form.Item>
            {otpRequested && (
              <Form.Item
                name="token"
                label="One-time password"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            )}
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {otpRequested ? 'Submit' : 'Sign in'}
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  )
}
